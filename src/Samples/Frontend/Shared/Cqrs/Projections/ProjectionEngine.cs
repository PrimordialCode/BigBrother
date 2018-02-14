using Frontend.Shared.Cqrs.Support;
using NStore.Core.InMemory;
using NStore.Core.Logging;
using NStore.Core.Persistence;
using NStore.Domain;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Frontend.Shared.Cqrs.Projections
{
    public class ProjectionEngine
    {
        private readonly PollingClient _pollingClient;
        private readonly INStoreLoggerFactory _loggerFactory = new ConsoleLoggerFactory(); // NStoreNullLoggerFactory.Instance;

        public ProjectionEngine(IPersistence persistence, INetworkSimulator networkSimulator)
        {
            _pollingClient = new PollingClient(persistence, 0, new Projections(networkSimulator), _loggerFactory);
        }

        public void Start()
        {
            _pollingClient.Start();
        }

        public void Poll()
        {
            _pollingClient.Poll();
        }

        public void Stop()
        {
            _pollingClient.Stop();
        }
    }

    public class Projections : ISubscription
    {
        public long Position { get; private set; } = 0;
        public RoomsOnSaleProjection Rooms { get; }
        public ConfirmedBookingsProjection Bookings { get; }

        private readonly IList<IProjection> _projections = new List<IProjection>();
        private readonly IReporter _reporter = new ColoredConsoleReporter("projections", ConsoleColor.Yellow);
        private long _dispatchedCount = 0;
        private bool _catchingUp;

        public Projections(INetworkSimulator networkSimulator)
        {
            Rooms = new RoomsOnSaleProjection(
                new ColoredConsoleReporter("rooms on sale", ConsoleColor.Cyan),
                networkSimulator
            );

            Bookings = new ConfirmedBookingsProjection(
                new ColoredConsoleReporter("confirmed bookings", ConsoleColor.Cyan),
                networkSimulator
            );
            Setup();
        }

        private void Setup()
        {
            _projections.Add(Rooms);
            _projections.Add(Bookings);
        }

        public async Task<bool> OnNextAsync(IChunk chunk)
        {
            if (chunk.Position != Position + 1)
            {
                // * * * * * * * * * * * * * * * * * * * * * * * * *
                // * WARNING: ˌɛsəˈtɛrɪk/ stuff can be done here   *
                // * * * * * * * * * * * * * * * * * * * * * * * * *

                // * * * * * * * * * * * * * * * * * * * * * * * * *
                // * Or just sit down and watch basic stuff @ work *
                // * * * * * * * * * * * * * * * * * * * * * * * * *
                if (!_catchingUp)
                {
                    _reporter.Report(
                        $"!!!!!!!!!!!!!!!! Projection out of sequence {chunk.Position} => wait next poll !!!!!!!!!!!!!!!!");
                    _catchingUp = true;
                }

                // * * * * * * * * * * * * * * * * * * * * * * * * * *
                // * Add a timeout to stop if out of sequence (crash)*
                // * * * * * * * * * * * * * * * * * * * * * * * * * *
                return false;
            }

            _catchingUp = false;

            Position = chunk.Position;

            Changeset changes = chunk.Payload as Changeset;

            // skip fillers
            if (changes == null)
            {
                return true;
            }

            _dispatchedCount++;
            var sw = new Stopwatch();
            sw.Start();
            await Task.WhenAll(
                _projections.Select(p => p.Project(changes))
            ).ConfigureAwait(false);
            sw.Stop();

            _reporter.Report($"dispatched changeset #{chunk.Position} took {sw.ElapsedMilliseconds}ms");

            return true;
        }

        public Task CompletedAsync(long indexOrPosition)
        {
            return Task.CompletedTask;
        }

        public Task StoppedAsync(long indexOrPosition)
        {
            return Task.CompletedTask;
        }

        public Task OnStartAsync(long indexOrPosition)
        {
            return Task.CompletedTask;
        }

        public Task OnErrorAsync(long indexOrPosition, Exception ex)
        {
            _reporter.Report($"ERROR on position {indexOrPosition}: {ex.Message}");
            return Task.CompletedTask;
        }
    }
}
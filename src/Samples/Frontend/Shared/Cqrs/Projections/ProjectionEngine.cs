using Frontend.Shared.Cqrs.Support;
using NStore.Core.InMemory;
using NStore.Core.Logging;
using NStore.Core.Persistence;
using System.Threading;
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

        public Task Poll(CancellationToken cancellationToken)
        {
            return _pollingClient.Poll(cancellationToken);
        }

        public void Stop()
        {
            _pollingClient.Stop();
        }
    }
}
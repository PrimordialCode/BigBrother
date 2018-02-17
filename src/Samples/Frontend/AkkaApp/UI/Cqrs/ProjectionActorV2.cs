extern alias akka;

using akka::Akka.Actor;
using Frontend.Shared.Cqrs.Projections;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Frontend.AkkaApp.UI.Cqrs
{

    internal class ProjectionActorV2 : ReceiveActorWithLog, IWithUnboundedStash
    {
        private Task _longRunningTask;
        private CancellationTokenSource _cancellationToken;

        public IStash Stash { get; set; }

        private readonly ProjectionEngine _projectionEngine;

        public ProjectionActorV2(ProjectionEngine projectionEngine)
        {
            _projectionEngine = projectionEngine;
            Become(Waiting);
        }

        private void Waiting()
        {
            if (Stash != null)
            {
                Stash.UnstashAll();
            }
            Receive<PollImmediately>(msg => Poll());
            Receive<ReceiveTimeout>(timeout => Poll());
            Receive<StartPolling>(Handle);
        }

        private void Poll()
        {
            _cancellationToken = new CancellationTokenSource();
            var self = Self;
            _longRunningTask = _projectionEngine.Poll(_cancellationToken.Token)
                .ContinueWith(x =>
                {
                    if (x.IsCanceled || x.IsFaulted)
                        return new LongRunningTaskResult(false);
                    return new LongRunningTaskResult(true);
                }, TaskContinuationOptions.ExecuteSynchronously)
            .PipeTo(self);
            Become(Working);
        }

        private void Working()
        {
            Receive<StopPolling>(Handle);

            Receive<LongRunningTaskResult>(result => Become(Waiting)); // handle errors properly!

            // ignore any timeout we get while doing the actual work
            Receive<ReceiveTimeout>(timeout => true);

            ReceiveAny(o => Stash.Stash());
        }

        private Boolean Handle(StopPolling obj)
        {
            SetReceiveTimeout(null);
            _cancellationToken.Cancel(); // cancel work
            Become(Waiting);
            return true;
        }

        private Boolean Handle(StartPolling obj)
        {
            Poll();
            SetReceiveTimeout(TimeSpan.FromSeconds(3));
            return true;
        }

        protected override void PostStop()
        {
            if (_cancellationToken != null && !_cancellationToken.IsCancellationRequested)
            {
                _cancellationToken.Cancel();
            }
            base.PostStop();
        }
    }

    internal class LongRunningTaskResult
    {
        public LongRunningTaskResult(Boolean success)
        {
            Success = success;
        }

        public Boolean Success { get; private set; }
    }
}

extern alias akka;

using akka::Akka.Actor;
using Frontend.Shared.Cqrs.Projections;
using System;

namespace Frontend.AkkaApp.UI.Cqrs
{
    /// <summary>
    /// An actor that manages projecting new elements
    /// </summary>
    internal class ProjectionActor : ReceiveActorWithLog
    {
        private readonly ProjectionEngine _projectionEngine;

        public ProjectionActor(ProjectionEngine projectionEngine)
        {
            _projectionEngine = projectionEngine;
            Become(Waiting);
        }

        private void Waiting()
        {
            Receive<StartPolling>(Handle);
        }

        private void Polling()
        {
            Receive<StopPolling>(Handle);
            Receive<ReceiveTimeout>(timeout => Poll());
        }

        private Boolean Handle(StopPolling obj)
        {
            SetReceiveTimeout(null);
            Self.Tell(PoisonPill.Instance);
            return true;
        }

        private Boolean Handle(StartPolling obj)
        {
            Become(Polling);
            SetReceiveTimeout(TimeSpan.FromSeconds(5));
            Poll();
            return true;
        }

        private void Poll()
        {
            _projectionEngine.Poll();
        }
    }

    public class StartPolling
    {

    }

    public class StopPolling
    {

    }
}

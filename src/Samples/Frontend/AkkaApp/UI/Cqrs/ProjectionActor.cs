using Akka.Actor;
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
            Receive<PollImmediately>(Handle);
            Receive<StartPolling>(Handle);
        }

        private void Working()
        {
            Receive<PollImmediately>(Handle);
            Receive<StopPolling>(Handle);
            Receive<ReceiveTimeout>(timeout => Poll());
        }

        private Boolean Handle(PollImmediately obj)
        {
            Poll();
            return true;
        }

        private Boolean Handle(StopPolling obj)
        {
            SetReceiveTimeout(null);
            Become(Waiting);
            return true;
        }

        private Boolean Handle(StartPolling obj)
        {
            Become(Working);
            SetReceiveTimeout(TimeSpan.FromSeconds(3));
            Poll();
            return true;
        }

        /// <summary>
        /// blocking an actor wi a very long time might not be a good idea
        /// It's non responsing to other messages (even system messages)
        /// </summary>
        private void Poll()
        {
            _projectionEngine.Poll();
        }
    }

    public class StartPolling
    {
        public static readonly StartPolling Instance = new StartPolling();
    }

    public class StopPolling
    {
        public static readonly StopPolling Instance = new StopPolling();
    }

    public class PollImmediately
    {
        public static readonly PollImmediately Instance = new PollImmediately();
    }
}

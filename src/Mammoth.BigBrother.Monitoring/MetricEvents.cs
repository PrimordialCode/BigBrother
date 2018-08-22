﻿namespace Mammoth.BigBrother.Monitoring
{
    internal static class MetricEvents
    {
        public const string ActorCreated = "actor.created";
        public const string ActorStarted = "actor.started";
        public const string ActorRestarted = "actor.restarted";
        public const string ActorStopped = "actor.stopped";
        public const string ActorDeadLetter = "actor.deadletter";
        public const string ActorReceivedMessage = "actor.receivedmessage";
    }
}

namespace Mammoth.BigBrother.Monitoring
{
    public static class MetricCounters
    {
        public const string ActorsCreated = "actors.created";
        public const string ActorsStarted = "actors.started";
        public const string ActorsRestarted = "actors.restarted";
        public const string ActorsStopped = "actors.stopped";
        public const string ActorsExceptions = "actors.exceptions";

        public const string ActorCreated = "actor.created";
        public const string ActorStarted = "actor.started";
        public const string ActorRestarted = "actor.restarted";
        public const string ActorStopped = "actor.stopped";
        public const string ActorExceptions = "actor.exceptions";

        public readonly static string[] ActorsDefaultCounters = { ActorsCreated, ActorsStarted, ActorsRestarted, ActorsStopped, ActorsExceptions };

        public static string ActorCounter(string counterPrefix, string actorName)
        {
            return $"{counterPrefix}.{actorName}";
        }
    }
}

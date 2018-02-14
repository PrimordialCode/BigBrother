namespace Mammoth.BigBrother.Monitoring
{
    public static class MetricCounters
    {
        public const string ActorCreated = "actor.created";
        public const string ActorStarted = "actor.started";
        public const string ActorRestarted = "actor.restarted";
        public const string ActorStopped = "actor.stopped";
        public const string ActorException = "actor.exception";

        public static readonly string[] DefaultCounters = { ActorCreated, ActorStarted, ActorRestarted, ActorStopped, ActorException };

        private static string ActorSpecificCounter(string counterPrefix, string actorName)
        {
            return $"{counterPrefix}.{actorName}";
        }

        public static string ActorCreated_Specific(string name)
        {
            return ActorSpecificCounter(MetricCounters.ActorCreated, name);
        }

        public static string ActorStarted_Specific(string name)
        {
            return ActorSpecificCounter(MetricCounters.ActorStarted, name);
        }

        public static string ActorRestarted_Specific(string name)
        {
            return ActorSpecificCounter(MetricCounters.ActorRestarted, name);
        }

        public static string ActorStopped_Specific(string name)
        {
            return ActorSpecificCounter(MetricCounters.ActorStopped, name);
        }

        public static string ActorException_Specific(string name)
        {
            return ActorSpecificCounter(MetricCounters.ActorException, name);
        }
    }
}

using System;

namespace Mammoth.BigBrother.Monitoring
{
    // todo: maybe optimize by offloading tracking logic to a separate thread, so we do not block the main execution

    /// <summary>
    /// An helper class specifically designed to track Actor Systems events and
    /// diagnostic logs.
    /// </summary>
    /// <remarks>
    /// Internally it 
    /// </remarks>
    public static class ActorMonitoring
    {
        public static void TrackActorCreated(string name, string type, string parent)
        {
            if (!MonitoringSystems.IsEnabled)
            {
                return;
            }

            MonitoringSystems.TrackEvent(MetricEvents.ActorCreated, MetricProperties.For().Actor(name).Type(type).ActorParent(parent).Build());
            MonitoringSystems.UpdateCounter(MetricCounters.ActorsCreated);
            MonitoringSystems.UpdateCounter(MetricCounters.ActorCounter(MetricCounters.ActorCreated, name));
        }

        public static void TrackActorStarted(string name)
        {
            if (!MonitoringSystems.IsEnabled)
            {
                return;
            }

            MonitoringSystems.TrackEvent(MetricEvents.ActorStarted, MetricProperties.For().Actor(name).Build());
            MonitoringSystems.UpdateCounter(MetricCounters.ActorsStarted);
            MonitoringSystems.UpdateCounter(MetricCounters.ActorCounter(MetricCounters.ActorStarted, name));
        }

        public static void TrackActorStopped(string name)
        {
            if (!MonitoringSystems.IsEnabled)
            {
                return;
            }

            MonitoringSystems.TrackEvent(MetricEvents.ActorStopped, MetricProperties.For().Actor(name).Build());
            MonitoringSystems.UpdateCounter(MetricCounters.ActorsStopped);
            MonitoringSystems.UpdateCounter(MetricCounters.ActorCounter(MetricCounters.ActorStopped, name));
        }

        public static void TrackActorRestarted(string name, Exception ex)
        {
            if (!MonitoringSystems.IsEnabled)
            {
                return;
            }

            MonitoringSystems.TrackEvent(MetricEvents.ActorRestarted, MetricProperties.For()
                .Actor(name)
                .Exception(ex)
                .Build());
            MonitoringSystems.UpdateCounter(MetricCounters.ActorsRestarted);
            MonitoringSystems.UpdateCounter(MetricCounters.ActorCounter(MetricCounters.ActorRestarted, name));
        }

        public static void TrackException(string name, Exception exception, object message)
        {
            if (!MonitoringSystems.IsEnabled)
            {
                return;
            }

            MonitoringSystems.TrackException(exception, MetricProperties.For()
                .Actor(name)
                .Message(message)
                .Build());
            MonitoringSystems.UpdateCounter(MetricCounters.ActorsExceptions);
            MonitoringSystems.UpdateCounter(MetricCounters.ActorCounter(MetricCounters.ActorExceptions, name));
        }

        public static void TrackDeadLetter(string sender, string recipient, object message)
        {
            if (!MonitoringSystems.IsEnabled)
            {
                return;
            }

            MonitoringSystems.TrackEvent(MetricEvents.ActorDeadLetter, MetricProperties.For()
                .Actor(sender)
                .ActorRecipient(recipient)
                .Message(message)
                .Build());
            MonitoringSystems.UpdateCounter(MetricCounters.ActorsDeadLetters);
        }
    }
}

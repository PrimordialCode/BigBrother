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
        /// <summary>
        /// Tracking received message is a time consuming activity, maybe we can reduce the details with more flags
        /// to add or remove detailed serialization.
        /// this kind of messages also should have a form of retention/aging
        /// </summary>
        public static bool TrackReceivedMessagesEnabled { get; set; }

        public static void TrackActorCreated(string name, Type type, string parentName)
        {
            if (!MonitoringSystems.IsEnabled)
            {
                return;
            }

            MonitoringSystems.TrackEvent(MetricEvents.ActorCreated, MetricProperties.For().Actor(name).Type(type).ActorParent(parentName).Build());
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

        public static void TrackReceivedMessage(string name, object message, bool expires)
        {
            if (!MonitoringSystems.IsEnabled || !TrackReceivedMessagesEnabled)
            {
                return;
            }

            MonitoringSystems.TrackEvent(MetricEvents.ActorReceivedMessage, MetricProperties.For()
                .Actor(name)
                .Type(message.GetType())
                .Message(message)
                .Build(),
                expires);
        }

        public static void TrackException(string name, Exception exception, object message)
        {
            if (!MonitoringSystems.IsEnabled)
            {
                return;
            }

            MonitoringSystems.TrackException(exception, MetricProperties.For()
                .Actor(name)
                .Type(message.GetType())
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
                .Type(message.GetType())
                .Message(message)
                .Build());
            MonitoringSystems.UpdateCounter(MetricCounters.ActorsDeadLetters);
        }
    }
}

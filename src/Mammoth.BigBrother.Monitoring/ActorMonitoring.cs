using System;

namespace Mammoth.BigBrother.Monitoring
{
    // todo: optimize by offloading tracking logic to a separate thread, so we do not block the main execution

    public static class ActorMonitoring
    {
        private static IActorMonitoringSystems Monitors { get; } = new ActorMonitoringSystems();

        public static void AddSystem(IActorMonitoringSystem monitoringSystem)
        {
            Monitors.AddSystem(monitoringSystem);
        }

        public static void RemoveSystem(string monitoringSystemName)
        {
            Monitors.RemoveSystem(monitoringSystemName);
        }

        public static void TrackActorCreated(string name)
        {
            if (!Monitors.IsEnabled)
            {
                return;
            }

            Monitors.TrackEvent(MetricEvents.ActorCreated, MetricProperties.For().Actor(name).Build());
            Monitors.UpdateCounter(MetricCounters.ActorCreated, 1);
            Monitors.UpdateCounter(MetricCounters.ActorCreated_Specific(name));
        }

        public static void TrackActorStarted(string name)
        {
            if (!Monitors.IsEnabled)
            {
                return;
            }

            Monitors.TrackEvent(MetricEvents.ActorStarted, MetricProperties.For().Actor(name).Build());
            Monitors.UpdateCounter(MetricCounters.ActorStarted, 1);
            Monitors.UpdateCounter(MetricCounters.ActorStarted_Specific(name));
        }

        public static void TrackActorStopped(string name)
        {
            if (!Monitors.IsEnabled)
            {
                return;
            }

            Monitors.TrackEvent(MetricEvents.ActorStopped, MetricProperties.For().Actor(name).Build());
            Monitors.UpdateCounter(MetricCounters.ActorStopped, 1);
            Monitors.UpdateCounter(MetricCounters.ActorStopped_Specific(name));
        }

        public static void TrackActorRestarted(string name, Exception ex)
        {
            if (!Monitors.IsEnabled)
            {
                return;
            }

            Monitors.TrackEvent(MetricEvents.ActorRestarted, MetricProperties.For()
                .Actor(name)
                .Exception(ex)
                .Build());
            Monitors.UpdateCounter(MetricCounters.ActorRestarted, 1);
            Monitors.UpdateCounter(MetricCounters.ActorRestarted_Specific(name));
        }

        public static void TrackException(string name, Exception exception, object message)
        {
            if (!Monitors.IsEnabled)
            {
                return;
            }

            Monitors.TrackException(exception, MetricProperties.For()
                .Actor(name)
                .Message(message)
                .Build());
        }

        /*
        void UpdateCounter(string metricName, double delta = 1, IDictionary<string, string> properties = null)
        void UpdateGauge(string metricName, int value, IDictionary<string, string> properties = null);
        void TrackTiming(string metricName, long time, IDictionary<string, string> properties = null);
        void TrackEvent(string evt, IDictionary<string, string> properties = null);
        */
    }
}

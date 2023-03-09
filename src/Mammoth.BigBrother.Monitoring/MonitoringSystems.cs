using Mammoth.BigBrother.Monitoring.Metrics;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Mammoth.BigBrother.Monitoring
{
    /// <summary>
    /// <para>The main class used to track and store Metrics in the system.</para>
    /// <para>
    /// It will manage a collection of all of the monitoring system implementations used for tracking and forwaring the
    /// counters update calls
    /// </para>
    /// </summary>
    public static class MonitoringSystems
    {
        /// <summary>
        /// The list of active clients who are available for broadcast
        /// </summary>
        private static readonly List<IMonitoringSystem> _monitoringSystems = new();

        public static bool IsEnabled => _monitoringSystems.Count > 0;

        /// <summary>
        /// Add a new <see cref="IMonitoringSystem"/> to be used
        /// when reporting Actor metrics
        /// </summary>
        /// <param name="monitoringSystem">the monitoring system to add</param>
        public static void AddSystem(IMonitoringSystem monitoringSystem)
        {
            _monitoringSystems.Add(monitoringSystem);
        }

        /// <summary>
        /// Remove a <see cref="IMonitoringSystem"/>
        /// </summary>
        /// <param name="monitoringSystemName">the monitoring system to remove</param>
        /// <returns>true if the monitoring was successfully removed, false otherwise</returns>
        public static void RemoveSystem(string monitoringSystemName)
        {
            var system = _monitoringSystems.SingleOrDefault(e => e.InstanceName == monitoringSystemName);
            if (system != null)
            {
                _monitoringSystems.Remove(system);
                system.Dispose();
            }
        }

        /// <summary>
        /// Dispose all of the monitoring clients
        /// </summary>
        public static void RemoveAll()
        {
            var clients = _monitoringSystems.ToArray();
            _monitoringSystems.Clear();
            foreach (var client in clients)
                client.Dispose();
        }

        /// <summary>
        /// Update a counter across all active monitoring systems
        /// </summary>
        /// <param name="metricName"></param>
        /// <param name="delta"></param>
        /// <param name="properties"></param>
        public static void UpdateCounter(string metricName, double delta = 1, IDictionary<string, string>? properties = null)
        {
            foreach (var client in _monitoringSystems)
                client.UpdateCounter(metricName, delta, properties);
        }

        /// <summary>
        /// Update a timer across all active monitoring clients
        /// </summary>
        /// <param name="metricName"></param>
        /// <param name="time"></param>
        /// <param name="properties"></param>
        public static void TrackTiming(string metricName, long time, IDictionary<string, string>? properties = null)
        {
            foreach (var client in _monitoringSystems)
                client.TrackTiming(metricName, time, properties);
        }

        /// <summary>
        /// Update a gauge across all active monitoring clients
        /// </summary>
        /// <param name="metricName"></param>
        /// <param name="value"></param>
        /// <param name="properties"></param>
        public static void UpdateGauge(string metricName, int value, IDictionary<string, string>? properties = null)
        {
            foreach (var client in _monitoringSystems)
                client.UpdateGauge(metricName, value, properties);
        }

        public static void TrackEvent(string evt, IDictionary<string, string>? properties = null, bool expires = false)
        {
            foreach (var client in _monitoringSystems)
                client.TrackEvent(evt, properties, expires);
        }

        public static void TrackException(Exception exception, IDictionary<string, string>? properties = null)
        {
            foreach (var client in _monitoringSystems)
                client.TrackException(exception, properties);
        }
    }
}

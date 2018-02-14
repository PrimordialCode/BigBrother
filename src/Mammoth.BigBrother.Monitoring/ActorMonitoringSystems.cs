using System;
using System.Collections.Generic;
using System.Linq;

namespace Mammoth.BigBrother.Monitoring
{
    /// <summary>
    /// A collection of all of the monitoring system implementations used for tracking and forwaring the
    /// counters update calls
    /// </summary>
    internal class ActorMonitoringSystems : IActorMonitoringSystems
    {
        /// <summary>
        /// The list of active clients who are available for broadcast
        /// </summary>
        private readonly List<IActorMonitoringSystem> _monitoringSystems = new List<IActorMonitoringSystem>();

        public bool IsEnabled => _monitoringSystems.Count > 0;

        /// <summary>
        /// Add a new <see cref="IActorMonitoringSystem"/> to be used
        /// when reporting Actor metrics
        /// </summary>
        /// <param name="monitoringSystem">the monitoring system to add</param>
        public void AddSystem(IActorMonitoringSystem monitoringSystem)
        {
            _monitoringSystems.Add(monitoringSystem);
        }

        /// <summary>
        /// Remove a <see cref="IActorMonitoringSystem"/>
        /// </summary>
        /// <param name="monitoringSystemName">the monitoring system to remove</param>
        /// <returns>true if the monitoring was successfully removed, false otherwise</returns>
        public void RemoveSystem(string monitoringSystemName)
        {
            var system = _monitoringSystems.SingleOrDefault(e => e.InstanceName == monitoringSystemName);
            if (system != null)
            {
                _monitoringSystems.Remove(system);
                system.Dispose();
            }
        }

        /// <summary>
        /// Update a counter across all active monitoring systems
        /// </summary>
        public void UpdateCounter(string metricName, double delta = 1, IDictionary<string, string> properties = null)
        {
            foreach (var client in _monitoringSystems)
                client.UpdateCounter(metricName, delta, properties);
        }

        /// <summary>
        /// Update a timer across all active monitoring clients
        /// </summary>
        public void TrackTiming(string metricName, long time, IDictionary<string, string> properties = null)
        {
            foreach (var client in _monitoringSystems)
                client.TrackTiming(metricName, time, properties);
        }

        /// <summary>
        /// Update a gauge across all active monitoring clients
        /// </summary>
        public void UpdateGauge(string metricName, int value, IDictionary<string, string> properties = null)
        {
            foreach (var client in _monitoringSystems)
                client.UpdateGauge(metricName, value, properties);
        }

        /// <summary>
        /// Dispose all of the monitoring clients
        /// </summary>
        public void RemoveAll()
        {
            var clients = _monitoringSystems.ToArray();
            _monitoringSystems.Clear();
            foreach (var client in clients)
                client.Dispose();
        }

        public void TrackEvent(string evt, IDictionary<string, string> properties = null)
        {
            foreach (var client in _monitoringSystems)
                client.TrackEvent(evt, properties);
        }

        public void TrackException(Exception exception, IDictionary<string, string> properties = null)
        {
            foreach (var client in _monitoringSystems)
                client.TrackException(exception, properties);
        }
    }
}

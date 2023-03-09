using System;
using System.Collections.Generic;

namespace Mammoth.BigBrother.Monitoring.Systems
{
    /// <summary>
    /// There should be just a single instance of this monitor
    /// </summary>
    public class NullMonitoringSystem : IMonitoringSystem {
        public string Name => typeof(NullMonitoringSystem).Name;

        public string InstanceName { get; }

        public NullMonitoringSystem(string instanceName)
        {
            this.InstanceName = instanceName;
        }

        public void Dispose()
        {
            // Method intentionally left empty.
        }

        public void UpdateCounter(string metricName, double delta, IDictionary<string, string>? properties = null)
        {
            // Method intentionally left empty.
        }

        public void UpdateGauge(string metricName, double value, IDictionary<string, string>? properties = null)
        {
            // Method intentionally left empty.
        }

        public void TrackTiming(string metricName, long time, IDictionary<string, string>? properties = null)
        {
            // Method intentionally left empty.
        }

        public void TrackEvent(string evt, IDictionary<string, string>? properties = null, bool expires = false)
        {
            // Method intentionally left empty.
        }

        public void TrackException(Exception exception, IDictionary<string, string>? properties = null)
        {
            // Method intentionally left empty.
        }
    }
}

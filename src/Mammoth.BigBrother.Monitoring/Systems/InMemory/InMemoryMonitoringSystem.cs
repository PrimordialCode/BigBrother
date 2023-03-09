using Mammoth.BigBrother.Monitoring.Metrics;
using System;
using System.Collections.Generic;

namespace Mammoth.BigBrother.Monitoring.Systems.InMemory
{
    /// <summary>
    /// Fills in an In process / In memory static collection of data.
    /// The information is availabe from the static methods of the class <see cref="InMemoryMonitoringData"/>
    /// </summary>
    public class InMemoryMonitoringSystem : IMonitoringSystem {
        public string Name => typeof(InMemoryMonitoringSystem).Name;

        public string InstanceName { get; }

        public InMemoryMonitoringSystem(string instanceName)
        {
            this.InstanceName = instanceName;
        }

        public void Dispose()
        {
            // Method intentionally left empty.
        }

        public void UpdateCounter(string metricName, double delta, IDictionary<string, string>? properties = null)
        {
            InMemoryMonitoringData.Counters.AddOrUpdate(metricName, delta, (_, value) => value + delta);
        }

        public void UpdateGauge(string metricName, double value, IDictionary<string, string>? properties = null)
        {
            InMemoryMonitoringData.Gauges[metricName] = value;
        }

        public void TrackTiming(string metricName, long time, IDictionary<string, string>? properties = null)
        {
            InMemoryMonitoringData.Timings.Add(new MonitoringTimingData
            {
                MetricName = metricName,
                Value = time,
                Properties = properties
            });
        }

        public void TrackEvent(string evt, IDictionary<string, string>? properties = null, bool expires = false)
        {
            InMemoryMonitoringData.Events.Add(new MonitoringEventData
            {
                Event = evt,
                Properties = properties,
                Expire = expires
            });
        }

        public void TrackException(Exception exception, IDictionary<string, string>? properties = null)
        {
            InMemoryMonitoringData.Exceptions.Add(new MonitoringExceptionData
            {
                Exception = exception,
                Properties = properties
            });
        }
    }
}

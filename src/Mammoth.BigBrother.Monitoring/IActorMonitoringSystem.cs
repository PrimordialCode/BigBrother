using System;
using System.Collections.Generic;

namespace Mammoth.BigBrother.Monitoring
{
    /// <summary>
    /// Abstracts the external target monitoring system used to further process and render the
    /// information coming from the metrics
    /// </summary>
    public interface IActorMonitoringSystem : IDisposable
    {
        /// <summary>
        /// Updates a counter, adds or subtracts the value.
        /// </summary>
        /// <param name="metricName">the metric name</param>
        /// <param name="delta">amount to update the counter</param>
        /// <param name="properties">additional properties</param>
        void UpdateCounter(string metricName, double delta, IDictionary<string, string> properties = null);

        /// <summary>
        /// Updates a Gauge with the specified value. This is an instant value.
        /// </summary>
        /// <param name="metricName">the metric name</param>
        /// <param name="value">the value to set</param>
        /// <param name="properties">additional properties</param>
        void UpdateGauge(string metricName, double value, IDictionary<string, string> properties = null);

        /// <summary>
        /// Updates a counter with the duration it took an operation to complete
        /// </summary>
        /// <param name="metricName">the metric name</param>
        /// <param name="time">time elapsed in milliseconds</param>
        /// <param name="properties">additional properties</param>
        void TrackTiming(string metricName, long time, IDictionary<string, string> properties = null);

        /// <summary>
        /// Track a specific event that occurred in the system
        /// </summary>
        /// <param name="evt"></param>
        /// <param name=""></param>
        /// <param name="properties"></param>
        void TrackEvent(string evt, IDictionary<string, string> properties = null);

        /// <summary>
        /// Track an exception
        /// </summary>
        /// <param name="exception"></param>
        /// <param name="properties"></param>
        void TrackException(Exception exception, IDictionary<string, string> properties = null);

        /// <summary>
        /// A unique name for the monitoring system, represents the Monitor System Type
        /// </summary>
        string Name { get; }

        /// <summary>
        /// a specific instance name, we can have multiple instances of the monitoring system running.
        /// </summary>
        string InstanceName { get; }
    }
}

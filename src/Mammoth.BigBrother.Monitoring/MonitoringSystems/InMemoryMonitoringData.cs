using System;
using System.Collections.Concurrent;
using System.Collections.Generic;

namespace Mammoth.BigBrother.Monitoring.MonitoringSystems
{
    // todo: provide some clean up methods to remove older data, we should be able keep just a "small" timeframe of some data (maybe exceptions are an exception)

    /// <summary>
    /// In memory representation of the data.
    /// 
    /// the first implementation is just a static raw collection of data.
    /// </summary>
    public static class InMemoryMonitoringData
    {
        public static ConcurrentDictionary<string, double> Counters { get; } = new ConcurrentDictionary<string, double>();

        public static ConcurrentDictionary<string, double> Gauges { get; } = new ConcurrentDictionary<string, double>();

        public static List<MonitoringTimingData> Timings { get; } = new List<MonitoringTimingData>();

        public static List<MonitoringEventData> Events { get; } = new List<MonitoringEventData>();

        public static List<MonitoringExceptionData> Exceptions { get; } = new List<MonitoringExceptionData>();
    }

    public class MonitoringCounterData
    {
        public string MetricName { get; set; }
        public double Value { get; set; }
        public IDictionary<string, string> Properties { get; set; }
    }

    public class MonitoringGaugeData
    {
        public string MetricName { get; set; }
        public double Value { get; set; }
        public IDictionary<string, string> Properties { get; set; }
    }

    public class MonitoringTimingData
    {
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string MetricName { get; set; }
        public long Value { get; set; }
        public IDictionary<string, string> Properties { get; set; }
    }

    public class MonitoringEventData
    {
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string Event { get; set; }
        public IDictionary<string, string> Properties { get; set; }
    }

    public class MonitoringExceptionData
    {
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public Exception Exception { get; set; }
        public IDictionary<string, string> Properties { get; set; }
    }
}

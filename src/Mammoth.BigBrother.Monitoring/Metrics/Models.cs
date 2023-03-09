using System;
using System.Collections.Generic;

namespace Mammoth.BigBrother.Monitoring.Metrics
{
    public class MonitoringCounterData
    {
        public string MetricName { get; set; }
        public double Value { get; set; }
        public IDictionary<string, string>? Properties { get; set; }
    }

    public class MonitoringGaugeData
    {
        public string MetricName { get; set; }
        public double Value { get; set; }
        public IDictionary<string, string>? Properties { get; set; }
    }

    public class MonitoringTimingData
    {
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string MetricName { get; set; }
        public long Value { get; set; }
        public IDictionary<string, string>? Properties { get; set; }
    }

    public class MonitoringEventData : IMetricCanExpire
    {
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string Event { get; set; }
        public IDictionary<string, string>? Properties { get; set; }
        public bool Expire { get; set; }
    }

    public class MonitoringExceptionData
    {
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public Exception Exception { get; set; }
        public IDictionary<string, string>? Properties { get; set; }
    }
}

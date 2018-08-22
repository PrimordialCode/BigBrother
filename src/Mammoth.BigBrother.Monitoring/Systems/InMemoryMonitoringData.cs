using System.Collections.Concurrent;
using System.Collections.Generic;

namespace Mammoth.BigBrother.Monitoring.Systems
{
    // todo: provide some clean up methods to remove older data, we should be able keep just a "small" timeframe of some data (maybe exceptions are an exception)

    /// <summary>
    /// <para>In memory representation of the data.</para>
    /// <para>The first implementation is just a static raw collection of data.</para>
    /// </summary>
    public static class InMemoryMonitoringData
    {
        public static ConcurrentDictionary<string, double> Counters { get; } = new ConcurrentDictionary<string, double>();

        public static ConcurrentDictionary<string, double> Gauges { get; } = new ConcurrentDictionary<string, double>();

        public static List<MonitoringTimingData> Timings { get; } = new List<MonitoringTimingData>();

        public static List<MonitoringEventData> Events { get; } = new List<MonitoringEventData>();

        public static List<MonitoringExceptionData> Exceptions { get; } = new List<MonitoringExceptionData>();
    }
}

using System;

namespace Mammoth.BigBrother.Monitoring.Housekeeping
{
    /// <summary>
    /// A service class that's devoted to run some house-keeping rules in order
    /// to reduce the numbers of values stored in the application,
    /// house keeping rules can run at scheduled interval of times
    /// </summary>
    public static class MetricsHousekeeper
    {
        private static IMetricsHousekeeperRule[] _rules = new IMetricsHousekeeperRule[0];
        private static System.Threading.Timer? _schedulerTime;

        public static void Configure(IMetricsHousekeeperRule[] rules)
        {
            _rules = rules;
        }

        public static void Schedule(TimeSpan interval)
        {
            StopSchedule();
            _schedulerTime = new System.Threading.Timer(
                _ => Cleanup(),
                null,
                0,
                Convert.ToUInt32(interval.TotalMilliseconds));
        }

        public static void StopSchedule()
        {
            if (_schedulerTime != null)
            {
                _schedulerTime.Dispose();
                _schedulerTime = null;
            }
        }

        public static void Cleanup()
        {
            try
            {
                foreach (var rule in _rules)
                {
                    rule.Cleanup();
                }
            }
            catch
            {
                // ignore any error
            }
        }
    }
}

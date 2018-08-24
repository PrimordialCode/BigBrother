using Mammoth.BigBrother.Monitoring.Housekeeping;
using System;

namespace Mammoth.BigBrother.Monitoring.Systems.InMemory.Housekeeping
{
    /// <summary>
    /// It will remove all the Events entries (marked as expireable) older than the specified TimeSpan.
    /// </summary>
    public class InMemoryEventsExpirationRule : IMetricsHousekeeperRule
    {
        private readonly TimeSpan _ttl;

        public InMemoryEventsExpirationRule(TimeSpan ttl)
        {
            _ttl = ttl;
        }

        public void Cleanup()
        {
            DateTime expireDate = DateTime.UtcNow.Subtract(_ttl);
            InMemoryMonitoringData.Events.RemoveAll(evt => evt.Expire && evt.Timestamp < expireDate);
        }
    }
}

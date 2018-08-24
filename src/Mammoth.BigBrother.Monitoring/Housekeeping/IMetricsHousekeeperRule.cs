using System;

namespace Mammoth.BigBrother.Monitoring.Housekeeping
{
    public interface IMetricsHousekeeperRule
    {
        void Cleanup();
    }
}

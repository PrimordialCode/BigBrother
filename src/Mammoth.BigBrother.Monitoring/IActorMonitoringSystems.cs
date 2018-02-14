using System;
using System.Collections.Generic;

namespace Mammoth.BigBrother.Monitoring
{
    public interface IActorMonitoringSystems
    {
        void AddSystem(IActorMonitoringSystem monitoringSystem);
        void RemoveSystem(string monitoringSystemName);
        void RemoveAll();
        bool IsEnabled { get; }
        void UpdateCounter(string metricName, double delta = 1, IDictionary<string, string> properties = null);
        void UpdateGauge(string metricName, int value, IDictionary<string, string> properties = null);
        void TrackTiming(string metricName, long time, IDictionary<string, string> properties = null);
        void TrackEvent(string evt, IDictionary<string, string> properties = null);
        void TrackException(Exception exception, IDictionary<string, string> properties = null);
    }
}
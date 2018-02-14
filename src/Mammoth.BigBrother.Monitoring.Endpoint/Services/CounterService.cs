using Mammoth.BigBrother.Monitoring.Endpoint.Dto;
using Mammoth.BigBrother.Monitoring.MonitoringSystems;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Mammoth.BigBrother.Monitoring.Endpoint.Services
{
    internal static class CounterService
    {
        internal static IEnumerable<CounterDto> GetActorsCounters(string path)
        {
            var match = "." + path;
            return InMemoryMonitoringData.Counters
                            .Where(_ => _.Key.EndsWith(match, StringComparison.InvariantCultureIgnoreCase))
                            .Select(_ => new CounterDto
                            {
                                Name = _.Key.Replace(match, ""),
                                Value = _.Value
                            })
                            .OrderBy(_ => _.Name);
        }

        internal static double? Counter(this IEnumerable<CounterDto> counters, string counter)
        {
            return counters.SingleOrDefault(_ => _.Name == counter)?.Value;
        }
    }
}

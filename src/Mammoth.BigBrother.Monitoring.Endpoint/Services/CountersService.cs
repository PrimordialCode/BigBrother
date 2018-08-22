using Mammoth.BigBrother.Monitoring.Endpoint.Dto;
using Mammoth.BigBrother.Monitoring.Systems;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Mammoth.BigBrother.Monitoring.Endpoint.Services
{
    internal static class CountersService
    {
        internal static IEnumerable<CounterDto> GetAllCounters()
        {
            return InMemoryMonitoringData.Counters.Select(_ => new CounterDto
            {
                Name = _.Key,
                Value = _.Value
            })
            .OrderBy(_ => _.Name);
        }

        internal static IEnumerable<CounterDto> GetById(string id)
        {
            return InMemoryMonitoringData.Counters.Where(_ => _.Key == id)
                .Select(_ => new CounterDto
                {
                    Name = _.Key,
                    Value = _.Value
                })
                .OrderBy(_ => _.Name);
        }

        internal static IEnumerable<CounterDto> GetActorsDefaultCounters()
        {
            return InMemoryMonitoringData.Counters.Where(_ => MetricCounters.ActorsDefaultCounters.Contains(_.Key))
                .Select(_ => new CounterDto
                {
                    Name = _.Key,
                    Value = _.Value
                })
                .OrderBy(_ => _.Name);
        }

        internal static IEnumerable<CounterDto> GetActorCounters(string actorPath)
        {
            var match = "." + actorPath;
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

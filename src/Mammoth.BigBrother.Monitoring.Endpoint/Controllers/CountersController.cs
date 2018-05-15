using System;
using System.Collections.Generic;
using System.Linq;
using Mammoth.BigBrother.Monitoring.Endpoint.Dto;
using Mammoth.BigBrother.Monitoring.Endpoint.Services;
using Mammoth.BigBrother.Monitoring.MonitoringSystems;
#if NET45
using System.Web.Http;
#endif
#if NETCOREAPP2_0
using Microsoft.AspNetCore.Mvc;
#endif


namespace Mammoth.BigBrother.Monitoring.Endpoint.Controllers
{
    [Route("api/[controller]")]
    public class CountersController : Controller
    {
        /// <summary>
        /// Get all the counters
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<CounterDto> Get()
        {
            return InMemoryMonitoringData.Counters.Select(_ => new CounterDto
            {
                Name = _.Key,
                Value = _.Value
            })
            .OrderBy(_ => _.Name);
        }

        /// <summary>
        /// Get all the global counters
        /// </summary>
        /// <returns></returns>
        [Route("GlobalCounters")]
        [HttpGet]
        public IEnumerable<CounterDto> GlobalCounters()
        {
            return InMemoryMonitoringData.Counters.Where(_ => MetricCounters.DefaultCounters.Contains(_.Key))
                .Select(_ => new CounterDto
                {
                    Name = _.Key,
                    Value = _.Value
                })
                .OrderBy(_ => _.Name);
        }

        /// <summary>
        /// Get all the counters related to a single actor
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        [Route("GetActorsCounter")]
        [HttpPost]
        public IEnumerable<CounterDto> GetActorsCounter([FromBody]ActorRequestDto args)
        {
            return CounterService.GetActorsCounters(args.Path);
        }

        // GET api/<controller>/name
        [Route("{id}")]
        [HttpGet]
        public IEnumerable<CounterDto> Get(string id)
        {
            return InMemoryMonitoringData.Counters.Where(_ => _.Key.StartsWith(id, StringComparison.InvariantCultureIgnoreCase))
                .Select(_ => new CounterDto
                {
                    Name = _.Key,
                    Value = _.Value
                })
                .OrderBy(_ => _.Name);
        }
    }
}

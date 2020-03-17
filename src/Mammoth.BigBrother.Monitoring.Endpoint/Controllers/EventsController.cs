using System.Collections.Generic;
using System.Linq;
using Mammoth.BigBrother.Monitoring.Endpoint.Dto;
using Mammoth.BigBrother.Monitoring.Metrics;
using Mammoth.BigBrother.Monitoring.Systems.InMemory;
#if NET461
using System.Web.Http;
#endif
#if NETCOREAPP2_2
using Microsoft.AspNetCore.Mvc;
#endif

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Mammoth.BigBrother.Monitoring.Endpoint.Controllers
{
    [Route("api/[controller]")]
    public class EventsController : Controller
    {
        /// <summary>
        /// return the 100 most recent events
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<MonitoringEventData> Get()
        {
            return InMemoryMonitoringData.Events
                // .TakeLat(100) // not available in net45
                .Skip(System.Math.Max(0, InMemoryMonitoringData.Events.Count - 100))
                .Reverse();
        }

        [Route("GetActorEvents")]
        [HttpPost]
        public IEnumerable<MonitoringEventData> GetActorEvents([FromBody]ActorRequestDto args)
        {
            return InMemoryMonitoringData.Events
                .Where(e =>
                    e.Properties.ContainsKey(MetricProperties.Actor)
                    && e.Properties[MetricProperties.Actor] == args.Path)
                .OrderByDescending(e => e.Timestamp);
        }
    }
}

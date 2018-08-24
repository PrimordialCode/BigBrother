using System.Collections.Generic;
using System.Linq;
using Mammoth.BigBrother.Monitoring.Endpoint.Dto;
using Mammoth.BigBrother.Monitoring.Metrics;
using Mammoth.BigBrother.Monitoring.Systems.InMemory;
#if NET45
using System.Web.Http;
#endif
#if NETCOREAPP2_0
using Microsoft.AspNetCore.Mvc;
#endif

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Mammoth.BigBrother.Monitoring.Endpoint.Controllers
{
    [Route("api/[controller]")]
    public class ExceptionsController : Controller
    {
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<MonitoringExceptionData> Get()
        {
            return InMemoryMonitoringData.Exceptions
                // .TakeLat(100) // not available in net45
                .Skip(System.Math.Max(0, InMemoryMonitoringData.Exceptions.Count - 100))
                .Reverse();
        }

        [Route("GetActorExceptions")]
        [HttpPost]
        public IEnumerable<MonitoringExceptionData> GetActorExceptions([FromBody]ActorRequestDto args)
        {
            return InMemoryMonitoringData.Exceptions
                .Where(e =>
                    e.Properties.ContainsKey(MetricProperties.Actor)
                    && e.Properties[MetricProperties.Actor] == args.Path)
                .OrderByDescending(e => e.Timestamp);
        }
    }
}

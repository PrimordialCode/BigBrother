using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mammoth.BigBrother.Monitoring.Endpoint.Dto;
using Mammoth.BigBrother.Monitoring.MonitoringSystems;
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
            return InMemoryMonitoringData.Exceptions.Take(100);
        }

        [Route("GetActorExceptions")]
        [HttpPost]
        public IEnumerable<MonitoringExceptionData> GetActorExceptions([FromBody]ActorRequestDto args)
        {
            return InMemoryMonitoringData.Exceptions
                .Where(e => e.Properties.ContainsKey(MetricProperties.Actor) && e.Properties[MetricProperties.Actor] == args.Path)
                .OrderByDescending(e => e.Timestamp);
        }
    }
}

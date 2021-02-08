using System.Collections.Generic;
using Mammoth.BigBrother.Monitoring.Endpoint.Dto;
using Mammoth.BigBrother.Monitoring.Endpoint.Services;
#if NET461
using System.Web.Http;
#endif
#if NETCOREAPP2_2 || NET5_0
using Microsoft.AspNetCore.Mvc;
#endif

namespace Mammoth.BigBrother.Monitoring.Endpoint.Controllers
{
    [Route("api/[controller]")]
    public class CountersController : Controller
    {
        /// <summary>
        /// Get all the counters sorted by name
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<CounterDto> Get()
        {
            return CountersService.GetAllCounters();
        }

        /// <summary>
        /// returns a specific counter
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("{id}")]
        [HttpGet]
        public IEnumerable<CounterDto> Get(string id)
        {
            return CountersService.GetById(id);
        }

        /// <summary>
        /// Get all the global counters
        /// </summary>
        /// <returns></returns>
        [Route("GlobalCounters")]
        [HttpGet]
        public IEnumerable<CounterDto> GlobalCounters()
        {
            return CountersService.GetActorsDefaultCounters();
        }

        // todo: rename in GetActorCounters
        /// <summary>
        /// Get all the counters related to a single actor
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        [Route("GetActorsCounter")]
        [HttpPost]
        public IEnumerable<CounterDto> GetActorsCounter([FromBody]ActorRequestDto args)
        {
            return CountersService.GetActorCounters(args.Path);
        }
    }
}

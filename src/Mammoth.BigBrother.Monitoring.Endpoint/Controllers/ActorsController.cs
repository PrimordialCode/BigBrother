using System.Linq;
using System.Text;
using Mammoth.BigBrother.Monitoring.Endpoint.Dto;
using Mammoth.BigBrother.Monitoring.Endpoint.Services;
using Mammoth.BigBrother.Monitoring.Systems.InMemory;
#if NET472_OR_GREATER
using System.Web.Http;
#endif
#if NET5_0_OR_GREATER
using Microsoft.AspNetCore.Mvc;
#endif

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Mammoth.BigBrother.Monitoring.Endpoint.Controllers
{
    [Route("api/[controller]")]
    public class ActorsController : Controller
    {
        private const string ActorCreated = MetricCounters.ActorCreated + ".";

        /// <summary>
        /// returns Tree structure listing all the actors (from the InMemory session)
        /// </summary>
        /// <returns></returns>
        [Route("gethierarchy")]
        [HttpGet]
        public ActorInfoDto GetHierarchy()
        {
            var actorsFullPaths = ListAllActors();

            var root = MakeTreeFromPaths(actorsFullPaths, "System");

            return root;
        }

        [Route("GetActorDetail")]
        [HttpPost]
        public ActorDetailDto GetActorDetail([FromBody]ActorRequestDto args)
        {
            var detail = new ActorDetailDto();

            // get the counters
            var counters = CountersService.GetActorCounters(args.Path);
            var counterStarted = counters.Counter(MetricCounters.ActorCreated) ?? 0;
            var counterStopped = counters.Counter(MetricCounters.ActorStopped) ?? 0;

            detail.Status = (counterStarted - counterStopped) > 0 ? ActorStatus.Started : ActorStatus.Stopped;

            return detail;
        }

        private string[] ListAllActors()
        {
            return InMemoryMonitoringData.Counters
                .Where(c => c.Key.StartsWith(ActorCreated))
                .Select(c => c.Key.Replace(ActorCreated, ""))
                .ToArray();
        }

        public static ActorInfoDto MakeTreeFromPaths(string[] paths, string rootNodeName = "", char separator = '/')
        {
            var rootNode = new ActorInfoDto(rootNodeName, "ActorSystem");
            foreach (var path in paths.Where(x => !string.IsNullOrEmpty(x.Trim())))
            {
                var currentNode = rootNode;
                var pathItems = path.Split(separator);
                var partialPath = new StringBuilder();
                foreach (var item in pathItems)
                {
                    partialPath.Append(item).Append(separator);
                    var tmp = currentNode.Children.Where(x => x.Name.Equals(item));
                    if (tmp.Any())
                    {
                        currentNode = tmp.Single();
                    }
                    else
                    {
                        // create the new node
                        var node = new ActorInfoDto(item, partialPath.ToString().TrimEnd(separator));
                        // add it to the children
                        currentNode.Children.Add(node);
                        // set it as the current node
                        currentNode = node;
                    }
                }
            }
            return rootNode;
        }
    }
}

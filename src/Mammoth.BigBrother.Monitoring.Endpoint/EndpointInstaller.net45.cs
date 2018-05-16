#if NET45

using System;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using System.Web.Cors;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.SelfHost;

namespace Mammoth.BigBrother.Monitoring.Endpoint
{
    public static class EndpointInstaller
    {
        private static HttpSelfHostServer _webHost;
        private static int _loopbackPort;

        public static void Start(int loopbackPort)
        {
            _loopbackPort = loopbackPort;
            _webHost = BuildWebHost(null);
            _webHost.OpenAsync().Wait();
        }

        public static Task Stop()
        {
            // await _webHost.StopAsync().ConfigureAwait(false);
            return Task.Delay(0);
        }

        private static HttpSelfHostServer BuildWebHost(string[] args)
        {
            var config = new HttpSelfHostConfiguration("http://" + IPAddress.Loopback + ":" + _loopbackPort);

            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);
            //config.Routes.MapHttpRoute(
            //    "CrossDomain", "crossdomain.xml",
            //    new { controller = "CrossDomain" });

            config.Routes.MapHttpRoute(
                "API Default", "api/{controller}/{action}/{id}",
                new { id = RouteParameter.Optional });

            return new HttpSelfHostServer(config);
        }

    }
}

#endif

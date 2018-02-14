using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Mammoth.BigBrother.Ui.Configurations;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Mammoth.BigBrother.Ui
{
    public static class Program
    {
        private static HostConfiguration _hostConfiguration;

        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((hostingContext, config) =>
                {
                    var env = hostingContext.HostingEnvironment;

                    config.SetBasePath(env.ContentRootPath)
                        .AddJsonFile("./appsettings.json", optional: false, reloadOnChange: true)
                        .AddJsonFile($"./appSettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true)
                        .AddEnvironmentVariables();

                    IConfigurationRoot cfg = config.Build();

                    _hostConfiguration = cfg.GetSection("Host").Get<HostConfiguration>();
                })
                .UseStartup<Startup>()
                .UseKestrel(options =>
                {
                    options.Listen(IPAddress.Loopback, _hostConfiguration.Port);
                })
                .Build();
    }
}

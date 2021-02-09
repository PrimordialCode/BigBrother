using System.Net;
using Mammoth.BigBrother.Ui.Configurations;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace Mammoth.BigBrother.Ui
{
    public static class Program
    {
        private static HostConfiguration _hostConfiguration;

        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Run();
        }

        public static IHost CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((hostingContext, config) =>
                {
                    var env = hostingContext.HostingEnvironment;

                    // not needed with this setup method (they are already included by default)
                    //config.SetBasePath(env.ContentRootPath)
                    //    .AddJsonFile("./appsettings.json", optional: false, reloadOnChange: true)
                    //    .AddJsonFile($"./appSettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true)
                    //    .AddEnvironmentVariables();

                    IConfigurationRoot cfg = config.Build();

                    _hostConfiguration = cfg.GetSection("Host").Get<HostConfiguration>();
                })
                .ConfigureWebHostDefaults(webBuilder =>
                    {
                        webBuilder.ConfigureKestrel(serverOptions =>
                        {
                            serverOptions.Listen(IPAddress.Loopback, _hostConfiguration.Port);
                        })
                        .UseStartup<Startup>();
                    })
                .Build();
    }
}

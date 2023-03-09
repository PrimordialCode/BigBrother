#if NET5_0_OR_GREATER

using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Net;
using System.Threading.Tasks;

namespace Mammoth.BigBrother.Monitoring.Endpoint
{
	public static class EndpointInstaller
	{
		private static IWebHost? _webHost;
		private static int _loopbackPort;

		public static void Start(int loopbackPort)
		{
			_loopbackPort = loopbackPort;
			_webHost = BuildWebHost(Array.Empty<string>());
			_webHost.Start();
		}

		public static async Task Stop()
		{
			if (_webHost != null)
			{
				await _webHost.StopAsync().ConfigureAwait(false);
			}
		}

		private static IWebHost BuildWebHost(string[] args) =>
			 new WebHostBuilder()
				.UseKestrel(options => options.Listen(IPAddress.Loopback, _loopbackPort))
				.UseContentRoot(Directory.GetCurrentDirectory())
				.ConfigureAppConfiguration((hostingContext, config) =>
				{
					var env = hostingContext.HostingEnvironment;
					config.SetBasePath(AppDomain.CurrentDomain.BaseDirectory);
					config.AddJsonFile("appsettings.bigbrother.json", optional: true, reloadOnChange: true)
						  .AddJsonFile($"appsettings.bigbrother.{env.EnvironmentName}.json", optional: true, reloadOnChange: true);
					config.AddEnvironmentVariables();
				})
				.ConfigureLogging((hostingContext, logging) =>
				{
					logging.AddConfiguration(hostingContext.Configuration.GetSection("Logging"));
					logging.AddConsole();
					logging.AddDebug();
				})
				.UseStartup<Startup>()
				.Build();

		//private static IWebHost BuildWebHost(string[] args) =>
		//    WebHost.CreateDefaultBuilder(args)
		//        .UseStartup<Startup>()
		//        .UseKestrel(options => options.Listen(IPAddress.Loopback, _loopbackPort))
		//        .Build();
	}
}

#endif

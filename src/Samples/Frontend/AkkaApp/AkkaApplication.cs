extern alias akka;

using akka::Akka.Actor;
using akka::Akka.Configuration;
using Frontend.AkkaApp.UI.Cqrs;
using Frontend.Shared;
using Mammoth.BigBrother.Monitoring;
using Mammoth.BigBrother.Monitoring.Endpoint;
using Mammoth.BigBrother.Monitoring.MonitoringSystems;
using Microsoft.Extensions.DependencyInjection;

namespace Frontend.AkkaApp
{
    /// <summary>
    /// a singleton instance of the application, it wraps the ActorSystem for this process
    /// </summary>
    internal class AkkaApplication
    {
        private ActorSystem _actorSystem;

        public void Initialize(string name, IServiceCollection serviceCollection)
        {
            // register anything that is Actor Framework specific
            // Actors MUST be transient
            // Any actor depencency must be transient or singleton
            serviceCollection.AddTransient<ProjectionActor>();
            serviceCollection.AddTransient<RoomActor>();

            ActorMonitoring.AddSystem(new InMemoryActorMonitoringSystem("InMemory"));
            EndpointInstaller.Start(5001);

            string hocon = System.IO.File.ReadAllText(@".\AkkaApp\hocon.cfg");
            var config = ConfigurationFactory.ParseString(hocon);
            // .WithFallback();
            ColoredConsole.WriteLine("Creating the ActorSystem");
            _actorSystem = ActorSystem.Create(name, config);
            var resolver = new AkkaServiceProviderDependencyResolver(serviceCollection.BuildServiceProvider(), _actorSystem);
        }

        public void WaitForShutdown()
        {
            ColoredConsole.WriteLine("Awaiting for ActorSystem Termination");
            _actorSystem.WhenTerminated.Wait();
            ColoredConsole.WriteLine("ActorSystem Terminated");

            EndpointInstaller.Stop().Wait();
        }

        public void Start()
        {
            ColoredConsole.WriteLine("Starting the ConsoleUi Actor");
            // var _consoleUi = _actorSystem.ActorOf<Ui.Console.ConsoleUiActor>("ConsoleUi");
            var _consoleUi = _actorSystem.ActorOf<Ui.Cqrs.ConsoleUiActor>("ConsoleUi");
            _consoleUi.Tell("start");
        }
    }
}

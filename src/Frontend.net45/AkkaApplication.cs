using Akka.Actor;
using Akka.Configuration;
using Akka.Event;
using Mammoth.BigBrother.Akka.Monitoring;
using Mammoth.BigBrother.Monitoring;
using Mammoth.BigBrother.Monitoring.Endpoint;
using Mammoth.BigBrother.Monitoring.MonitoringSystems;
using System;

namespace Frontend.net45
{
    class AkkaApplication
    {
        private ActorSystem _actorSystem;

        public void Initialize(string name)
        {
            ActorMonitoring.AddSystem(new InMemoryActorMonitoringSystem("InMemory"));
            EndpointInstaller.Start(5003);

            string hocon = System.IO.File.ReadAllText(System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"hocon.cfg"));
            var config = ConfigurationFactory.ParseString(hocon);
            // .WithFallback();
            ColoredConsole.WriteLine("Creating the ActorSystem");
            _actorSystem = ActorSystem.Create(name, config);

            // add a deadletter watcher actor
            var deadlettermonitorRef = _actorSystem.ActorOf<DeadLetterMonitor>("deadlettermonitor");
            _actorSystem.EventStream.Subscribe(deadlettermonitorRef, typeof(DeadLetter));
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
            var _consoleUi = _actorSystem.ActorOf<ConsoleUiActor>("ConsoleUi");
            _consoleUi.Tell("start");
        }
    }
}

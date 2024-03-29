﻿using Akka.Actor;
using Akka.Configuration;
using Akka.DependencyInjection;
using Akka.Event;
using Frontend.AkkaApp.UI.Cqrs;
using Frontend.Shared;
using Mammoth.BigBrother.Akka.Monitoring;
using Mammoth.BigBrother.Monitoring;
using Mammoth.BigBrother.Monitoring.Endpoint;
using Mammoth.BigBrother.Monitoring.Housekeeping;
using Mammoth.BigBrother.Monitoring.Systems.InMemory;
using Mammoth.BigBrother.Monitoring.Systems.InMemory.Housekeeping;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace Frontend.AkkaApp
{
    /// <summary>
    /// a singleton instance of the application, it wraps the ActorSystem for this process
    /// </summary>
    internal class AkkaApplication
    {
        private ActorSystem _actorSystem;

        public void Initialize(string name, IServiceCollection serviceCollection, int endpointPort)
        {
            // register anything that is Actor Framework specific
            // Actors MUST be transient
            // Any actor depencency must be transient or singleton
            serviceCollection.AddTransient<ProjectionActor>();
            serviceCollection.AddTransient<ProjectionActorV2>();
            serviceCollection.AddTransient<RoomActor>();

            MonitoringSystems.AddSystem(new InMemoryMonitoringSystem("InMemory"));
            ActorMonitoring.TrackReceivedMessagesEnabled = true;
            MetricsHousekeeper.Configure(new []
            {
                new InMemoryEventsExpirationRule(TimeSpan.FromMinutes(5))
            });
            MetricsHousekeeper.Schedule(TimeSpan.FromMinutes(1));
            EndpointInstaller.Start(endpointPort);

            string hocon = System.IO.File.ReadAllText(System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"AkkaApp\hocon.cfg"));
            var config = ConfigurationFactory.ParseString(hocon);
            // .WithFallback();
            ColoredConsole.WriteLine("Creating the ActorSystem");
            var bootstrap = BootstrapSetup.Create().WithConfig(hocon);
            var di = DependencyResolverSetup.Create(serviceCollection.BuildServiceProvider());
            var actorSystemSetup = bootstrap.And(di);
            _actorSystem = ActorSystem.Create(name, actorSystemSetup);
            
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
            // var _consoleUi = _actorSystem.ActorOf<Ui.Console.ConsoleUiActor>("ConsoleUi");
            var _consoleUi = _actorSystem.ActorOf<Ui.Cqrs.ConsoleUiActor>("ConsoleUi");
            _consoleUi.Tell("start");
        }
    }
}

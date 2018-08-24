using Frontend.Shared;
using System;

namespace Frontend
{
    /// <summary>
    /// I can have several actors at play:
    /// EngineActor - will hold the full application (and supervise all the other actors)
    /// CommandHandlersActors - will receive commands and 'delegate' to
    /// AggregateActors - will do the actual work (and maybe persist their state or emit domain events)
    ///					  the system must know how to bring these to life if they are not available.
    ///					  one actor can live in one single space
    /// ProjectionActors - will create the projections (if we use an EventSourcing approach)
    /// ProcessManagers - will use information from other actors to emit commands
    /// </summary>
    internal static class Program
    {
        internal static void Main(string[] args)
        {
            Console.Title = "DOTNET CORE - Starting Application";
            ColoredConsole.WriteLine(Console.Title);
            var settings = new ApplicationSettings
            {
                ActorFramework = ActorFramework.Akka
            };
            var application = new Application();
            application.Init(settings);
            application.WaitForShutdown();
            ColoredConsole.WriteLine("Application Terminated, press 'enter' to close.");
            Console.ReadLine();
        }
    }
}

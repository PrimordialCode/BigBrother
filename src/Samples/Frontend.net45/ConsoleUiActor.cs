using Akka.Actor;
using System;

namespace Frontend.net45
{
    /// <summary>
    /// The main application actor: it will the whole application
    /// 
    /// when it receives a start message we:
    /// - create all the needed interacting actors (reader, writer)
    /// - display the UI welcome screen
    /// - ask the reader actor to await for user input
    /// - process messages that belongs to us (terminate)
    /// </summary>
    internal class ConsoleUiActor : UntypedActorWithLog
    {
        protected override void OnReceive(object message)
        {
            var msg = (string)message;
            switch (msg)
            {
                case "start":
                    // create the writer and the reader
                    var writer = Context.ActorOf<ConsoleWriterActor>("ConsoleWriter");
                    var reader = Context.ActorOf(Props.Create(() => new ConsoleReaderActor(this.Self, writer)), "ConsoleReader");
                    // display
                    ColoredConsole.WriteLine("Console UI Ready");
                    ColoredConsole.WriteLine("Enter 'quit' to terminate");
                    reader.Tell("readnext");
                    break;
                case "terminate":
                    Context.System.Terminate();
                    break;
                default:
                    // remember to caall Undlandled() on any message not handled by an UntypedActor
                    Unhandled(message);
                    break;
            }
        }

        protected override SupervisorStrategy SupervisorStrategy()
        {
            // AllForOneStrategy
            // OneForOneStrategy
            return new OneForOneStrategy(
                3,
                TimeSpan.FromMinutes(2),
                ex =>
                {
                    // delegate to the default supervision startegy
                    return Akka.Actor.SupervisorStrategy.DefaultStrategy.Decider.Decide(ex);
                });
        }
    }
}

using Akka.Actor;
using Akka.DI.Core;
using Frontend.AkkaApp.Ui.Console;
using Frontend.AkkaApp.UI.Cqrs;
using Frontend.AkkaApp.UI.Support;
using Frontend.Shared;
using Frontend.Shared.Exceptions;
using System;

namespace Frontend.AkkaApp.Ui.Cqrs
{
    /// <summary>
    /// The main application actor: it will manage a specific user interface
    /// 
    /// when we reice a start message we:
    /// - create all the needed interacting actors
    /// - display the UI welcome screen
    /// - await for user input
    /// - process messages that belongs to us 
    /// </summary>
    internal class ConsoleUiActor : UntypedActorWithLog
    {
        protected override void OnReceive(object message)
        {
            var msg = (string)message;
            switch (msg)
            {
                case "start":
                    // create the CQRS engine actors
                    var projectionActor = Context.ActorOf(Context.DI().Props<ProjectionActorV2>(), "projectionEngine");
                    projectionActor.Tell(StartPolling.Instance);
                    // create the writer and the reader
                    var writer = Context.ActorOf<ConsoleWriterActor>("ConsoleWriter");
                    var debugUtilsActor = Context.ActorOf(Props.Create<DebugUtilsActor>(writer), "debugutils");
                    var commandHandlerCoordinator = Context.ActorOf(Props.Create(() => new CommandHandlerCoordinatorActor(writer)), "CommandHandler");
                    // var commandHandlerCoordinator = Context.ActorOf(CommandHandlerWorkerActor.RouterProps(writer), "CommandHandler");
                    var reader = Context.ActorOf(Props.Create(() => new ConsoleReaderActor(writer, debugUtilsActor, this.Self, commandHandlerCoordinator)), "ConsoleReader");
                    // display
                    ColoredConsole.WriteLine("Console UI Ready");
                    ColoredConsole.WriteLine("Enter a message in the form: 'type id message'");
                    ColoredConsole.WriteLine("Type: 1 | 2");
                    ColoredConsole.WriteLine("Id: anything");
                    ColoredConsole.WriteLine("Message: escalateexception | restartexception | resumeexception | stopexception | stop | poisonpill | kill | gracefulstop | dumpstatus | any text");
                    ColoredConsole.WriteLine("Enter 'quit' to terminate.");
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

        /// <summary>
        /// Supervision strategy (useful if we use the ConsistentHashRouter approach)
        /// </summary>
        /// <returns></returns>
        protected override SupervisorStrategy SupervisorStrategy()
        {
            // AllForOneStrategy
            // OneForOneStrategy
            return new OneForOneStrategy(
                3,
                TimeSpan.FromMinutes(2),
                ex =>
                {
                    if (ex is EscalateException)
                    {
                        return Directive.Escalate;
                    }
                    if (ex is RestartException)
                    {
                        return Directive.Restart;
                    }
                    if (ex is ResumeException)
                    {
                        return Directive.Resume;
                    }
                    if (ex is StopException)
                    {
                        return Directive.Stop;
                    }
                    // delegate to the default supervision startegy
                    return Akka.Actor.SupervisorStrategy.DefaultStrategy.Decider.Decide(ex);
                });
        }
    }
}

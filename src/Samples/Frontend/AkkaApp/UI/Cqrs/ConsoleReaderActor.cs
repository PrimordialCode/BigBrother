using System;
using Frontend.Shared.UI.Messages;
using Frontend.AkkaApp.UI.Support.Messages;
using Frontend.Shared.Cqrs.Commands;
using Frontend.AkkaApp.UI.Cqrs;
using Frontend.Shared.Cqrs.Domain.Room;
using Akka.Actor;

namespace Frontend.AkkaApp.Ui.Cqrs
{
    /// <summary>
    /// An actor that manages the user input
    /// 
    /// this is a 'blocking' actor, it cannot do anything while waiting for the user to insert some text...
    /// (Console.Readline())
    /// </summary>
    internal class ConsoleReaderActor : UntypedActorWithLog
    {
        private readonly IActorRef _consoleUi;
        private readonly IActorRef _commandHandlerCoordinator;
        private readonly IActorRef _writer;
        private readonly IActorRef _debugUtils;

        private const string QuitCommand = "quit";
        private const string DumpActors = "dumpactors";
        private const string EscalateExceptionCommand = "escalateexception";
        private const string RestartExceptionCommand = "restartexception";
        private const string ResumeExceptionCommand = "resumeexception";
        private const string StopExceptionCommand = "stopexception";
        private const string StopCommand = "stop";
        private const string PoisonPillCommand = "poisonpill";
        private const string KillCommand = "kill";
        private const string GracefulStopCommand = "gracefulstop";
        private const string DumpStatusCommand = "dumpstatus";

        public ConsoleReaderActor(
            IActorRef writer,
            IActorRef debugUtils,
            IActorRef consoleUi, // should go in the command handler aggregate
            IActorRef commandHandlerCoordinator)
        {
            _writer = writer;
            _debugUtils = debugUtils;
            _consoleUi = consoleUi;
            _commandHandlerCoordinator = commandHandlerCoordinator;
        }

        protected override void OnReceive(object message)
        {
            // actually every message activates the reader

            var text = System.Console.ReadLine();
            if (text == QuitCommand)
            {
                _consoleUi.Tell("terminate");
                return;
            }

            if (text == DumpActors)
            {
                _debugUtils.Tell(new DumpActors("akka://AkkaAppActorSystem/user/ConsoleUi/CommandHandler"));
                ReadNextLine();
                return;
            }

            // parse the command
            var parsedText = text.Split(' ');
            // some validation
            if (parsedText.Length == 3)
            {
                // build the message
                // send it to the coordinator
                var command = ParseCommand(parsedText);
                if (command != null)
                {
                    _commandHandlerCoordinator.Tell(command);
                }
                else
                {
                    ReportUnsupportedCommand(text);
                }
            }
            else
            {
                ReportUnsupportedCommand(text);
            }

            ReadNextLine();
        }

        private void ReadNextLine()
        {
            Self.Tell("readnext");
        }

        private object ParseCommand(string[] tokens)
        {
            object command = null;
            if (tokens[0] == ActorTypes.CommandHandler1 || tokens[0] == ActorTypes.CommandHandler2)
            {
                command = ParseCommand(tokens[2]);
            }
            if (tokens[0] == ActorTypes.Room)
            {
                command = ParseRoomCommands(tokens[2], tokens[1]);
            }
            if (command != null)
            {
                return new RoutedCommandEnvelope(tokens[0], tokens[1], command);
            }
            return null;
        }

        private object ParseRoomCommands(string command, string id)
        {
            switch (command)
            {
                case "enable":
                    return new EnableBookingCommand(id);
                case "disable":
                    return new DisableBookingCommand(id);
                case "book":
                    var rnd = new Random(DateTime.Now.Millisecond);
                    var fromDate = DateTime.Today.AddDays(rnd.Next(10));
                    var toDate = fromDate.AddDays(rnd.Next(5));
                    return new BookRoomCommand(id, new DateRange(fromDate, toDate)); // todo: how to specify date ranges
                default:
                    return null;
            }
        }

        private object ParseCommand(string v)
        {
            switch (v)
            {
                case EscalateExceptionCommand:
                    return new EscalateExceptionCommand();
                case RestartExceptionCommand:
                    return new RestartExceptionCommand();
                case ResumeExceptionCommand:
                    return new ResumeExceptionCommand();
                case StopExceptionCommand:
                    return new StopExceptionCommand();
                case StopCommand:
                    return new StopCommand();
                case PoisonPillCommand:
                    return new PoisonPillCommand();
                case KillCommand:
                    return new KillCommand();
                case GracefulStopCommand:
                    return new GracefulStopCommand();
                case DumpStatusCommand:
                    return new DumpStatusCommand();
                default:
                    return v;
            }
        }

        private void ReportUnsupportedCommand(string text)
        {
            _writer.Tell("Unsupported command: " + text);
        }
    }
}

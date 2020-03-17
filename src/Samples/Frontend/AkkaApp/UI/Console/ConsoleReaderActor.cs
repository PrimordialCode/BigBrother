using Akka.Actor;
using Frontend.Shared;
using Frontend.Shared.UI.Messages;
using System;

namespace Frontend.AkkaApp.Ui.Console
{
	/// <summary>
	/// An Actor that manages the user input from the console,
	/// - it wait for user input
	/// - it parse the user input in commands that will be directed to the rest of the application
	/// 
	/// To 'activate' the actor we need to send it a message, we ask her to read the next message with a 'readnext' message.
	/// (actually any message activates the actor)
	/// </summary>
	internal class ConsoleReaderActor : UntypedActorWithLog
	{
		private readonly IActorRef _consoleUi;
		private readonly IActorRef _commandHandler;

		private const string QuitCommand = "quit";
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
			IActorRef consoleUi,
			IActorRef commandHandler)
		{
			_consoleUi = consoleUi;
			_commandHandler = commandHandler;
		}

		protected override void OnReceive(object message)
		{
			// actually every message activates the reader

			var text = System.Console.ReadLine();
			switch (text)
			{
				case QuitCommand:
					_consoleUi.Tell("terminate");
					return;
				case StopCommand:
					// Actor receives the Stop message and suspends the actor’s Mailbox (other messages will go to DeadLetters).
					// Actor tells all its children to Stop. Stop messages propagate down the hierarchy below the actor.
					// Actor waits for all children to stop.
					// Actor calls PostStop lifecycle hook method for resource cleanup.
					// Actor shuts down.
					Context.Stop(_commandHandler);
					break;
				case PoisonPillCommand:
					// Use a PoisonPill message if you want the actor to process its mailbox before shutting down.
					// PoisonPill is a message that will be placed in the mailbox.
					// When the Actor process the message the above mentioned stop sequence will be initiated.
					_commandHandler.Tell(PoisonPill.Instance);
					break;
				case KillCommand:
					// Use a Kill message if you want it to show in your logs that the actor was killed.
					// The actor throws an ActorKilledException. The actor’s supervisor logs this message.
					// This suspends the actor mailbox from processing further user messages.
					// The actor’s supervisor handles the ActorKilledException and issues a Stop directive.
					// The actor will stop following the above mentioned stop sequence.
					_commandHandler.Tell(Kill.Instance);
					break;
				case GracefulStopCommand:
					// If you want confirmation that the actor was stopped within a specified Timespan.
					// It will return a Task<bool> you can check to know if the Actor was stopped.
					var gracefulStop = _commandHandler.GracefulStop(TimeSpan.FromSeconds(5));
					gracefulStop.Wait();
					if (gracefulStop.Result)
					{
						ColoredConsole.WriteLineGreen("GracefulStop completed");
					}
					else
					{
						ColoredConsole.WriteLineYellow("GracefulStop failed");
					}
					break;
				case EscalateExceptionCommand:
					_commandHandler.Tell(new EscalateExceptionCommand());
					break;
				case RestartExceptionCommand:
					_commandHandler.Tell(new RestartExceptionCommand());
					break;
				case ResumeExceptionCommand:
					_commandHandler.Tell(new ResumeExceptionCommand());
					break;
				case StopExceptionCommand:
					_commandHandler.Tell(new StopExceptionCommand());
					break;
				case DumpStatusCommand:
					_commandHandler.Tell(new DumpStatusCommand());
					break;
				default:
					_commandHandler.Tell(text);
					break;
			}
			// send a message to outself stating we are ready to read the next command
			Self.Tell("readnext");

			// we have no unhandled message here, every message will activare the read cycle again.
		}
	}
}

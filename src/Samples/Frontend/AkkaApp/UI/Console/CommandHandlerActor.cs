using Akka.Actor;
using Frontend.Shared;
using Frontend.Shared.Exceptions;
using Frontend.Shared.UI.Messages;

namespace Frontend.AkkaApp.UI.Console
{
	/// <summary>
	/// this actor process the application commands gathered by the 
	/// user input
	/// </summary>
	internal class CommandHandlerActor : UntypedActorWithLog
	{
		private IActorRef _writer;

		/// <summary>
		/// Actor internal status
		/// </summary>
		private object _lastMessageReceived;

		public CommandHandlerActor(IActorRef writer)
		{
			_writer = writer;
		}

		protected override void OnReceive(object message)
		{
			if (message is EscalateExceptionCommand)
			{
				throw new EscalateException();
			}
			else if (message is RestartExceptionCommand)
			{
				throw new RestartException();
			}
			else if (message is ResumeExceptionCommand)
			{
				throw new ResumeException();
			}
			else if (message is StopExceptionCommand)
			{
				throw new StopException();
			}
			else if (message is DumpStatusCommand)
			{
				ColoredConsole.WriteLine($"{LogActorName()}internal status: {_lastMessageReceived}");
			}
			else
			{
				_lastMessageReceived = message;
				_writer.Tell(message);
			}
		}
	}
}

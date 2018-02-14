extern alias akka;

using akka::Akka.Actor;
using Frontend.Shared;
using Frontend.Shared.Exceptions;
using Frontend.Shared.UI.Messages;

namespace Frontend.AkkaApp.UI.Console
{
	/// <summary>
	/// this actor process the application commands gathered by the 
	/// user input
	/// </summary>
	internal class CommandHandlerActor : ReceiveActorWithLog
	{
		private readonly IActorRef _writer;

		/// <summary>
		/// Actor internal status
		/// </summary>
		private object _lastMessageReceived;

		public CommandHandlerActor(IActorRef writer)
		{
			_writer = writer;

			InnerConfigureReceive();

			Receive<EscalateExceptionCommand>(this.Handle);
			Receive<RestartExceptionCommand>(this.Handle);
			Receive<ResumeExceptionCommand>(this.Handle);
			Receive<StopExceptionCommand>(this.Handle);
			Receive<DumpStatusCommand>(this.Handle);
			ReceiveAny(this.Handle);
		}

		/// <summary>
		/// Nasty workaround to avoid calling a virtual method in a constructor.
		/// https://blogs.msdn.microsoft.com/ericlippert/2008/02/18/why-do-initializers-run-in-the-opposite-order-as-constructors-part-two/
		/// https://msdn.microsoft.com/en-us/library/ms182331.aspx
		/// </summary>
		private void InnerConfigureReceive()
		{
			ConfigureReceive();
		}

		protected virtual void ConfigureReceive()
		{
		}

		private bool Handle(EscalateExceptionCommand c)
		{
			throw new EscalateException();
		}

		private bool Handle(RestartExceptionCommand c)
		{
			throw new RestartException();
		}

		private bool Handle(ResumeExceptionCommand c)
		{
			throw new ResumeException();
		}

		private bool Handle(StopExceptionCommand c)
		{
			throw new StopException();
		}

		private bool Handle(DumpStatusCommand c)
		{
			ColoredConsole.WriteLine($"{LogActorName()}internal status: {_lastMessageReceived}");
			return true;
		}

		private void Handle(object msg)
		{
			_lastMessageReceived = msg;
			_writer.Tell(msg);
		}
	}
}

using Frontend.Shared;

namespace Frontend.AkkaApp.Ui.Console
{
	/// <summary>
	/// An actor that displays the user input
	/// </summary>
	internal class ConsoleWriterActor : UntypedActorWithLog
	{
		protected override void OnReceive(object message)
		{
			ColoredConsole.WriteLine(message.ToString());
		}
	}
}

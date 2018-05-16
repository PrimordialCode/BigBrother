namespace Frontend.net45
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

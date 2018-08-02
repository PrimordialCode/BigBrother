using Akka.Actor;

namespace Frontend.net45
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
        private readonly IActorRef _writer;

        private const string QuitCommand = "quit";
        
        public ConsoleReaderActor(
            IActorRef consoleUi,
            IActorRef writer)
        {
            _consoleUi = consoleUi;
            _writer = writer;
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
                default:
                    _writer.Tell(text);
                    break;
            }
            // send a message to outself stating we are ready to read the next command
            Self.Tell("readnext");

            // we have no unhandled message here, every message will activare the read cycle again.
        }
    }
}

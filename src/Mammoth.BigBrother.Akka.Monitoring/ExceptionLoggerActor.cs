using Akka.Actor;
using Akka.Event;
using Mammoth.BigBrother.Monitoring;

namespace Mammoth.BigBrother.Akka.Monitoring
{
    /// <summary>
    /// An actor used to track errors and exceptions (also works for ReceiveAsync calls
    /// because every error will be intercepted and wrapped in an Error message).
    /// It must be configured in the Hocon file.
    /// </summary>
    public class ExceptionLoggerActor : ReceiveActor
    {
        private const string UserMarker = "user/";

        public ExceptionLoggerActor()
        {
            Receive<Error>(msg =>
            {
                // LogSource akka://AkkaAppActorSystem/user/ConsoleUi/CommandHandler/room1
                // look if it's a user created actor
                var friendlyNameIdx = msg.LogSource.IndexOf(UserMarker);
                if (friendlyNameIdx >= 0)
                {
                    var friendlyName = msg.LogSource.Substring(friendlyNameIdx);
                    ActorMonitoring.TrackException(friendlyName, msg.Cause, msg.Message);
                }
            });
            Receive<InitializeLogger>(mgs => Sender.Tell(new LoggerInitialized()));
        }
    }
}

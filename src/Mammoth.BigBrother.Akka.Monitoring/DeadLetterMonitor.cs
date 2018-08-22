using Akka.Actor;
using Akka.Event;
using Mammoth.BigBrother.Monitoring;

namespace Mammoth.BigBrother.Akka.Monitoring
{
    // todo: consider to unify this actor with the logging actor (and subscribe to the streams internally)
    // todo: also add monitoring for this actor ?

    public class DeadLetterMonitor : ReceiveActor
    {
        public DeadLetterMonitor()
        {
            Receive<DeadLetter>(msg =>
            {
                var sender = msg.Sender.GetFriendlyName();
                var recipient = msg.Recipient.GetFriendlyName();
                ActorMonitoring.TrackDeadLetter(sender, recipient, msg.Message);
            });
        }
    }
}

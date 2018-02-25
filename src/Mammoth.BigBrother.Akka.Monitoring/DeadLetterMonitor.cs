using Akka.Actor;
using Akka.Event;
using Mammoth.BigBrother.Monitoring;

namespace Mammoth.BigBrother.Akka.Monitoring
{
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

using Akka.Actor;
using Mammoth.BigBrother.Monitoring;
using System;

namespace Mammoth.BigBrother.Akka.Monitoring
{
    public abstract class ReceiveActorWithMonitoring : ReceiveActor
    {
        private readonly string _friendlyName;

        protected ReceiveActorWithMonitoring()
        {
            _friendlyName = this.Self.GetFriendlyName();
            ActorMonitoring.TrackActorCreated(_friendlyName, Context.Props.Type, Context.Parent.GetFriendlyName());
        }

        protected override void PreStart()
        {
            base.PreStart();
            ActorMonitoring.TrackActorStarted(_friendlyName);
        }

        protected override void PostStop()
        {
            base.PostStop();
            ActorMonitoring.TrackActorStopped(_friendlyName);
        }

        // specific to Akka.net, we do not have a general counter for this event
        /*
        protected override void PreRestart(Exception reason, object message)
        {
            base.PreRestart(reason, message);
        }
        */

        protected override void PostRestart(Exception reason)
        {
            base.PostRestart(reason);
            ActorMonitoring.TrackActorRestarted(_friendlyName, reason);
        }

        // Not needed anymore, we use the custom logging Actor for tracking exceptions
        /*
        protected override bool AroundReceive(Receive receive, object message)
        {
            try
            {
                return base.AroundReceive(receive, message);
            }
            catch (Exception ex)
            {
                ActorMonitoring.TrackException(_friendlyName, ex, message);
                throw;
            }
        }
        */

        protected override bool AroundReceive(Receive receive, object message)
        {
            ActorMonitoring.TrackReceivedMessage(_friendlyName, message);

            return base.AroundReceive(receive, message);
        }

        protected void TrackReceivedMessage(object message)
        {
            ActorMonitoring.TrackReceivedMessage(_friendlyName, message);
        }
    }
}

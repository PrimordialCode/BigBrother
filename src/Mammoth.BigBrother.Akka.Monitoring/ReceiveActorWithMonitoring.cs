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
            ActorMonitoring.TrackActorCreated(_friendlyName, Context.Props.Type.Name, Context.Parent.GetFriendlyName());
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

        //protected override void PreRestart(Exception reason, object message)
        //{
        //    base.PreRestart(reason, message);
        //}

        protected override void PostRestart(Exception reason)
        {
            base.PostRestart(reason);
            ActorMonitoring.TrackActorRestarted(_friendlyName, reason);
        }

        // Not needed anymore, we use the custom logging Actor for tracing exceptions
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
    }
}

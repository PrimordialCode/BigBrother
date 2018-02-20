using Akka.Actor;
using Mammoth.BigBrother.Monitoring;
using Mammoth.BigBrother.Monitoring.Metrics;
using System;

namespace Mammoth.BigBrother.Akka.Monitoring
{
    public abstract class ReceiveActorWithMonitoring : ReceiveActor
    {
        private readonly string _friendlyName;
        private readonly ActorIdentityInfo _monitoringIdentity;

        protected ReceiveActorWithMonitoring()
        {
            _friendlyName = this.Self.GetFriendlyName();

            _monitoringIdentity = new ActorIdentityInfo
            {
                Name = _friendlyName,
                Type = Context.Props.Type.Name,
                Parent = Context.Parent.Path.Name
            };

            ActorMonitoring.TrackActorCreated(_friendlyName);
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

        protected override void PreRestart(Exception reason, object message)
        {
            base.PreRestart(reason, message);
            // ActorMonitoring.TrackException(_friendlyName, reason, message);
        }

        protected override void PostRestart(Exception reason)
        {
            base.PostRestart(reason);
            ActorMonitoring.TrackActorRestarted(_friendlyName, reason);
        }

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
    }
}

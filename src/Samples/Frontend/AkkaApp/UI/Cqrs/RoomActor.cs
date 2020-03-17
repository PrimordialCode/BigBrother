using Akka.Actor;
using Frontend.Shared.Cqrs.Commands;
using System;
using System.Threading.Tasks;

namespace Frontend.AkkaApp.UI.Cqrs
{
    internal class RoomActor : ReceiveActorWithLog
    {
        private readonly RoomCommandHandler _commandHandler;
        private readonly ActorSelection _projectionEngine;

        public RoomActor(RoomCommandHandler commandHandler)
        {
            _projectionEngine = Context.System.ActorSelection("/user/ConsoleUi/projectionEngine");
            _commandHandler = commandHandler;
            // kill the actor after inactivity
            Receive<ReceiveTimeout>(timeout => Self.Tell(PoisonPill.Instance));
            ReceiveAsync<EnableBookingCommand>(Handle);
            ReceiveAsync<DisableBookingCommand>(Handle);
            ReceiveAsync<BookRoomCommand>(Handle);
        }

        private async Task<bool> Handle(EnableBookingCommand cmd)
        {
            await _commandHandler.Handle(cmd).ConfigureAwait(false);
            SignalProjections();
            return true;
        }

        private async Task<bool> Handle(DisableBookingCommand cmd)
        {
            await _commandHandler.Handle(cmd).ConfigureAwait(false);
            SignalProjections();
            return true;
        }

        private async Task<bool> Handle(BookRoomCommand cmd)
        {
            await _commandHandler.Handle(cmd).ConfigureAwait(false);
            SignalProjections();
            return true;
        }

        protected override void PreStart()
        {
            base.PreStart();
            Context.SetReceiveTimeout(TimeSpan.FromSeconds(120));
        }

        private void SignalProjections()
        {
            _projectionEngine.Tell(PollImmediately.Instance);
        }
    }
}

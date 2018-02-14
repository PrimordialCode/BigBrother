extern alias akka;

using akka::Akka.Actor;
using Frontend.Shared.Cqrs.Commands;
using Frontend.Shared.UI.Messages;
using System;
using System.Threading.Tasks;

namespace Frontend.AkkaApp.UI.Cqrs
{
    internal class RoomActor : ReceiveActorWithLog
    {
        private readonly RoomCommandHandler _commandHandler;

        public RoomActor(RoomCommandHandler commandHandler)
        {
            _commandHandler = commandHandler;
#pragma warning disable RCS1163 // Unused parameter.
            Receive<ReceiveTimeout>(timeout => Self.Tell(PoisonPill.Instance));
#pragma warning restore RCS1163 // Unused parameter.
            //Receive<RoutedCommandEnvelope>(this.Handle);
            ReceiveAsync<EnableBookingCommand>(Handle);
            ReceiveAsync<DisableBookingCommand>(Handle);
            ReceiveAsync<BookRoomCommand>(Handle);
        }

        private async Task<bool> Handle(EnableBookingCommand cmd)
        {
            await _commandHandler.Handle(cmd).ConfigureAwait(false);
            return true;
        }

        private async Task<bool> Handle(DisableBookingCommand cmd)
        {
            await _commandHandler.Handle(cmd).ConfigureAwait(false);
            return true;
        }

        private async Task<bool> Handle(BookRoomCommand cmd)
        {
            await _commandHandler.Handle(cmd).ConfigureAwait(false);
            return true;
        }

        //private bool Handle(RoutedCommandEnvelope obj)
        //{
        //    switch (obj.Command)
        //    {
        //        case EnableBookingCommand cmd:
        //            return Handle(cmd);
        //        case DisableBookingCommand cmd:
        //            return Handle(cmd);
        //        case BookRoomCommand cmd:
        //            return Handle(cmd);
        //    }
        //    return false;
        //}

        protected override void PreStart()
        {
            base.PreStart();
            Context.SetReceiveTimeout(TimeSpan.FromSeconds(120));
        }
    }
}

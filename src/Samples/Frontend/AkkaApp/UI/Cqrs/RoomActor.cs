extern alias akka;

using akka::Akka.Actor;
using Frontend.Shared.Cqrs.Commands;
using Frontend.Shared.UI.Messages;
using System;

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
            Receive<EnableBookingCommand>(Handle);
            Receive<DisableBookingCommand>(Handle);
            Receive<BookRoomCommand>(Handle);
        }

        private bool Handle(EnableBookingCommand cmd)
        {
            _commandHandler.Handle(cmd);
            return true;
        }

        private bool Handle(DisableBookingCommand cmd)
        {
            _commandHandler.Handle(cmd);
            return true;
        }

        private bool Handle(BookRoomCommand cmd)
        {
            _commandHandler.Handle(cmd);
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

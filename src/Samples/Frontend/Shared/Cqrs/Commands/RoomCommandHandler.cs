using Frontend.Shared.Cqrs.Domain.Room;
using NStore.Domain;
using System.Threading.Tasks;

namespace Frontend.Shared.Cqrs.Commands
{
    public class RoomCommandHandler : CommandHandler<Room>
    {
        public RoomCommandHandler(IRepository repository) : base(repository, true)
        {
        }

        public Task Handle(EnableBookingCommand cmd)
        {
            return Handle(cmd, aggregate => aggregate.EnableBookings());
        }

        public Task Handle(DisableBookingCommand cmd)
        {
            return Handle(cmd, aggregate => aggregate.DisableBookings());
        }

        public Task Handle(BookRoomCommand cmd)
        {
            return Handle(cmd, aggregate => aggregate.AddBooking(cmd.DateRange));
        }
    }
}

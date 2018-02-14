using Frontend.Shared.Cqrs.Domain.Room;

namespace Frontend.Shared.Cqrs.Commands
{
    public class EnableBookingCommand : CqrsCommand
    {
        public EnableBookingCommand(string aggregateId) : base(aggregateId)
        {
        }
    }

    public class DisableBookingCommand : CqrsCommand
    {
        public DisableBookingCommand(string aggregateId) : base(aggregateId)
        {
        }
    }

    public class BookRoomCommand : CqrsCommand
    {
        public BookRoomCommand(string aggregateId, DateRange dateRange) : base(aggregateId)
        {
            DateRange = dateRange;
        }

        public DateRange DateRange { get; private set; }
    }
}

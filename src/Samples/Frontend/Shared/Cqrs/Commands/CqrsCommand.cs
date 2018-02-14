using System;

namespace Frontend.Shared.Cqrs.Commands
{
    public abstract class CqrsCommand
    {
        public string Id { get; private set; } = Guid.NewGuid().ToString();

        public string AggregateId { get; set; }

        protected CqrsCommand(string aggregateId)
        {
            AggregateId = aggregateId;
        }
    }
}

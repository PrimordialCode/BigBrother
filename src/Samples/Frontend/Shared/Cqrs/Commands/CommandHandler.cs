using NStore.Domain;
using System;
using System.Threading.Tasks;

namespace Frontend.Shared.Cqrs.Commands
{
    public abstract class CommandHandler<TAggregate> where TAggregate : class, IAggregate
    {
        private readonly IRepository _repository;
        private readonly bool _cacheAggregate;
        private TAggregate _cachedAggregate = null;

        protected CommandHandler(IRepository repository, bool cacheAggregate)
        {
            _repository = repository;
            _cacheAggregate = cacheAggregate;
        }

        protected async Task Handle<TCommand>(TCommand cmd, Action<TAggregate> action) where TCommand : CqrsCommand
        {
            TAggregate aggregate;
            if (_cacheAggregate && _cachedAggregate != null)
            {
                aggregate = _cachedAggregate;
            }
            else
            {
                aggregate = await _repository.GetByIdAsync<TAggregate>(cmd.AggregateId).ConfigureAwait(false);
                _cachedAggregate = _cacheAggregate ? aggregate : null;
            }

            action(aggregate);

            await _repository.SaveAsync(aggregate, cmd.Id).ConfigureAwait(false);
        }
    }
}

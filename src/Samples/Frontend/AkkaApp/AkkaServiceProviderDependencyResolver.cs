extern alias akka;

using akka::Akka.Actor;
using Akka.DI.Core;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Concurrent;

namespace Frontend.AkkaApp
{
    // todo: improve the wrapper providing scope support! actually it works well for transient and singleton objects only

    internal class AkkaServiceProviderDependencyResolver : IDependencyResolver
    {
        private readonly ServiceProvider _container;
        private readonly ActorSystem _actorSystem;
        private readonly ConcurrentDictionary<string, Type> _typeCache = new ConcurrentDictionary<string, Type>(StringComparer.OrdinalIgnoreCase);

        public AkkaServiceProviderDependencyResolver(
            ServiceProvider serviceProvider,
            ActorSystem actorSystem)
        {
            _container = serviceProvider ?? throw new ArgumentNullException(nameof(serviceProvider));
            _actorSystem = actorSystem;

            _actorSystem.AddDependencyResolver(this);
        }

        public Props Create<TActor>() where TActor : ActorBase
        {
            return Create(typeof(TActor));
        }

        public Props Create(Type actorType)
        {
            return _actorSystem.GetExtension<DIExt>().Props(actorType);
        }

        public Func<ActorBase> CreateActorFactory(Type actorType)
        {
            return () => (ActorBase)_container.GetRequiredService(actorType);
        }

        public Type GetType(string actorName)
        {
            return _typeCache.GetOrAdd(actorName, actorName.GetTypeValue());
        }

        public void Release(ActorBase actor)
        {
            // Method intentionally left empty.
        }
    }
}

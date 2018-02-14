using Frontend.AkkaApp;
using Frontend.Shared.Cqrs.Commands;
using Frontend.Shared.Cqrs.Projections;
using Microsoft.Extensions.DependencyInjection;
using NStore.Core.InMemory;
using NStore.Core.Persistence;
using NStore.Core.Streams;
using NStore.Domain;

namespace Frontend
{
    internal class Application
    {
        private AkkaApplication _akkaApp;

        public void Init(ApplicationSettings settings)
        {
            var serviceCollection = new ServiceCollection();
            // initialize services (anything that is not actor framework specific)
            // like DDD/CQRS/ES stuff
            // remember that Actors should be transient and anything inside them must be transient
            // or singleton, any other lifecycle will cause troubles!
            var network = new ReliableNetworkSimulator(2, 10);
            serviceCollection.AddSingleton<INetworkSimulator>(network);
            serviceCollection.AddSingleton<IPersistence>(new InMemoryPersistence(new InMemoryPersistenceOptions
            {
                NetworkSimulator = network
            }));
            serviceCollection.AddSingleton<IStreamsFactory, StreamsFactory>();
            serviceCollection.AddSingleton<IAggregateFactory, DefaultAggregateFactory>();
            serviceCollection.AddTransient<IRepository, Repository>(); // Do NOT use singleton for this one, it has bugs with _trackingAggregate
            serviceCollection.AddTransient<RoomCommandHandler>();
            serviceCollection.AddTransient<ProjectionEngine>();

            // initialize the actor System
            switch (settings.ActorFramework)
            {
                case ActorFramework.Akka:
                    _akkaApp = new AkkaApplication();
                    _akkaApp.Initialize("AkkaAppActorSystem", serviceCollection);
                    _akkaApp.Start();
                    break;
                case ActorFramework.ProtoActor:
                    break;
            }
        }

        public void WaitForShutdown()
        {
            _akkaApp?.WaitForShutdown();
        }
    }
}

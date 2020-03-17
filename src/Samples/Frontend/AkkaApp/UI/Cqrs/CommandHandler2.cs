using Akka.Actor;
using Frontend.AkkaApp.UI.Console;
using System;

namespace Frontend.AkkaApp.Ui.Cqrs
{
    /// <summary>
    /// Executes the commands
    ///
    /// a simple command handler that shows how we can route the commands to different actors
    /// 
    ///
    /// it should also have some sort of timeout to stop itself when not needed anymore
    /// </summary>
    internal class CommandHandler2 : CommandHandlerActor
    {
        public CommandHandler2(IActorRef writer) : base(writer)
        {
        }

        protected override void ConfigureReceive()
        {
            Receive<ReceiveTimeout>(timeout => Self.Tell(PoisonPill.Instance));
        }

        protected override void PreStart()
        {
            base.PreStart();
            Context.SetReceiveTimeout(TimeSpan.FromSeconds(30));
        }
    }
}

using Akka.Actor;
using Akka.DependencyInjection;
using Frontend.AkkaApp.UI.Cqrs;
using Frontend.Shared;
using Frontend.Shared.Exceptions;
using Frontend.Shared.UI.Messages;
using System;

namespace Frontend.AkkaApp.Ui.Cqrs {
    /// <summary>
    /// We implement the routing by hand
    /// 
    /// follows the 'entity per child' pattern
    /// - it forwards the messages to the appropriate router
    /// - creates the new command handlers (given the content of the message)
    /// - forward the message to the correct handler
    /// - spawned actors need a way to stop themselves when not need anymore (maybe a timeout)
    /// 
    /// downside:
    /// - we pay the price of having a mailbox for this Actor (it should be a router)
    /// </summary>
    internal class CommandHandlerCoordinatorActor : ReceiveActorWithLog
    {
        private readonly IActorRef _writer;

        public CommandHandlerCoordinatorActor(IActorRef writer)
        {
            this._writer = writer;

            Receive<RoutedCommandEnvelope>(this.Handle);
        }

        private bool Handle(RoutedCommandEnvelope command)
        {
            // create a command handing actor instance if needed
            // forward the command to them
            var childActorName = GenerateActorName(command);
            var child = Context.Child(childActorName);
            if (child == ActorRefs.Nobody)
            {
                switch (command.RouteTo.Type)
                {
                    case ActorTypes.CommandHandler1:
                        child = Context.ActorOf(Props.Create<CommandHandler1>(_writer), childActorName);
                        break;
                    case ActorTypes.CommandHandler2:
                        child = Context.ActorOf(Props.Create<CommandHandler2>(_writer), childActorName);
                        break;
                    case ActorTypes.Room:
                        var props = DependencyResolver.For(Context.System).Props<RoomActor>();
                        child = Context.ActorOf(props, childActorName);
                        break;

                }
            }
            // check for stop, poisonpill, kill, gracefulstop commands..
            // It's responsibility of this Actor manage its children
            switch (command.Command)
            {
                case StopCommand cmd:
                    Context.Stop(child);
                    return true;
                case PoisonPill cmd:
                    child.Tell(PoisonPill.Instance);
                    return true;
                case KillCommand cmd:
                    child.Tell(Kill.Instance);
                    return true;
                case GracefulStopCommand cmd:
                    var gracefulStop = child.GracefulStop(TimeSpan.FromSeconds(5));
                    gracefulStop.Wait();
                    if (gracefulStop.Result)
                    {
                        ColoredConsole.WriteLineGreen("GracefulStop completed");
                    }
                    else
                    {
                        ColoredConsole.WriteLineYellow("GracefulStop failed");
                    }
                    return true;
            }

            // child.Tell(command.Command);
            child.Forward(command.Command);
            return true;
        }

        private static string GenerateActorName(RoutedCommandEnvelope command)
        {
            return command.RouteTo.Type + command.RouteTo.Id;
        }

        protected override SupervisorStrategy SupervisorStrategy()
        {
            // AllForOneStrategy
            // OneForOneStrategy
            return new OneForOneStrategy(
                3,
                TimeSpan.FromMinutes(2),
                ex =>
                {
                    if (ex is EscalateException)
                    {
                        return Directive.Escalate;
                    }
                    if (ex is RestartException)
                    {
                        return Directive.Restart;
                    }
                    if (ex is ResumeException)
                    {
                        return Directive.Resume;
                    }
                    if (ex is StopException)
                    {
                        return Directive.Stop;
                    }
                    // delegate to the default supervision startegy
                    return Akka.Actor.SupervisorStrategy.DefaultStrategy.Decider.Decide(ex);
                });
        }
    }
}

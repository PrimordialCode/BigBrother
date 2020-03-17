using Akka.Actor;
using Akka.Routing;
using Frontend.Shared.Exceptions;
using Frontend.Shared.UI.Messages;
using System;

namespace Frontend.AkkaApp.Ui.Cqrs
{
	/// <summary>
	/// A worker class: all the messages for a specific entity get routed
	/// to the same instance of this worker class
	/// it internally knows what to do with the messages
	/// 
	/// Warning: using a Restart directive from the Supervision Policy will force the router and all the routee to restart.
	/// 
	/// How does stopping an Actor work with a router:
	/// - whatever we do to the router will be reflected on the children.
	/// </summary>
	internal class CommandHandlerWorkerActor : ReceiveActorWithLog
	{
		private readonly IActorRef _writer;

		public CommandHandlerWorkerActor(IActorRef writer)
		{
			Receive<RoutedCommandEnvelope>(this.Handle);
			_writer = writer;
		}

		private bool Handle(RoutedCommandEnvelope obj)
		{
			// todo: load the proper command handler(s) and do the job
			var message = obj.Command;
			if (message is EscalateExceptionCommand)
			{
				throw new EscalateException();
			}
			else if (message is RestartExceptionCommand)
			{
				throw new RestartException();
			}
			else if (message is ResumeExceptionCommand)
			{
				throw new ResumeException();
			}
			else if (message is StopExceptionCommand)
			{
				throw new StopException();
			}
			else
			{
				_writer.Tell($"[{Self.Path}] {message}");
			}

			return true;
		}

		private static readonly ConsistentHashMapping HashMapping = msg =>
		{
			if (msg is RoutedCommandEnvelope m)
			{
				return m.RouteTo.Type + m.RouteTo.Id;
			}
			return null;
		};
		// The supervision strategy of a pool router is 'Escalate'
		public readonly static Func<IActorRef, Props> RouterProps = (IActorRef writer) => Props.Create(() => new CommandHandlerWorkerActor(writer))
			.WithRouter(new ConsistentHashingPool(3, HashMapping)
				//.WithVirtualNodesFactor(1)
				.WithResizer(new DefaultResizer(3, 10))
				.WithSupervisorStrategy(
					// AllForOneStrategy
					// OneForOneStrategy
					new OneForOneStrategy(
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
						})));
	}
}

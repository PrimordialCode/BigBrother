namespace Frontend.Shared.UI.Messages
{
	/// <summary>
	/// CQRS demo: Stops the Actor,
	/// other ways of stopping an actor:
	/// - Kill
	/// - PoisonPill
	/// - GracefulStop (stop within a timeout)
	/// see: https://petabridge.com/blog/how-to-stop-an-actor-akkadotnet/
	/// </summary>
	public class StopCommand
	{
	}
}

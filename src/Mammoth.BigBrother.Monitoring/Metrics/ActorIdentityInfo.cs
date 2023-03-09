namespace Mammoth.BigBrother.Monitoring.Metrics
{
    /// <summary>
    /// Identifies an actor, provide extended information
    /// </summary>
    public class ActorIdentityInfo
    {
        /// <summary>
        /// The actor reference path, this can also be used to display the 'tree hierarchy' of actors
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// The Typer of the Actor
        /// </summary>
        public string Type { get; set; }

        /// <summary>
        /// Name/Path of the parent
        /// </summary>
        public string Parent { get; set; }

		public ActorIdentityInfo(string name, string type, string parent)
		{
			Name = name;
			Type = type;
			Parent = parent;
		}
	}
}

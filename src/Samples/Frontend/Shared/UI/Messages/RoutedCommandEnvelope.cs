namespace Frontend.Shared.UI.Messages
{
    /// <summary>
    /// A sample class that will encapsulate the command providing context information.
    /// This can be used to implement a raw CQRS pattern.
    /// </summary>
    public class RoutedCommandEnvelope
    {
        /// <summary>
        /// It will be used to select the destination of the message
        /// </summary>
        public RoutedCommandInfo RouteTo { get; }

        /// <summary>
        /// The actual command that will be sent to the destination
        /// </summary>
        public object Command { get; }

        public RoutedCommandEnvelope(string type, string id, object command)
        {
            RouteTo = new RoutedCommandInfo(type, id);
            Command = command;
        }
    }

    /// <summary>
    /// In this sample we do not have conventional mapping between Commands and their handlers
    /// We need to specify to what kind of actor the command will be directed to
    /// </summary>
    public class RoutedCommandInfo
    {
        /// <summary>
        /// todo: extend this to enable conventions
        /// identifies internal service or commandhandler to which route the command
        /// </summary>
        public string Type { get; }

        /// <summary>
        /// The Id will contribute to identify the
        /// instance of the service / actor / command handler to which route the command.
        /// If it doesn't exists it should be created in some way.
        /// </summary>
        public string Id { get; }

        public RoutedCommandInfo(string type, string id)
        {
            Type = type;
            Id = id;
        }
    }
}

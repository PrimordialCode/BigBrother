namespace Frontend.AkkaApp.UI.Support.Messages
{
	public class DumpActors
	{
		public string SelectionPath { get; }

		public DumpActors(string selectionPath)
		{
			SelectionPath = selectionPath;
		}
	}
}

using System;

namespace Frontend.Shared.Exceptions
{
	[Serializable]
	public class StopException : Exception
	{
		public StopException() { }
		public StopException(string message) : base(message) { }
		public StopException(string message, Exception inner) : base(message, inner) { }
	}
}

using System;

namespace Frontend.Shared.Exceptions
{
	[System.Serializable]
	public class EscalateException : Exception
	{
		public EscalateException() { }
		public EscalateException(string message) : base(message) { }
		public EscalateException(string message, Exception inner) : base(message, inner) { }
	}
}

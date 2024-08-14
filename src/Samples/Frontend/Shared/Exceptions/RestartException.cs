﻿using System;

namespace Frontend.Shared.Exceptions
{
	[Serializable]
	public class RestartException : Exception
	{
		public RestartException() { }
		public RestartException(string message) : base(message) { }
		public RestartException(string message, Exception inner) : base(message, inner) { }
	}
}

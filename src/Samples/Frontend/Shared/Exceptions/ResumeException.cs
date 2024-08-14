﻿using System;

namespace Frontend.Shared.Exceptions
{
	[Serializable]
	public class ResumeException : Exception
	{
		public ResumeException() { }
		public ResumeException(string message) : base(message) { }
		public ResumeException(string message, Exception inner) : base(message, inner) { }
	}
}

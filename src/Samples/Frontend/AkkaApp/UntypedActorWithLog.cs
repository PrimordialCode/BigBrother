extern alias akka;

using System;
using Frontend.Shared;
using Mammoth.BigBrother.Akka.Monitoring;

namespace Frontend.AkkaApp
{
    internal abstract class UntypedActorWithLog : UntypedActorWithMonitoring
    {
        public static bool ShowLog = true;

        protected string LogActorName()
        {
            return $"[{GetType().Name} - {Context.Self.Path}] ";
        }

        protected UntypedActorWithLog()
        {
            if (ShowLog)
            {
                ColoredConsole.WriteLineMagenta(LogActorName() + "Constructor");
            }
        }

        protected override void PreStart()
        {
            if (ShowLog)
            {
                ColoredConsole.WriteLineMagenta(LogActorName() + "PreStart");
            }
            base.PreStart();
        }

        protected override void PostStop()
        {
            if (ShowLog)
            {
                ColoredConsole.WriteLineMagenta(LogActorName() + "PostStop");
            }
            base.PostStop();
        }

        protected override void PreRestart(Exception reason, object message)
        {
            if (ShowLog)
            {
                ColoredConsole.WriteLineMagenta(LogActorName() + $"PreRestart, reason: {reason.Message}, message: {message}");
            }
            base.PreRestart(reason, message);
        }

        protected override void PostRestart(Exception reason)
        {
            if (ShowLog)
            {
                ColoredConsole.WriteLineMagenta(LogActorName() + $"PostRestart, reason: {reason.Message}");
            }
            base.PostRestart(reason);
        }
    }
}

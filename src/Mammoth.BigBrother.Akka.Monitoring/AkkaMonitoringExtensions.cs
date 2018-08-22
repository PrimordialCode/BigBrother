using Akka.Actor;

namespace Mammoth.BigBrother.Akka.Monitoring
{
    public static class AkkaMonitoringExtensions
    {
        /// <summary>
        /// the full path of the actor represented as a string
        /// </summary>
        /// <param name="actorRef"></param>
        /// <returns></returns>
        public static string GetFriendlyName(this IActorRef actorRef)
        {
            return string.Join("/", actorRef.Path.Elements);
        }

        public static string GetFriendlyName(this IActorContext context)
        {
            return GetFriendlyName(context.Self);
        }
    }
}

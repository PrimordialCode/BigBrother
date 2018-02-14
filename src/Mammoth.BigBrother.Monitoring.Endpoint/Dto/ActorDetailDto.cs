namespace Mammoth.BigBrother.Monitoring.Endpoint.Dto
{
    public class ActorDetailDto
    {
        public ActorStatus Status { get; set; }
    }

    public enum ActorStatus
    {
        Started = 0,
        Stopped = 1
    }
}

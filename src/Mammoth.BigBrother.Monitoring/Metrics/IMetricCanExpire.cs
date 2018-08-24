namespace Mammoth.BigBrother.Monitoring.Metrics
{
    public interface IMetricCanExpire
    {
        /// <summary>
        /// true if the current metric can expire
        /// </summary>
        bool Expire { get; set; }
    }
}

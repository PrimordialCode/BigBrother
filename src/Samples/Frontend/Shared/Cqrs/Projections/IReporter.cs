namespace Frontend.Shared.Cqrs.Projections
{
    public interface IReporter
    {
        void Report(string message);
    }
}
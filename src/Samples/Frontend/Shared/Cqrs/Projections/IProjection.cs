using NStore.Domain;
using System;
using System.Reflection;
using System.Threading.Tasks;

namespace Frontend.Shared.Cqrs.Projections
{
    public interface IProjection
    {
        Task Project(Changeset changes);
    }
}

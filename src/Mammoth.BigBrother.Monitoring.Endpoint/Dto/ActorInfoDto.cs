using System.Collections.Generic;

namespace Mammoth.BigBrother.Monitoring.Endpoint.Dto
{
    /// <summary>
    /// provides specific actor informations
    /// </summary>
    public class ActorInfoDto
    {
        public string Name { get; }

        public string Path { get; }

        public List<ActorInfoDto> Children { get; set; } = new List<ActorInfoDto>();

        public ActorInfoDto(string name, string path)
        {
            Name = name;
            Path = path;
        }
    }
}

using System;

namespace Frontend.Shared.Cqrs.Projections
{
    public class ColoredConsoleReporter : IReporter
    {
        private readonly string _name;
        private readonly ConsoleColor _color;

        public ColoredConsoleReporter(string name, ConsoleColor color)
        {
            _name = name;
            _color = color;
        }

        public void Report(string message)
        {
            ColoredConsole.WriteLineColored(_color, $"{_name.PadRight(20)}: {message}");
        }
    }
}

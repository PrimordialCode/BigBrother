using System;

namespace Frontend.net45
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.Title = "NET461 - Starting Application";
            ColoredConsole.WriteLine(Console.Title);
            var _akkaApp = new AkkaApplication();
            _akkaApp.Initialize("AkkaAppActorSystem");
            _akkaApp.Start();
            _akkaApp.WaitForShutdown();
            ColoredConsole.WriteLine("Application Terminated, press 'enter' to close.");
            Console.ReadLine();
        }
    }
}

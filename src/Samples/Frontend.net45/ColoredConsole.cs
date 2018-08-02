﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Frontend.net45
{
    public static class ColoredConsole
    {
        private static object Lock = new object();

        public static void WriteLineColored(ConsoleColor color, string text)
        {
            lock (Lock)
            {
                // var originalColor = Console.ForegroundColor;
                Console.ForegroundColor = color;
                Console.WriteLine(text);
                // Console.ForegroundColor = originalColor;
                Console.ResetColor();
            }
        }

        public static void WriteLine(string text)
        {
            WriteLineColored(ConsoleColor.DarkGray, text);
        }

        public static void WriteLineGreen(string text)
        {
            WriteLineColored(ConsoleColor.Green, text);
        }

        public static void WriteLineYellow(string text)
        {
            WriteLineColored(ConsoleColor.Yellow, text);
        }

        public static void WriteLineRed(string text)
        {
            WriteLineColored(ConsoleColor.Red, text);
        }

        public static void WriteLineMagenta(string text)
        {
            WriteLineColored(ConsoleColor.Magenta, text);
        }
    }
}

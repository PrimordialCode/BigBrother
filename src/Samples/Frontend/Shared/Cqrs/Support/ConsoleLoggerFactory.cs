﻿using Microsoft.Extensions.Logging;
using NStore.Core.Logging;
using NStore.Core.Persistence;
using System;

namespace Frontend.Shared.Cqrs.Support
{
    public class ConsoleLoggerFactory : INStoreLoggerFactory
    {
        public INStoreLogger CreateLogger(string categoryName)
        {
            if (categoryName == typeof(PollingClient).FullName)
                return NStoreNullLogger.Instance;

            return new ConsoleLoggerWrapper(
                LoggerFactory.Create((configure) => configure.AddConsole()).CreateLogger(categoryName)
            );
        }
    }

    public class ConsoleLoggerWrapper : INStoreLogger
    {
        private readonly ILogger _logger;

        public ConsoleLoggerWrapper(ILogger logger)
        {
            _logger = logger;
        }

        public bool IsDebugEnabled => _logger.IsEnabled(LogLevel.Debug);

        public void LogDebug(string message, params object[] args)
        {
            _logger.LogDebug(message, args);
        }

        public bool IsWarningEnabled => _logger.IsEnabled(LogLevel.Warning);

        public void LogWarning(string message, params object[] args)
        {
            _logger.LogWarning(message, args);
        }

        public bool IsInformationEnabled => _logger.IsEnabled(LogLevel.Information);

        public void LogInformation(string message, params object[] args)
        {
            _logger.LogInformation(message, args);

        }

        public void LogError(string message, params object[] args)
        {
            _logger.LogError(message, args);

        }

        public IDisposable BeginScope<TState>(TState state)
        {
            return _logger.BeginScope(state);
        }
    }
}

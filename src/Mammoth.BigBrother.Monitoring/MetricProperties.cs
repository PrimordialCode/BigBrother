﻿using System;
using System.Collections.Generic;
using System.Text.Json;

namespace Mammoth.BigBrother.Monitoring {
    public static class MetricProperties
    {
        public const string Actor = "actor";
        public const string Type = "type";
        public const string Message = "message";
        public const string Exception = "exception";
        public const string ActorRecipient = "actor_recipient";
        public const string ActorParent = "actor_parent";

        internal static MetricPropertiesBuilder For()
        {
            return new MetricPropertiesBuilder();
        }
    }

    internal class MetricPropertiesBuilder
    {
        private readonly Dictionary<string, string> _properties = new();

        public MetricPropertiesBuilder Actor(string name)
        {
            _properties[MetricProperties.Actor] = name;
            return this;
        }

        public MetricPropertiesBuilder ActorRecipient(string name)
        {
            _properties[MetricProperties.ActorRecipient] = name;
            return this;
        }

        public MetricPropertiesBuilder ActorParent(string name)
        {
            _properties[MetricProperties.ActorParent] = name;
            return this;
        }

        public MetricPropertiesBuilder Type(Type type)
        {
            _properties[MetricProperties.Type] = type.Name;
            return this;
        }

        public MetricPropertiesBuilder Message(object message)
        {
            if (message != null)
            {
                string messageAsString;
                try
                {
                    messageAsString = JsonSerializer.Serialize(message);
                }
                catch
                {
                    messageAsString = message.ToString() ?? string.Empty;
                }
                _properties[MetricProperties.Message] = messageAsString;
            }
            return this;
        }

        public MetricPropertiesBuilder Exception(Exception exception)
        {
            if (exception != null)
            {
                _properties[MetricProperties.Exception] = exception.ToString(); // JsonConvert.SerializeObject(exception);
            }
            return this;
        }

        public IDictionary<string, string> Build()
        {
            return _properties;
        }
    }
}

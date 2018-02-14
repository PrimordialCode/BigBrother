using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Mammoth.BigBrother.Monitoring
{
    public static class MetricProperties
    {
        public const string Actor = "actor";
        public const string Type = "type";
        public const string Message = "message";
        public const string Exception = "exception";

        internal static MetricPropertiesBuilder For()
        {
            return new MetricPropertiesBuilder();
        }
    }

    internal class MetricPropertiesBuilder
    {
        private readonly Dictionary<string, string> _properties = new Dictionary<string, string>();

        public MetricPropertiesBuilder Actor(string name)
        {
            _properties[MetricProperties.Actor] = name;
            return this;
        }

        public MetricPropertiesBuilder Type(string type)
        {
            _properties[MetricProperties.Type] = type;
            return this;
        }

        public MetricPropertiesBuilder Message(object message)
        {
            if (message != null)
            {
                _properties[MetricProperties.Message] = JsonConvert.SerializeObject(message);
            }
            return this;
        }

        public MetricPropertiesBuilder Exception(Exception exception)
        {
            if (exception != null)
            {
                _properties[MetricProperties.Exception] = JsonConvert.SerializeObject(exception);
            }
            return this;
        }

        public IDictionary<string, string> Build()
        {
            return _properties;
        }
    }
}

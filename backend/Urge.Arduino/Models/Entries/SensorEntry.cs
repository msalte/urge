using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Urge.Arduino.Models
{
    public abstract class SensorEntry
    {
        public DateTime Timestamp { get; set; }
        public string Unit { get; set; }

        private const string TIMESTAMP_FORMAT = "dd.MM.yyyy HH:mm:ss";

        public SensorEntry(string timestamp, string unit)
        {
            Timestamp = DateTime.ParseExact(timestamp, TIMESTAMP_FORMAT, CultureInfo.InvariantCulture);

            Unit = unit;
        }
    }
}

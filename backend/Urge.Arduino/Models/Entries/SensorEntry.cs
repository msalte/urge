using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Urge.Arduino.Models
{
    public abstract class SensorEntry
    {
        public DateTime Timestamp { get; set; }
        public string Unit { get; set; }

        public SensorEntry(string timestamp, string unit)
        {
            if (DateTime.TryParse(timestamp, out DateTime ts))
            {
                Timestamp = ts;
            }

            Unit = unit;
        }
    }
}

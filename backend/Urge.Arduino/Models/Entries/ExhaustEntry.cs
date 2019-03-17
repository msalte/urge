using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Urge.Arduino.Models
{
    public class ExhaustEntry : SensorEntry
    {
        public ExhaustEntry(string timestamp) : base(timestamp, "C")
        {
        }

        public double Sensor1 { get; set; }
        public double Sensor2 { get; set; }
        public double Sensor3 { get; set; }
        public double Sensor4 { get; set; }
        public double Sensor5 { get; set; }
        public double Sensor6 { get; set; }
        public double Average => (Sensor1 + Sensor2 + Sensor3 + Sensor4 + Sensor5 + Sensor6) / 6;
    }
}

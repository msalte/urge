using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Urge.Arduino.Models
{
    public class MiscEntry : SensorEntry
    {
        public MiscEntry(string timestamp) : base(timestamp, "C")
        {
        }

        public double TemperatureWater { get; set; }
        public double TemperatureOil { get; set; }
        public double TemperatureBeforeIntercooler { get; set; }
        public double TemperatureAfterIntercooler { get; set; }
        public double Average => (TemperatureWater + TemperatureOil + TemperatureBeforeIntercooler + TemperatureAfterIntercooler) / 4;
    }
}

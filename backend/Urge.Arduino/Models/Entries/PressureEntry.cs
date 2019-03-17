using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Urge.Arduino.Models
{
    public class PressureEntry : SensorEntry
    {
        public PressureEntry(string timestamp) : base(timestamp, "bar")
        {
        }

        public double BeforeIntercooler { get; set; }
        public double AfterIntercooler { get; set; }
        public double OilEngine { get; set; }
        public double OilTurbo { get; set; }
        public double WaterInjection { get; set; }
        public double Manifoil { get; set; }
        public double Fuel { get; set; }
        public double Average => (BeforeIntercooler + AfterIntercooler + OilEngine + OilTurbo + WaterInjection + Manifoil + Fuel) / 7;
    }
}

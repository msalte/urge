using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Urge.Arduino.Models;

namespace Urge.Arduino.Business
{
    public static class SensorDataParser
    {
        const int INDEX_TIMESTAMP = 0;

        private static double ParseDouble(string number)
        {
            if (!double.TryParse(number, NumberStyles.AllowDecimalPoint | NumberStyles.AllowLeadingSign, CultureInfo.InvariantCulture, out double @double))
            {
                @double = -1.00;
            }

            return @double;
        }

        public static class Misc
        {
            const int LINE_LENGTH = 5;

            private static MiscEntry ParseLine(string line)
            {
                var parts = line.Split(",");

                if (parts.Length != LINE_LENGTH)
                {
                    return null;
                }

                var timestamp = parts[INDEX_TIMESTAMP];

                return new MiscEntry(timestamp)
                {
                    TemperatureWater = ParseDouble(parts[1]),
                    TemperatureOil = ParseDouble(parts[2]),
                    TemperatureBeforeIntercooler = ParseDouble(parts[3]),
                    TemperatureAfterIntercooler = ParseDouble(parts[4]),
                };
            }

            public static MiscData Parse(string[] file)
            {
                var data = new MiscData();

                foreach (var line in file)
                {
                    if (string.IsNullOrWhiteSpace(line))
                    {
                        continue;
                    }

                    var entry = ParseLine(line);

                    if (entry != null)
                    {
                        data.Entries.Add(entry);
                    }
                }

                return data;
            }
        }

        public static class Pressure
        {
            const int LINE_LENGTH = 8;

            private static PressureEntry ParseLine(string line)
            {
                var parts = line.Split(",");

                if (parts.Length != LINE_LENGTH)
                {
                    return null;
                }

                var timestamp = parts[INDEX_TIMESTAMP];

                return new PressureEntry(timestamp)
                {
                    BeforeIntercooler = ParseDouble(parts[1]),
                    AfterIntercooler = ParseDouble(parts[2]),
                    OilEngine = ParseDouble(parts[3]),
                    OilTurbo = ParseDouble(parts[4]),
                    WaterInjection = ParseDouble(parts[5]),
                    Manifoil = ParseDouble(parts[6]),
                    Fuel = ParseDouble(parts[7]),
                };
            }

            public static PressureData Parse(string[] file)
            {
                var data = new PressureData();

                foreach (var line in file)
                {
                    if (string.IsNullOrWhiteSpace(line))
                    {
                        continue;
                    }

                    var entry = ParseLine(line);

                    if (entry != null)
                    {
                        data.Entries.Add(entry);
                    }
                }

                return data;
            }

        }

        public static class Exhaust
        {
            const int LINE_LENGTH = 7;

            private static ExhaustEntry ParseLine(string line)
            {
                var parts = line.Split(",");

                if (parts.Length != LINE_LENGTH)
                {
                    return null;
                }

                var timestamp = parts[INDEX_TIMESTAMP];

                return new ExhaustEntry(timestamp)
                {
                    Sensor1 = ParseDouble(parts[1]),
                    Sensor2 = ParseDouble(parts[2]),
                    Sensor3 = ParseDouble(parts[3]),
                    Sensor4 = ParseDouble(parts[4]),
                    Sensor5 = ParseDouble(parts[5]),
                    Sensor6 = ParseDouble(parts[6]),
                };

            }

            public static ExhaustData Parse(string[] file)
            {
                var data = new ExhaustData();

                foreach (var line in file)
                {
                    if (string.IsNullOrWhiteSpace(line))
                    {
                        continue;
                    }

                    var entry = ParseLine(line);

                    if (entry != null)
                    {
                        data.Entries.Add(entry);
                    }
                }

                return data;
            }
        }
    }
}

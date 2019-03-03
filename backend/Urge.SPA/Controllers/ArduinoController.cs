using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Urge.SPA.Controllers
{
    public class ArduinoController : Controller
    {
        private readonly IHostingEnvironment env;

        public ArduinoController(IHostingEnvironment env)
        {
            this.env = env;
        }

        [HttpGet("data/arduino")]
        public async Task<IActionResult> GetData()
        {
            var result = new List<ArduinoData>();

            foreach (var line in await System.IO.File.ReadAllLinesAsync($"{env.ContentRootPath}\\Data\\arduino_data.txt"))
            {
                result.Add(ParseLine(line));
            }

            return Ok(result);
        }

        private ArduinoData ParseLine(string line)
        {
            var parts = line.Split(",");

            return new ArduinoData
            {
                Timestamp = DateTime.Parse(parts[0]).ToString("T"),
                Sensor1 = double.Parse(parts[1], CultureInfo.InvariantCulture),
                Sensor2 = double.Parse(parts[2], CultureInfo.InvariantCulture),
                Sensor3 = double.Parse(parts[3], CultureInfo.InvariantCulture),
                Sensor4 = double.Parse(parts[4], CultureInfo.InvariantCulture),
                Sensor5 = double.Parse(parts[5], CultureInfo.InvariantCulture),
                Sensor6 = double.Parse(parts[6], CultureInfo.InvariantCulture),
            };

        }

        class ArduinoData
        {
            public string Timestamp { get; set; }
            public double Sensor1 { get; set; }
            public double Sensor2 { get; set; }
            public double Sensor3 { get; set; }
            public double Sensor4 { get; set; }
            public double Sensor5 { get; set; }
            public double Sensor6 { get; set; }
        }
    }
}

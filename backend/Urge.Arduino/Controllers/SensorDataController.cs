using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Urge.Arduino.Repository;

namespace Urge.Arduino.Controllers
{
    [AllowAnonymous]
    public class SensorDataController : Controller
    {
        private readonly ISensorDataRepository _sensorDataRepository;

        public SensorDataController(ISensorDataRepository sensorDataRepository)
        {
            _sensorDataRepository = sensorDataRepository;
        }

        [HttpGet("data/exhaust/{date}")]
        public async Task<IActionResult> GetExhaustDataAsync(string date)
        {
            var data = await _sensorDataRepository.GetExhaustDataAsync(date);

            if (data != null)
            {
                return Ok(data);
            }

            return NotFound("Could not find any exhaust data.");
        }

        [HttpGet("data/misc/{date}")]
        public async Task<IActionResult> GetMiscDataAsync(string date)
        {
            var data = await _sensorDataRepository.GetMiscDataAsync(date);

            if (data != null)
            {
                return Ok(data);
            }

            return NotFound("Could not find any misc data.");
        }

        [HttpGet("data/pressure/{date}")]
        public async Task<IActionResult> GetPressureDataAsync(string date)
        {
            var data = await _sensorDataRepository.GetPressureDataAsync(date);

            if (data != null)
            {
                return Ok(data);
            }

            return NotFound("Could not find any pressure data.");
        }
    }
}

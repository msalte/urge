using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Urge.Arduino.Models
{
    public class ExhaustData
    {
        public List<ExhaustEntry> Entries { get; set; } = new List<ExhaustEntry>();
    }
}

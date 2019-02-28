using System;
using System.Collections.Generic;
using System.Text;

namespace Urge.Common.Security
{
    public class HashedPassword
    {
        public string Hash { get; set; }
        public byte[] Salt { get; set; }
    }
}

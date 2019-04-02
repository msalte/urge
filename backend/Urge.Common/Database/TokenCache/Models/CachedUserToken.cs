using System;
using System.Collections.Generic;
using System.Text;

namespace Urge.Common.Database
{
    public class CachedUserToken
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public byte[] CacheBits { get; set; }
        public DateTime? LastWrite { get; set; }
    }
}

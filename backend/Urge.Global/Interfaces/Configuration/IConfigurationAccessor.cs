using System;
using System.Collections.Generic;
using System.Text;

namespace Urge
{
    public interface IConfigurationAccessor
    {
        string Get(ConfigKey key);
    }
}

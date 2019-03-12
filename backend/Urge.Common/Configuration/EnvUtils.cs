using System;
using System.Collections.Generic;
using System.Text;

namespace Urge.Common.Configuration
{
    public static class EnvUtils
    {
        public static bool IsProgramExecuted = false;

        public static bool IsEFMigration()
        {
            if (!IsProgramExecuted)
                return true;

            var buildVar = Environment.GetEnvironmentVariable("TF_BUILD");

            if (bool.TryParse(buildVar, out bool isBuild))
            {
                return isBuild;
            }

            return false;
        }
    }
}

﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Urge.Arduino.Business;
using Urge.Arduino.Models;
using Urge.Arduino.Storage;

namespace Urge.Arduino.Repository
{
    public interface ISensorDataRepository
    {
        Task<ExhaustData> GetExhaustDataAsync(string folder);
        Task<PressureData> GetPressureDataAsync(string folder);
        Task<MiscData> GetMiscDataAsync(string folder);
    }

    public class SensorDataRepository : ISensorDataRepository
    {
        private const string BLOB_NAME_EXHAUST = "EXHAUST.TXT";
        private const string BLOB_NAME_MISC = "MISC.TXT";
        private const string BLOB_NAME_PRESSURE = "PRESSURE.TXT";

        private const string BLOB_CONTAINER_NAME = "sensordata";

        private readonly IBlobStorageClient _blobStorageClient;

        public SensorDataRepository(IBlobStorageClient blobStorageClient)
        {
            _blobStorageClient = blobStorageClient;
        }

        public async Task<ExhaustData> GetExhaustDataAsync(string folder)
        {
            var path = $"{folder}/{BLOB_NAME_EXHAUST}";

            var text = await _blobStorageClient.ReadBlobAsStringAsync(BLOB_CONTAINER_NAME, path);

            var lines = text.Split(new[] { Environment.NewLine }, StringSplitOptions.None);

            return SensorDataParser.Exhaust.Parse(lines);
        }

        public async Task<MiscData> GetMiscDataAsync(string folder)
        {
            var path = $"{folder}/{BLOB_NAME_MISC}";
            var text = await _blobStorageClient.ReadBlobAsStringAsync(BLOB_CONTAINER_NAME, path);

            var lines = text.Split(new[] { Environment.NewLine }, StringSplitOptions.None);

            return SensorDataParser.Misc.Parse(lines);
        }

        public async Task<PressureData> GetPressureDataAsync(string folder)
        {
            var path = $"{folder}/{BLOB_NAME_PRESSURE}";

            var text = await _blobStorageClient.ReadBlobAsStringAsync(BLOB_CONTAINER_NAME, path);

            var lines = text.Split(new[] { Environment.NewLine }, StringSplitOptions.None);

            return SensorDataParser.Pressure.Parse(lines);
        }
    }
}

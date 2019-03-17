using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Urge.Common.Configuration;

namespace Urge.Arduino.Storage
{
    public interface IBlobStorageClient
    {
        Task<string> ReadBlobAsStringAsync(string containerName, string path);
    }

    public class BlobStorageClient : IBlobStorageClient
    {
        private readonly CloudStorageAccount _storageAccount;
        private readonly CloudBlobClient _blobClient;
        
        public BlobStorageClient(IConfiguration configuration)
        {
            _storageAccount = CloudStorageAccount.Parse(configuration[ConfigKey.ConnectionStrings.StorageAccount.Path]);
            _blobClient = _storageAccount.CreateCloudBlobClient();
        }

        public async Task<string> ReadBlobAsStringAsync(string containerName, string path)
        {
            var container = _blobClient.GetContainerReference(containerName);

            await container.CreateIfNotExistsAsync();

            var blob = container.GetBlockBlobReference(path);

            if (await blob.ExistsAsync())
            {
                return await blob.DownloadTextAsync();
            }

            return null;
        }
    }
}

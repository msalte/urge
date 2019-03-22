using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Urge.Arduino.Storage
{
    public interface IBlobStorageClient
    {
        Task<string> ReadBlobAsStringAsync(string containerName, string path);
        Task<List<Uri>> ListFoldersAsync(string containerName);
        Task<string> GenerateSASForContainer(string containerName);
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

        public async Task<List<Uri>> ListFoldersAsync(string containerName)
        {
            var container = _blobClient.GetContainerReference(containerName);

            await container.CreateIfNotExistsAsync();

            var folders = new List<Uri>();

            BlobContinuationToken continuationToken = null;

            do
            {
                var resultSegment = await container.ListBlobsSegmentedAsync(continuationToken);
                var folderUris = resultSegment.Results.Select(r => r.Uri);


                folders.AddRange(folderUris);

                continuationToken = resultSegment.ContinuationToken;
            } while (continuationToken != null);

            return folders;
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

        public async Task<string> GenerateSASForContainer(string containerName)
        {
            var container = _blobClient.GetContainerReference(containerName);

            await container.CreateIfNotExistsAsync();

            return GetSASForContainer(container);
        }

        static string GetSASForContainer(CloudBlobContainer container)
        {
            // Set the expiry time and permissions for the container.
            // In this case no start time is specified, so the shared access signature becomes valid immediately.
            var sasConstraints = new SharedAccessBlobPolicy
            {
                SharedAccessExpiryTime = DateTimeOffset.UtcNow.AddHours(2),
                Permissions = SharedAccessBlobPermissions.Write
            };

            // Generate the shared access signature on the container, setting the constraints directly on the signature.
            var sasContainerToken = container.GetSharedAccessSignature(sasConstraints);

            return sasContainerToken;
        }

    }
}

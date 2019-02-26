
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Urge.Blog.Storage
{
    public interface ICosmosDb
    {
        Task<string> CreateDocumentAsync<T>(string database, string collection, T @object);
        Task<IEnumerable<T>> GetDocuments<T>(string database, string collection);
    }

    public class CosmosDb : ICosmosDb
    {
        private const string ENDPOINT = "https://urge-cosmos.documents.azure.com:443/";
        private readonly IConfiguration _configuration;
        private DocumentClient _client;

        public CosmosDb(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<string> CreateDocumentAsync<T>(string database, string collection, T @object)
        {
            var client = await GetClientAsync(database, collection);

            var response = await client.CreateDocumentAsync(UriFactory.CreateDocumentCollectionUri(database, collection), @object);

            return response.Resource.Id;
        }

        public async Task<IEnumerable<T>> GetDocuments<T>(string database, string collection)
        {
            var client = await GetClientAsync(database, collection);

            var response = client.CreateDocumentQuery<T>(UriFactory.CreateDocumentCollectionUri(database, collection), "select * from c").ToList();

            return response;
        }


        private async Task<DocumentClient> GetClientAsync(string database, string collection)
        {
            if (_client == null)
            {
                _client = new DocumentClient(new Uri(ENDPOINT), GetPrimaryKey());
                await _client.CreateDatabaseIfNotExistsAsync(new Database { Id = database });
                await _client.CreateDocumentCollectionIfNotExistsAsync(UriFactory.CreateDatabaseUri(database), new DocumentCollection { Id = collection });
            }

            return _client;
        }
        private string GetPrimaryKey()
        {
            return _configuration["cosmosdb-primarykey"];
        }
    }
}

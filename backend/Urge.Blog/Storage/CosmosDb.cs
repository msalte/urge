
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Urge.Blog.Storage
{
    public interface ICosmosDb
    {
        Task<T> CreateDocumentAsync<T>(string database, string collection, T @object);
        Task<IEnumerable<T>> GetAllDocuments<T>(string database, string collection);
    }

    public class CosmosDb : ICosmosDb
    {
        private DocumentClient _client;

        public CosmosDb(DocumentClient client)
        {
            _client = client;
        }

        public async Task<T> CreateDocumentAsync<T>(string database, string collection, T @object)
        {
            var response = await _client.CreateDocumentAsync(UriFactory.CreateDocumentCollectionUri(database, collection), @object);

            return CastTo<T>(response.Resource);
        }

        public async Task<IEnumerable<T>> GetAllDocuments<T>(string database, string collection)
        {
            // Task.Run() is a code smell?
            var response = await Task.Run(() => _client.CreateDocumentQuery<T>(UriFactory.CreateDocumentCollectionUri(database, collection), "select * from c").ToList());

            return response;
        }

        private static T CastTo<T>(Resource o)
        {
            return (T)(dynamic)o;
        }
    }
}

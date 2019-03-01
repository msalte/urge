using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Urge.Blog.Storage
{
    public static class DocumentClientExtensions
    {
        public static async Task EnsureCosmosDbExistsAsync(this DocumentClient client)
        {
            foreach (var dbName in DatabaseNames.All.Keys)
            {
                await client.CreateDatabaseIfNotExistsAsync(new Database { Id = dbName });

                foreach (var collName in DatabaseNames.All[dbName])
                {
                    await client.CreateDocumentCollectionIfNotExistsAsync(UriFactory.CreateDatabaseUri(dbName), new DocumentCollection { Id = collName });
                }
            }
        }
    }
}

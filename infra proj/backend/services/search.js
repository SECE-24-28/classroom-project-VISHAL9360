const { SearchClient, AzureKeyCredential } = require("@azure/search-documents");

const endpoint = process.env.AZURE_SEARCH_ENDPOINT;
const apiKey = process.env.AZURE_SEARCH_KEY;
const indexName = "products";

let client;
if (endpoint && apiKey && endpoint !== 'https://<resource>.search.windows.net') {
    client = new SearchClient(endpoint, indexName, new AzureKeyCredential(apiKey));
}

async function searchProducts(query) {
    if (!client) {
        console.log("Using Mock Search Response");
        return [
            { id: "1", name: "Mock Product A", description: "A great product", price: 19.99 },
            { id: "2", name: "Mock Product B", description: "Another awesome item", price: 29.99 }
        ];
    }

    try {
        const searchResults = await client.search(query);
        const results = [];
        for await (const result of searchResults.results) {
            results.push(result.document);
        }
        return results;
    } catch (error) {
        console.error("Error calling Cognitive Search:", error);
        throw error;
    }
}

module.exports = { searchProducts };

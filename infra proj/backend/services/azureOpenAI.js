const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const azureApiKey = process.env.AZURE_OPENAI_KEY;
const deploymentId = "gpt-35-turbo"; // or gpt-4

let client;
if (endpoint && azureApiKey && endpoint !== 'https://<resource>.openai.azure.com') {
    client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
}

async function getChatCompletion(messages) {
    if (!client) {
        console.log("Using Mock OpenAI Response");
        return {
            choices: [{
                message: {
                    content: "This is a mock response from Azure OpenAI. I recommend checking out our new sneakers!"
                }
            }]
        };
    }

    try {
        const result = await client.getChatCompletions(deploymentId, messages);
        return result;
    } catch (error) {
        console.error("Error calling OpenAI:", error);
        throw error;
    }
}

async function getRecommendations(userProfile, productList) {
    const prompt = `User: ${JSON.stringify(userProfile)}\nProducts: ${JSON.stringify(productList)}\nReturn top 5 recommended products with 1-sentence rationale.`;
    const messages = [
        { role: "system", content: "You are a helpful shopping assistant." },
        { role: "user", content: prompt }
    ];
    return await getChatCompletion(messages);
}

module.exports = { getChatCompletion, getRecommendations };

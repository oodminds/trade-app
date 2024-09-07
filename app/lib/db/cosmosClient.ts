// db/cosmosClient.ts
import { CosmosClient } from "@azure/cosmos";
import dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.COSMOS_ENDPOINT;
const key = process.env.COSMOS_KEY;

if (!endpoint || !key) {
    throw new Error(
        "COSMOS_ENDPOINT and COSMOS_KEY must be set in the environment variables."
    );
}

let client: CosmosClient;
try {
    client = new CosmosClient({ endpoint, key }); // Initialize the Cosmos client once
    console.log("Connected to Cosmos DB");
} catch (error) {
    console.error("Error connecting to Cosmos DB:", error);
}

const databaseId = "Trado"; // Define your database ID once

// Export the initialized client and database ID
export { client, databaseId };

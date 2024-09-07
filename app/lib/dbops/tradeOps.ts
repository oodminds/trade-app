// tradesService.ts
import { client, databaseId } from "../db/cosmosClient"; // Import the initialized client
import { Trade } from "../models/Trade";

// Function to get all trades for a user
const getTrades = async (userId: string): Promise<Trade[]> => {
    if (!userId) throw new Error("User ID is required.");

    try {
        const { resources } = await client
            .database(databaseId)
            .container("Trades")
            .items.query({
                query: "SELECT c.* FROM c WHERE c.userId = @userId",
                parameters: [{ name: "@userId", value: userId }],
            })
            .fetchAll();

        console.log(resources);
        return resources;
    } catch (error) {
        console.error("Error fetching trades:", error);
        throw new Error("Failed to fetch trades.");
    }
};

// Function to create a new trade
const createTrade = async (trade: Trade): Promise<Trade> => {
    if (!trade) throw new Error("Trade data is required.");

    try {
        console.log(client, databaseId, "client, databaseId");
        const { resource } = await client
            .database(databaseId)
            .container("Trades")
            .items.create(trade);

        if (!resource) throw new Error("Failed to create trade");

        return resource;
    } catch (error) {
        console.error("Error creating trade:", error);
        throw new Error("Failed to create trade.");
    }
};

// Function to get a specific trade by its ID
const getTrade = async (tradeId: string): Promise<Trade> => {
    if (!tradeId) throw new Error("Trade ID is required.");

    try {
        const { resource } = await client
            .database(databaseId)
            .container("Trades")
            .item(tradeId)
            .read<Trade>();

        if (!resource) throw new Error("Trade not found");

        return resource;
    } catch (error) {
        console.error("Error fetching trade:", error);
        throw new Error("Failed to fetch trade.");
    }
};

// Function to update an existing trade
const updateTrade = async (trade: Trade): Promise<Trade> => {
    if (!trade || !trade.id)
        throw new Error("Trade data with valid ID is required ");

    try {
        const { resource } = await client
            .database(databaseId)
            .container("Trades")
            .item(trade.id)
            .replace(trade);

        if (!resource) throw new Error("Failed to update trade");

        return resource;
    } catch (error) {
        console.error("Error updating trade:", error);
        throw new Error("Failed to update trade.");
    }
};

// Function to delete a trade by its ID
const deleteTrade = async (
    tradeId: string,
    partitionKey: string
): Promise<void> => {
    if (!tradeId) {
        throw new Error("tradeId is required to delete a trade.");
    }

    if (!partitionKey) {
        throw new Error("Partition key is required to delete a trade.");
    }

    await client
        .database(databaseId)
        .container("Trades")
        .item(tradeId, partitionKey)
        .delete();
};

export { getTrades, createTrade, getTrade, updateTrade, deleteTrade };

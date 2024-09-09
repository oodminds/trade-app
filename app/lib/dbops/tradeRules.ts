// tradesService.ts
import { client, databaseId } from "../db/cosmosClient"; // Import the initialized client
import { TradeRules } from "../models/TradeRules";

// Function to get all trades for a user
const getTradesRules = async (userId: string): Promise<TradeRules[]> => {
    if (!userId) throw new Error("User ID is required.");

    try {
        const { resources } = await client
            .database(databaseId)
            .container("TradeRules")
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
const createTradeRules = async (tradeRules: TradeRules): Promise<TradeRules> => {
    if (!tradeRules) throw new Error("Trade Rules data is required.");

    try {
        console.log(client, databaseId, "client, databaseId");
        const { resource } = await client
            .database(databaseId)
            .container("TradeRules")
            .items.create(tradeRules);

        if (!resource) throw new Error("Failed to create trade rules");

        return resource;
    } catch (error) {
        console.error("Error creating trade rules:", error);
        throw new Error("Failed to create trade rules.");
    }
};

// Function to get a specific trade by its ID
const getTradeRules = async (tradeRulesId: string): Promise<TradeRules> => {
    if (!tradeRulesId) throw new Error("Trade Rules ID is required.");

    try {
        const { resource } = await client
            .database(databaseId)
            .container("TradeRules")
            .item(tradeRulesId)
            .read<TradeRules>();

        if (!resource) throw new Error("Trade Rules not found");

        return resource;
    } catch (error) {
        console.error("Error fetching trade rules:", error);
        throw new Error("Failed to fetch trade rules.");
    }
};

// Function to update an existing trade
const updateTradeRules = async (tradeRules: TradeRules): Promise<TradeRules> => {
    if (!tradeRules || !tradeRules.id)
        throw new Error("Trade Rules data with valid ID is required ");

    try {
        const { resource } = await client
            .database(databaseId)
            .container("TradeRules")
            .item(tradeRules.id)
            .replace(tradeRules);

        if (!resource) throw new Error("Failed to update trade");

        return resource;
    } catch (error) {
        console.error("Error updating trade:", error);
        throw new Error("Failed to update trade.");
    }
};

// Function to delete a trade by its ID
const deleteTradeRules = async (
    tradeRulesId: string,
    partitionKey: string
): Promise<void> => {
    if (!tradeRulesId) {
        throw new Error("tradeRulesId is required to delete a trade rules.");
    }

    if (!partitionKey) {
        throw new Error("Partition key is required to delete a trade.");
    }

    await client
        .database(databaseId)
        .container("TradeRules")
        .item(tradeRulesId, partitionKey)
        .delete();
};

export { getTradesRules, createTradeRules, getTradeRules, updateTradeRules, deleteTradeRules };

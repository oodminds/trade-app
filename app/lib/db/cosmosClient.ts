import { CosmosClient } from '@azure/cosmos';
import { Trade } from '../models/Trade';

/**
 * Service for interacting with the database.
 * This is singleton class, so only one instance will be created.
 * It uses Azure Cosmos DB to store tasks.
 * @class
 * @constructor
 * @public
 * @singleton
 * @property {CosmosClient} client - The Cosmos DB client.
 * @property {string} databaseId - The ID of the database.
 * @property {string} containerId - The ID of the container.
 * @method getTasks - Get all tasks for a user.
 * @method createTask - Create a new task.
 * @method getTask - Get a task by ID.
 * @method updateTask - Update a task.
 * @method deleteTask - Delete a task.
 */
export class DbService {
  private client: CosmosClient;
  private databaseId: string = 'Trado';
  private containerId: string = 'Trades';

  private static instance: DbService;

  static getInstance(): DbService {
    if (!DbService.instance) {
      DbService.instance = new DbService();
    }
    return DbService.instance;
  }

  constructor() {
    const endpoint =  "https://cosmosdbnosql-trado.documents.azure.com:443/";
    const key =  "E9vcx3t5oSofIH7CnMNbt2QIRbbGOdoS8HLhPNdyyeqRLj8xOyHwN7dMSQ3wls9r5ebfU1Rpyrn0ACDbZxwVCw==";


    if (!endpoint || !key) {
      throw new Error('Missing COSMOS_ENDPOINT or COSMOS_KEY environment variable');
    }

    this.client = new CosmosClient({ endpoint, key });
    this.createDatabaseAndContainer();
  }

  private async createDatabaseAndContainer() {
    const { database } = await this.client.databases.createIfNotExists({ id: this.databaseId });
    await database.containers.createIfNotExists({ id: this.containerId, partitionKey: { kind: "Hash", paths: ["/userId"] } });
  }

  async getTrades(userId: string): Promise<Trade[]> {
    const { resources } = await this.client
      .database(this.databaseId)
      .container(this.containerId)
      .items.query({
        query: 'SELECT * from c WHERE c.userId = @userId',
        parameters: [{ name: '@userId', value: userId }]
      })
      .fetchAll();

    return resources;
  }

  async createTrade(trade: Trade): Promise<Trade> {
    const { resource } = await this.client
      .database(this.databaseId)
      .container(this.containerId)
      .items.create(trade);

    if (!resource) {
      throw new Error('Failed to create trade');
    }

    return resource;
  }

  async getTrade(tradeId: string): Promise<Trade> {
    const { resource } = await this.client
      .database(this.databaseId)
      .container(this.containerId)
      .item(tradeId)
      .read<Trade>();

    if (!resource) {
      throw new Error('Trade not found');
    }

    return resource;
  }

  async updateTrade(trade: Trade): Promise<Trade> {
    const { resource } = await this.client
      .database(this.databaseId)
      .container(this.containerId)
      .item(trade.id)
      .replace(trade);

    if (!resource) {
      throw new Error('Failed to update trade');
    }

    return resource;
  }

  async deleteTrade(tradeId: string): Promise<void> {
    await this.client
      .database(this.databaseId)
      .container(this.containerId)
      .item(tradeId)
      .delete();
  }
}
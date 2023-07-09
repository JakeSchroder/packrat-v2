// External Dependencies
import * as mongoDB from 'mongodb';

// Global Variables
const collections: { products?: mongoDB.Collection } = {};

console.log('db init script');
// Initialize Connection
if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}
let client: mongoDB.MongoClient;
if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongoCollections = global as typeof globalThis & {
    _products: mongoDB.Collection;
  };

  if (!globalWithMongoCollections._products) {
    console.log('Local Dev: Collection not yet established');
    client = new mongoDB.MongoClient(process.env.MONGODB_URI, {});
    client
      .connect()
      .then((client) => {
        console.log('Local Dev: 1/3 Client connected');
        return client.db('packrat');
      })
      .then((db: mongoDB.Db) => {
        console.log('Local Dev: 2/3 DB connected');
        globalWithMongoCollections._products = db.collection('products');
        collections.products = globalWithMongoCollections._products;
      });
  } else {
    collections.products = globalWithMongoCollections._products;
    console.log(
      `Local Dev: Successfully retrieved collection: ${collections.products.collectionName}`,
    );
  }
} else {
  client = new mongoDB.MongoClient(process.env.MONGODB_URI, {});
  client.connect().then((client) => {
    const db: mongoDB.Db = client.db('packrat');
    const productsCollection: mongoDB.Collection = db.collection('products');
    collections.products = productsCollection;
    console.log(
      `Production: Successfully connected to database: ${db.databaseName} and collection: ${productsCollection.collectionName}`,
    );
  });
}

export default collections;

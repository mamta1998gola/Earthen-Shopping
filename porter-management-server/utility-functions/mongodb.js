const { MongoClient } = require("mongodb");

// MongoDB
const uri = process.env.Mongo_URI;

const client = new MongoClient(uri);
client.connect();

const dbName = "porter-data";
const collectionName = "users";

const database = client.db(dbName);
const collection = database.collection(collectionName);

module.exports = {
    collection
}
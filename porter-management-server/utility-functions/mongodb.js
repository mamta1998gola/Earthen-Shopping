const { MongoClient } = require("mongodb");

// MongoDB
const uri =
    "mongodb+srv://mamta1998gola:Porter-manipal@cluster0.npb5q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);
client.connect();

const dbName = "porter-data";
const collectionName = "users";

const database = client.db(dbName);
const collection = database.collection(collectionName);

module.exports = {
    collection
}
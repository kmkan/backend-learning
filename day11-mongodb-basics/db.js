const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://mongo:DB@cluster0.95tubn2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const client = new MongoClient(uri);

module.exports = client;
const { MongoClient } = require("mongodb");

// Connection URI (local MongoDB)
const uri = "mongodb://localhost:27017";

// Create a new client
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected successfully to MongoDB");

    const db = client.db("plp_bookstore"); // create/use the database
    console.log("📚 Using database:", db.databaseName);
  } catch (err) {
    console.error("❌ Connection failed:", err);
  } finally {
    await client.close();
  }
}

run();

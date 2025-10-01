const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("plp_bookstore");
    const books = db.collection("books");

    console.log("✅ Connected to plp_bookstore\n");

    // ---------------- TASK 2: BASIC CRUD ---------------- //

    // 1. Find all books in a specific genre
    const fictionBooks = await books.find({ genre: "Fiction" }).toArray();
    console.log("📖 Fiction Books:", fictionBooks);

    // 2. Find books published after a certain year
    const recentBooks = await books.find({ published_year: { $gt: 2010 } }).toArray();
    console.log("📖 Books after 2010:", recentBooks);

    // 3. Find books by a specific author
    const byAuthor = await books.find({ author: "Cal Newport" }).toArray();
    console.log("📖 Books by Cal Newport:", byAuthor);

    // 4. Update the price of a specific book
    await books.updateOne({ title: "1984" }, { $set: { price: 13 } });
    console.log("✅ Updated price of 1984");

    // 5. Delete a book by its title
    await books.deleteOne({ title: "Rich Dad Poor Dad" });
    console.log("🗑️ Deleted Rich Dad Poor Dad");

    // ---------------- TASK 3: ADVANCED QUERIES ---------------- //

    // 1. Books that are in stock AND published after 2010
    const advancedQuery = await books.find({ in_stock: true, published_year: { $gt: 2010 } }).toArray();
    console.log("\n📖 In-stock books after 2010:", advancedQuery);

    // 2. Projection (return only title, author, price)
    const projectionQuery = await books.find({}, { projection: { title: 1, author: 1, price: 1 } }).toArray();
    console.log("\n📋 Projection (title, author, price):", projectionQuery);

    // 3. Sorting by price
    const sortedAsc = await books.find().sort({ price: 1 }).toArray();
    console.log("\n⬆️ Books sorted by price (ascending):", sortedAsc);

    const sortedDesc = await books.find().sort({ price: -1 }).toArray();
    console.log("\n⬇️ Books sorted by price (descending):", sortedDesc);

    // 4. Pagination (5 per page, skip first page)
    const page2 = await books.find().skip(5).limit(5).toArray();
    console.log("\n📄 Page 2 (5 books):", page2);

    // ---------------- TASK 4: AGGREGATION ---------------- //

    // 1. Average price of books by genre
    const avgPriceByGenre = await books.aggregate([
      { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
    ]).toArray();
    console.log("\n💰 Average price by genre:", avgPriceByGenre);

    // 2. Author with most books
    const topAuthor = await books.aggregate([
      { $group: { _id: "$author", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.log("\n🏆 Author with most books:", topAuthor);

    // 3. Group by publication decade
    const byDecade = await books.aggregate([
      {
        $group: {
          _id: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]).toArray();
    console.log("\n📅 Books grouped by decade:", byDecade);

    // ---------------- TASK 5: INDEXING ---------------- //

    // 1. Create index on title
    await books.createIndex({ title: 1 });
    console.log("\n⚡ Created index on title");

    // 2. Compound index (author + published_year)
    await books.createIndex({ author: 1, published_year: -1 });
    console.log("⚡ Created compound index on author + published_year");

    // 3. Explain performance with index
    const explainResult = await books.find({ title: "The Alchemist" }).explain("executionStats");
    console.log("\n🔍 Explain query (with index):", explainResult.executionStats);

  } finally {
    await client.close();
    console.log("\n🔒 Connection closed");
  }
}

run().catch(console.dir);

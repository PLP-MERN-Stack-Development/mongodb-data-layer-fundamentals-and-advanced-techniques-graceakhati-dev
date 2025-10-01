// Task 1: Setup & Insert Books

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("plp_bookstore"); // database
    const books = db.collection("books"); // collection

    // Insert 10 sample books
    const result = await books.insertMany([
      {
        title: "Atomic Habits",
        author: "James Clear",
        genre: "Self-help",
        published_year: 2018,
        price: 15,
        in_stock: true,
        pages: 320,
        publisher: "Penguin"
      },
      {
        title: "The Alchemist",
        author: "Paulo Coelho",
        genre: "Fiction",
        published_year: 1988,
        price: 12,
        in_stock: true,
        pages: 208,
        publisher: "HarperCollins"
      },
      {
        title: "Deep Work",
        author: "Cal Newport",
        genre: "Productivity",
        published_year: 2016,
        price: 18,
        in_stock: true,
        pages: 296,
        publisher: "Grand Central"
      },
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        genre: "Programming",
        published_year: 2008,
        price: 25,
        in_stock: false,
        pages: 464,
        publisher: "Prentice Hall"
      },
      {
        title: "Sapiens",
        author: "Yuval Noah Harari",
        genre: "History",
        published_year: 2011,
        price: 20,
        in_stock: true,
        pages: 498,
        publisher: "Vintage"
      },
      {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        genre: "Programming",
        published_year: 1999,
        price: 30,
        in_stock: true,
        pages: 352,
        publisher: "Addison-Wesley"
      },
      {
        title: "Educated",
        author: "Tara Westover",
        genre: "Memoir",
        published_year: 2018,
        price: 14,
        in_stock: true,
        pages: 334,
        publisher: "Random House"
      },
      {
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        published_year: 1949,
        price: 10,
        in_stock: false,
        pages: 328,
        publisher: "Secker & Warburg"
      },
      {
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        genre: "Psychology",
        published_year: 2011,
        price: 16,
        in_stock: true,
        pages: 499,
        publisher: "Farrar, Straus and Giroux"
      },
      {
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        genre: "Finance",
        published_year: 1997,
        price: 11,
        in_stock: true,
        pages: 336,
        publisher: "Warner Books"
      }
    ]);

    console.log(`📚 Inserted ${result.insertedCount} books`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

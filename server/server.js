// Requires the Express framework to set up the server.
const express = require("express");
// Requires the CORS (Cross-Origin Resource Sharing) package to allow requests from different origins.
const cors = require("cors");
// Imports the 'scrapeWebsite' function from the scraper.js file located in the "../scraper/" directory.
const scrapeWebsite = require("../scraper/scraper.js");

// Creates an instance of an Express application.
const app = express();
// Defines the port on which the server will run. It uses the environment's PORT variable if available; otherwise, it defaults to 3000.
const PORT = process.env.PORT || 3000;
// Defines the URL of the website to be scraped.
const URL = 'http://books.toscrape.com/'

// Uses the CORS middleware to enable CORS with various options.
app.use(cors());
// Uses the built-in middleware to parse incoming requests with JSON payloads.
app.use(express.json())

// Defines a route handler for GET requests to the "/api/books" path.
app.get("/api/books", async (req, res) => {
  // Calls the 'scrapeWebsite' function with the specified URL and awaits its result, storing it in 'books'.
  const books = await scrapeWebsite(URL);
  // Logs the scraped books data to the console.
  console.log(books)
  // Sends a JSON response containing the scraped books data to the client.
  res.json(books);
});

// Starts a server and listens for connections on the specified PORT. Upon starting, it logs a message indicating the server is running.
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

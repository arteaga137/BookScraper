const express = require("express");
const cors = require("cors");
const scrapeWebsite = require("../scraper/scraper.js");

const app = express();
const PORT = process.env.PORT || 3000;
const URL = 'http://books.toscrape.com/'

app.use(cors());
app.use(express.json())

app.get("/api/books", async (req, res) => {
  const books = await scrapeWebsite(URL);
  console.log(books)
  res.json(books);
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

// Requires the Puppeteer library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol.
const puppeteer = require("puppeteer");

// Declares an asynchronous function named 'scrapeWebsite' that takes a URL as its parameter.
async function scrapeWebsite(url) {
  // Launches a new browser instance. 'await' is used to wait for the Promise to resolve before moving to the next line.
  const browser = await puppeteer.launch();
  // Opens a new page/tab in the browser instance.
  const page = await browser.newPage();
  // Navigates to the URL provided when the function is called, waiting for the page to load before proceeding.
  await page.goto(url);

  // Evaluates JavaScript code in the context of the page. This function will be serialized and run in the webpage context.
  const books = await page.evaluate(() => {
    // Initializes an empty array to store data scraped from the webpage.
    const scrapedWebsite = [];
    // Selects all elements with the class 'product_pod' and iterates over them using forEach.
    document.querySelectorAll(".product_pod").forEach((item) => {
      // For each 'product_pod', finds the child element 'h3 a' and retrieves its 'title' attribute, storing it in 'title'.
      const title = item.querySelector("h3 a").title;
      // Finds the child element with class 'price_color' and retrieves its text content, storing it in 'price'.
      const price = item.querySelector(".price_color").innerText;
      // Pushes an object containing the 'title' and 'price' into the 'scrapedWebsite' array.
      scrapedWebsite.push({ title, price });
    });
    // Returns the 'scrapedWebsite' array filled with the data from the page.
    return scrapedWebsite;
  });

  // Closes the browser instance. This is important to free up resources.
  await browser.close();
  // Returns the array of books (with titles and prices) that was scraped from the page.
  return books;
}

// Exports the 'scrapeWebsite' function so it can be imported and used in other files.
module.exports = scrapeWebsite;

const puppeteer = require("puppeteer");

async function scrapeWebsite(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const books = await page.evaluate(() => {
    const scrapedWebsite = [];
    document.querySelectorAll(".product_pod").forEach((item) => {
      const title = item.querySelector("h3 a").title;
      const price = item.querySelector(".price_color").innerText;
      scrapedWebsite.push({ title, price });
    });
    return scrapedWebsite;
  });

  await browser.close();
  return books;
}

module.exports = scrapeWebsite;

const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = 3001;


app.get('/' ,async(req,res)=>{
  try {
    // Launch Puppeteer in non-headless mode to see the browser
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    // Navigate to the MLH events page
    await page.goto('https://mlh.io/seasons/2025/events', { waitUntil: 'domcontentloaded' });

    // Wait for the event wrapper to be loaded
    await page.waitForSelector('.event-wrapper', { timeout: 10000 });

    // Scrape the event details and log them to the console
    const events = await page.evaluate(() => {
      // Get event details (e.g., name, date, location) from the event-wrapper
      return [...document.querySelectorAll('.event-wrapper')].map(event => event.innerText);
    });

    // Log the event details to the console
    console.log(events);

    // Close the browser
    await browser.close();

    res.send({events})
  } catch (error) {
    console.error('Error occurred while scraping MLH events:', error);
  }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
// (async () => {
//   try {
//     // Launch Puppeteer in non-headless mode to see the browser
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
    
//     // Navigate to the MLH events page
//     await page.goto('https://mlh.io/seasons/2025/events', { waitUntil: 'domcontentloaded' });

//     // Wait for the event wrapper to be loaded
//     await page.waitForSelector('.event-wrapper', { timeout: 10000 });

//     // Scrape the event details and log them to the console
//     const events = await page.evaluate(() => {
//       // Get event details (e.g., name, date, location) from the event-wrapper
//       return [...document.querySelectorAll('.event-wrapper')].map(event => event.innerText);
//     });

//     // Log the event details to the console
//     console.log(events);

//     // Close the browser
//     await browser.close();
//   } catch (error) {
//     console.error('Error occurred while scraping MLH events:', error);
//   }
// })();

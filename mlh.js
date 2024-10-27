const express = require('express');
const puppeteer = require('puppeteer');
const { saveEvents } = require('./saveEvents')
const axios = require('axios');
const cron = require('node-cron');

const app = express();
const PORT = 3000;

app.get('/mlh', async (req, res) => {
  try {
    // Launch puppeteer to control headless browser
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Navigate to the MLH events page
    await page.goto('https://mlh.io/seasons/2025/events', { waitUntil: 'domcontentloaded' });

    // Wait for the necessary DOM to load
    await page.waitForSelector('.event-wrapper', { timeout: 10000 });

    // Scrape the event data
    const events = await page.evaluate(() => {

      const images = [...document.querySelectorAll('.event-logo img')].map(img => img.src);

      const additionalImages = [...document.querySelectorAll('.image-wrap img')].map(img => img.src);

      const eventDetails = [...document.querySelectorAll('.event-wrapper')].map(event => event.innerText);
      console.log(eventDetails)

      // Create a combined array of events
      const combinedEvents = eventDetails.map((details, index) => ({
        details,
        eventLogo: images[index] || null,
        additionalImage: additionalImages[index] || null,
      }));

      return combinedEvents;
    });

    await browser.close();

    // Send the scraped data as JSON response
    res.json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while scraping MLH events' });
  }
});
fetchEvents();
console.log("1")
console.log("2")
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Schedule the fetchEvents function to run every hour
cron.schedule('0 0 * * *', () => {
  console.log('Running scheduled task: fetchEvents');
  fetchEvents();
});

async function fetchEvents() {
  try {
    const response = await axios.get('http://localhost:3000/mlh/');
    const events = response.data.events;

    // Save the fetched events to the database
    await saveEvents(events);
  } catch (error) {
    console.error('Error fetching events:', error);
  }
}

// Lambda handler
exports.handler = async (event) => {
  await fetchEvents();
  return {
    statusCode: 200,
    body: JSON.stringify('Lambda function executed successfully!'),
  };
};
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001; // Use a different port if needed

// Endpoint to serve data from the database
app.get('/api/events', async (req, res) => {
    try {
        const events = await prisma.mlh.findMany(); // Fetch data from the database
        res.json(events); // Serve the data from the database
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(PORT, () => {
    console.log(`API server is running on port ${PORT}`);
});
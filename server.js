const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');

dotenv.config();
const app = express();
const port = 4000;

app.use(cors());

// Endpoint to fetch weather data
app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.OPENWEATHERMAP_TOKEN;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
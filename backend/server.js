require('dotenv').config(); // Load environment variables
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// RapidAPI configuration
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = 'bhagavad-gita3.p.rapidapi.com';

// Endpoint to fetch chapter details
app.post('/api/chapter', async (req, res) => {
  const { chapter } = req.body;

  if (!chapter) {
    return res.status(400).json({ error: 'Chapter number is required' });
  }

  const options = {
    method: 'GET',
    url: `https://${RAPIDAPI_HOST}/v2/chapters/${chapter}/`,
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': RAPIDAPI_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching chapter details:', error);
    res.status(500).json({ error: 'Failed to fetch chapter details' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
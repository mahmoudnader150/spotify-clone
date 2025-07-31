const axios = require('axios');
const express = require('express');
const spotifyWebApi = require('spotify-web-api-node');
const bodyParser = require('body-parser');
const cors = require('cors');
// Add your Genius API access token here
const GENIUS_ACCESS_TOKEN = process.env.GENIUS_ACCESS_TOKEN || 'PASTE_YOUR_GENIUS_ACCESS_TOKEN_HERE';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Lyrics endpoint using Genius API
app.get('/lyrics', async (req, res) => {
  const { artist, title } = req.query;
  if (!artist || !title) {
    return res.status(400).json({ error: 'Missing artist or title' });
  }
  try {
    // Search for the song on Genius
    const searchUrl = `https://api.genius.com/search?q=${encodeURIComponent(artist + ' ' + title)}`;
    const searchRes = await axios.get(searchUrl, {
      headers: { Authorization: `Bearer ${GENIUS_ACCESS_TOKEN}` }
    });
    const hits = searchRes.data.response.hits;
    if (!hits.length) return res.json({ lyrics: 'No lyrics found.' });
    // Get the Genius song page URL
    const songPath = hits[0].result.path;
    const songUrl = `https://genius.com${songPath}`;
    // Scrape the lyrics from the song page
    const pageRes = await axios.get(songUrl);
    const cheerio = require('cheerio');
    const $ = cheerio.load(pageRes.data);
    const lyrics = $('.lyrics, .Lyrics__Container').text().trim() || 'No lyrics found.';
    res.json({ lyrics });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch lyrics', details: err.message });
  }
});

app.post('/login', (req, res) => {
  const { code } = req.body;

  const spotifyApi = new spotifyWebApi({
    clientId: '92e32100b0a64585add9699486cfbf32',
    clientSecret: '16b4481cf3454e139b09b83a3109f1ab',
    redirectUri: 'http://127.0.0.1:5173'
  });

  spotifyApi.authorizationCodeGrant(code).then(
    (data) => {
      res.json({ 
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in
      });
    },
    (err) => {
      // Improved error logging for debugging
      if (err && err.body) {
        console.error('Spotify API Error:', JSON.stringify(err.body, null, 2));
      } else {
        console.error('Error getting Tokens:', err);
      }
      res.status(500).json({ error: 'Failed to get tokens', details: err.body || err });
    }
  );
});
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});


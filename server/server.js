const express = require('express');
const spotifyWebApi = require('spotify-web-api-node');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.json());

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


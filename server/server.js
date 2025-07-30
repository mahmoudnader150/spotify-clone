const express = require('express');
const spotifyWebApi = require('spotify-web-api-node');

const app = express();

app.post('/login', (req, res) => {
  const { code } = req.body;

  const spotifyApi = new spotifyWebApi({
    clientId: '92e32100b0a64585add9699486cfbf32',
    clientSecret: '16b4481cf3454e139b09b83a3109f1ab',
    redirectUri: 'http://127.0.0.1:3000'
  });

  spotifyApi.authorizationCodeGrant(code).then(
    (data) => {
      const { access_token, refresh_token } = data.body;

      // Store the tokens in your database or session
      res.json({ access_token, refresh_token });
    },
    (err) => {
      console.error('Error getting Tokens:', err);
      res.status(500).json({ error: 'Failed to get tokens' });
    }
  );
});
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
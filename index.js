require('dotenv').config();
const express = require('express');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const app = express();

app
  .use(express.static(__dirname + '/public'))
  .use(cors())
  .use(cookieParser());

const PORT = 5001;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const stateKey = 'spotify_auth_state';

let generateRandomString = (length) => {
  let text = '';
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.get('/', (req, res) => {
  res.send('App started in index page!!');
});

app.get('/login', (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);
  let scope = ['user-read-private', 'user-read-email', 'user-top-read'].join(' ');
  const queryParams = querystring.stringify({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    state: state,
    scope: scope,
  });
  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

app.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  const formData = querystring.stringify({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: REDIRECT_URI,
  });
  const encodedBasicAuth = new Buffer.from(
    `${CLIENT_ID}:${CLIENT_SECRET}`
  ).toString('base64');
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      formData,
      {
        headers: {
          Authorization: `Basic ${encodedBasicAuth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    if (response.status === 200) {
      const { access_token, refresh_token, expires_in } = response.data;
      const queryParams = querystring.stringify({
        access_token,
        refresh_token,
        expires_in
      });
      // Redirect to React app
      res.redirect(`http://localhost:3000?${queryParams}`);
    } else {
      res.redirect(
        `http://localhost:3000?${querystring.stringify({
          error: 'invalid_token',
        })}`
      );
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.get('/refresh_token', async (req, res) => {
  const refresh_token = req.query.refresh_token || null;
  const formData = querystring.stringify({
    grant_type: 'refresh_token',
    refresh_token: refresh_token,
  });
  const encodedBasicAuth = new Buffer.from(
    `${CLIENT_ID}:${CLIENT_SECRET}`
  ).toString('base64');
  try {
    const response = await axios.post(
      `https://accounts.spotify.com/api/token`,
      formData,
      {
        headers: {
          Authorization: `Basic ${encodedBasicAuth}`,
        },
      }
    );
    if (response.status === 200) {
      res.send({access_token: response.data.access_token});
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});

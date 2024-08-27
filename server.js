const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const CLIENT_ID = 'he9zgJIEKWgN20BSZBcvCFXXhOxcTbbX';
const CLIENT_SECRET = 'RKtav-dIMUzsyn0RzzDmBxsEGEpz2-cuF-FeEBXKOjSkSHLdMr1eUAnOomHgUU4F';
const AUTH0_DOMAIN = 'https://dev-7m3edz7gsmn14x6r.us.auth0.com';

app.post('/exchange-code', async (req, res) => {
  const { code, redirect_uri } = req.body;

  try {
    const response = await axios.post(`${AUTH0_DOMAIN}/oauth/token`, {
      grant_type: 'authorization_code',
      code,
      redirect_uri,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error exchanging code for tokens');
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
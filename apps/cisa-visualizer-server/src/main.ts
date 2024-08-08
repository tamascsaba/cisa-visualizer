/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import * as https from 'node:https';

const app = express();
const CISA_URL = 'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json';

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to cisa-visualizer-server!' });
});

app.get('/api/cisa/', (req, res) => {
  res.send({ message: 'You can get all cisa related information from sub resources.' });
});

app.get('/api/cisa/vulnerabilities', (req, res) => {
  https.get(CISA_URL, (externalRes) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Transfer-Encoding', 'chunked');

    // stream the cisa response.
    // it has minimal memory footprint 🚀
    externalRes.pipe(res);

    externalRes.on('error', (error) => {
      res.status(500).send('Error fetching the JSON data');
    });
  }).on('error', (error) => {
    res.status(500).send('Error making the request');
  });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

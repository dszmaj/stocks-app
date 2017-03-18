"use strict";
const compression = require('compression'),
      express = require('express'),
      path = require('path'),
  
      E2E_PORT = require('./constants').E2E_PORT,
      HOST = require('./constants').HOST,
      PROD_PORT = require('./constants').PROD_PORT,

      app = express(),
      ROOT = path.join(path.resolve(__dirname, '..')),
  
      ENV = process.env.npm_lifecycle_event,
      E2E = ENV === 'e2e:server' ? E2E_PORT : null,
      PORT = E2E || PROD_PORT;


app.use(compression());
app.use(express.static('dist/client'));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/client/index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on: http://${HOST}:${PORT}`);
});

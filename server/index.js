const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const db = require(path.join(__dirname + '/../database/index.js'));

const app = express();

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(bodyParser.json());





let port = 3000

app.listen(port, () => {
  console.log('Listetning on port: ', port);
})
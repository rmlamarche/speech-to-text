const fs = require("fs");
const express = require('express');
const shell = require('shelljs');
const config = require('./config.js');
const https = require('https');

var app = express();
app.use(express.static(__dirname + '/public'));

var privateKey = fs.readFileSync('privatekey.pem').toString();
var certificate = fs.readFileSync('certificate.pem').toString();

var httpOptions = {
  key: privateKey,
  cert: certificate
};
https.createServer(httpOptions, app).listen(8000, () => {
  console.log(">> Serving on " + 8000);
});

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/light/:mode', (req, res, next) => {
  switch (req.params.mode) {
    case 'on':
      shell.exec(config.scriptLocation + ' on');
      break;
    case 'off':
      shell.exec(config.scriptLocation + ' off');
      break;
    default:
      console.error('error in default switch case, could not POST');
      break;
  }
  res.status(200).end();
});

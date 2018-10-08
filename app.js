const fs = require("fs");
const express = require('express');
const shell = require('shelljs');
const config = require('./config.js');

var app = express();
app.use(express.static(__dirname + '/public'));
app.listen(8080, () => {
  console.log("Voice recognition running on port 8080");
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

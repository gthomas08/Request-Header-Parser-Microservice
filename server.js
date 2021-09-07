// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.set('trust proxy', true);

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/whoami", (req, res) => {
  const ipaddress = req.ip || req.headers['x-forwarded-for'];
  const language = req.headers["accept-language"];
  const software = req.headers['user-agent'];

  const info = {ipaddress, language, software};

  // Send the response
  res.json(info);
});

// listen for requests
const PORT = 8080;
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port + '.');
});

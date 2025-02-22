const path = require('path');
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(path.join(__dirname, 'public')));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api',(req, res)=> {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  });
});

  app.get('/api/:timestamp', (req, res)=> {
   const timestamp = req.params.timestamp;

  if(!isNaN(Number(timestamp)) && timestamp.length == 13) {
    return res.json({
      unix: timestamp,
      utc: new Date(Number(timestamp)).toUTCString(),
    });
  }

if (new Date(timestamp).toUTCString() !== "Invalid Date"){
  return res.json({
    unix: new Date(timestamp).getTime(),
    utc: timestamp,
  });
} 

  res.send({ error : "Invalid Date" });
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + 3000);
});

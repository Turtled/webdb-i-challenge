var express = require('express')
var bodyParser = require('body-parser')
var server = express()

const accountRouter = require('./AccountRouter');

server.get('/', (req, res) => {
  res.send(`<h2>Welcome to the BEST API ever created.</h2>`)
});

//custom middleware
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
server.use(bodyParser.json())

server.use('/api/accounts', accountRouter);

module.exports = server;

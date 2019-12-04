var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var loki = require('lokijs')

let seedData = require('./seed-data.json')

var db = new loki('launches.db');
var launches = db.addCollection('launches');

launches.insert(seedData)

app = express();

app.get('/api/all', (req, res) => {
    res.json(launches.find())
    //res.sendStatus(200)
})

app.use(serveStatic(__dirname + "/dist"));

var port = process.env.PORT || 5000;
app.listen(port);

console.log('server started '+ port);

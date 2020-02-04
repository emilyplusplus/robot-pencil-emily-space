var express = require('express');
var path = require('path');
var cors = require('cors')
var serveStatic = require('serve-static');
var loki = require('lokijs')

let seedData = require('./seed-data.json')

var db = new loki('launches.db');
var launches = db.addCollection('launches');

launches.insert(seedData)

app = express();

app.use(cors())

app.get('/api/all', (req, res) => {
    res.json(launches.find())
    //res.sendStatus(200)
})

app.get('/api/filtered', (req, res) => {
    //console.log(req.query)
    let queryObj = {}

    if(req.query.landSuccess == 'true') { queryObj['launch_success'] = true }
    if(req.query.reUsed == 'true') { 
        //queryObj['reuse']['core'] = true
    }
    if(req.query.withReddit == 'true') { 
        //queryObj['links']['reddit_launch'] = true
    }

    console.log(queryObj)

    res.json( launches.find(queryObj) )
    //res.sendStatus(200)
})

app.use(serveStatic(__dirname + "/dist"));

var port = process.env.PORT || 5000;
app.listen(port);

console.log('server started '+ port);

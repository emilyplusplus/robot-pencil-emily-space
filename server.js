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
})

app.get('/api/filtered', (req, res) => {
    let queryObj = {}

    if(req.query.landSuccess == 'true') { queryObj['launch_success'] = true }
    if(req.query.reUsed == 'true') {
        queryObj['$or'] = [{ 
            'reuse.core': true
          },{
            'reuse.side_core1': true
          },{
            'reuse.side_core2': true
          },{
            'reuse.fairings': true
          },{
            'reuse.capsule': true
          }]
    }
    if(req.query.withReddit == 'true') {
        queryObj['$or'] = [{ 
            'links.reddit_launch': { $ne: null }
          },{
            'links.reddit_campaign': { $ne: null }
          },{
            'links.reddit_recovery': { $ne: null }
          },{
            'links.reddit_media': { $ne: null }
          }]
    }

    //console.log(queryObj)

    res.json( launches.find(queryObj) )
})

app.use(serveStatic(__dirname + "/dist"));

var port = process.env.PORT || 5000;
app.listen(port);

console.log('server started '+ port);

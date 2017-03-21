const express = require('express')
const path = require('path')
const mongodb = require('mongodb');
const validURL = require('valid-url')

const app = express()
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8080
const dbURL = 'mongodb://localhost:27017/url_shortener';
var dbCollection

// Use connect method to connect to the Server
const db = MongoClient.connect(dbURL, function(err, db) {
    if ( err )
        throw err

    dbCollection = db.collection('short_url')

});

function getRandomInt() {
  const min = Math.ceil(1000);
  const max = Math.floor(1501);
  return Math.floor(Math.random() * (max - min)) + min;
}

app.get('/', function(req, res) {
    res.sendFile( path.join(__dirname + '/views/index.html') )
})

app.get('/:param*', function(request, response) {
    var param = request.url.slice(1);
    var isNumeric = /^(\d+)$/g

    if ( validURL.isUri(param) ) {
        dbCollection.find( { original_url: param } ).toArray(function(err, data) {
            if ( err ) {
                console.error(err)
                response.json( { 'message': "Couldn't insert into database" } )
            } else {
                if ( data.length === 0 ) {
                    var randomInt = getRandomInt()
                    dbCollection.update(
                        {
                            url_id: randomInt
                        },
                        {
                            url_id: randomInt,
                            original_url: param
                        },
                        {
                            'upsert': true
                        },
                        function(err, data) {
                            if ( err ) {
                                console.error(err)
                                response.json( { 'message': "Couldn't insert into database" } )
                            } else {
                                response.json( { 'original_url': param, 'short_url': 'https://blooming-castle-13896.herokuapp.com/' + randomInt } )
                            }
                        }
                    )
                } else {
                    response.json( { 'original_url': param, 'short_url': 'https://blooming-castle-13896.herokuapp.com/' + data[0].url_id } )
                }
            }
        })
    } else {
        if ( isNumeric.exec(param) === null ) {
            response.json( { 'message': "Invalid parameter '" + param + "'" } )
        } else {
            dbCollection.find( { url_id: parseInt(param) } ).toArray(function(err, data) {
                if ( err ) {
                    console.error(err)
                    response.json( { 'message': 'URL not in database' } )
                } else {
                    if ( data.length === 0 )
                        response.json( { 'message': 'URL not in database' } )
                    else
                        response.redirect( data[0].original_url )
                }
            })
        }
    }
})

app.listen(port)
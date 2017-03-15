const express = require('express')
const path = require('path')
const validURL = require('valid-url')
const app = express()

var port = process.env.PORT || 8080

function parseQuery(query) {
    var result = false;
    var isNumeric = /^(\d+)$/g

    if ( isNumeric.exec(query) !== null ) {
        // is numeric
    } else if ( validURL.isUri(query) ) {
        // is a valid url
    }

    return result;
}

app.get('/', function(req, res) {
    res.sendFile( path.join(__dirname + '/views/index.html') )
})

app.get('/:url', function(request, response) {
    const url = request.params.url;

    var result = {
        original_url: null,
        short_url: null
    }

    var error = {
        message: "Invalid URL: " + request.params.url
    }

    var parsedURL = parseQuery(url)
    if ( parsedURL ) {
        
    } else {
        result = error;
    }

    response.setHeader('Content-Type', 'application/json');
    response.send( JSON.stringify(result) )
})

app.listen(port)
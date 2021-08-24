const express = require('express');
const app = express();
const https = require('https');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')    
});

app.post('/', function(req, res) {
    var query = req.body.cityName;
    const apikey = '1dd5a52308a389cd7148fdebcce1214c';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ query +'&appid='+ apikey+ '&units=metric'
        https.get(url, function(response) {
            response.on('data', function(data) {
                const weatherDetail = JSON.parse(data);
                const temp = weatherDetail.main.temp;
                const weatherDescription = weatherDetail.weather[0].description;
                var icon = weatherDetail.weather[0].icon;
                const imageURL = "https://openweathermap.org/img/wn/" + icon +"@2x.png";
                res.write('<h1>The temperatue in '+ req.body.cityName+' is '+ temp + ' degrees Celcius.</h1>');
                res.write('<p>The weather is currently ' + weatherDescription + '</p>');
                res.write('<img src =' + imageURL + '>');
                res.send();
            });
        });
});

app.listen(process.env.PORT ||3000, function() {
    console.log('Server running on port 3000');
});


// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// GET route returns projectData
app.get('/', function (req, res) {
    res.status(200).sendFile('dist/index.html');
});
// endpoint to test
app.get('/test', async (req, res) => {
    res.json({message: 'test passed!'})
  })

// POST route adds data to ProjectData
app.post('/postData', function (req, res) {
    newEntry = {
        place: req.body.place,
        date: req.body.date,
        temperature: req.body.temperature,
        weather: req.body.weather,
        days: req.body.days,
        placeImg: req.body.placeImg
    };
    projectData = newEntry;
    res.send(projectData);
});

module.exports = app
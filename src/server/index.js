/* Setup env for API keys */
const dotenv = require('dotenv');
dotenv.config();

/* setup global variables and initialize express */
const fetch = require("node-fetch");
const express = require('express');
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Spin up the server
const port = 8081;
const server = app.listen(port, listening);

app.get('/', function(req, res) {
    res.sendFile('dist/index.html');
})

// Callback to debug
function listening() {
    console.log(`Server running on localhost: ${port}`);
}


const dotenv = require("dotenv");
dotenv.config();
var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("dist"));

console.log(__dirname);

app.get('/', function(req, res) {
    res.sendFile('dist/index.html');
})

app.listen(8081, function() {
    console.log("App listening on port 8081!")
});

app.post('/getPhoto', (req, res) => {
    const url = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${req.body.city}&image_type=photo`;
    const response = fetch(url)
    try {
        const data = response.json();
        res.send(data);
    } catch(error) {
        console.log("Error", error);
    }
})


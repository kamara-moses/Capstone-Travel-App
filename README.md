## Badges
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description:
The app allows users to create trip plans. When a user submit a city name with trip date, the web page then dispalys destination with its photo and 3-day weather forecast returned from external APIs.

## Technologies:
* HTML
* CSS
* JavaScript
* Node
* Express
* Webpack
* [GeoNames API](http://www.geonames.org/)
* [OpenWeather](https://openweathermap.org/)
* [pixabay](https://pixabay.com/api/docs/#)
* Jest
* supertest
* Workbox

## Table of Contents
* [Description](#description)
* [Technologies](#topics)
* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Test](#test)
* [Challenges](#challenges)
* [Questions](#questions)
* [License](#license)
* [Author](#Author)
* [Badges](#badges)

## Installation
Before installing this application on your local computer, ensure that you have Node installed. This application works in Node. You can go to the following website to download Node: <a href='https://nodejs.org/en/'>Node</a>

    1. Clone the Git repository
        $ git clone <repo>
    2. Navigate to the directory and install the dependencies
        $ npm i
    3. Run webpack.prod.js by typing run build-prod to build a dist folder for production.
    4. To run webpack-dev-server, type npm run build-dev in terminal. 
    5. Once the dev-server is running type npm run start to start the server in the terminal.

## Usage
Once all dependencies have been installed - run the webpack-dev-server to launch the application. The dev server port number is 8080 and the server side port is 8081.

Sign up for API keys at:
* [GeoNames API](http://www.geonames.org/)
* [OpenWeather](https://openweathermap.org/)
* [pixabay](https://pixabay.com/api/docs/#)

Configure environment variables using dotenv package
	1. Install the dotenv package
	```
	npm install dotenv
	```
	2. Create a new `.env` file in the root of your project
	3. Fill the `.env` file with your API keys like this:
	```
	API_KEY=**************************
	username=**************************
	apikey=**************************
	```

## Challenges
This project aims to build a web app using all of the skills I have learned in Nanodegree program.

## Questions
If you have questions about this repository? Please contact me at [kamara.moses@yahoo.com](mailto:kamara.moses@yahoo.com). View more of my work in GitHub at [kamara-moses](https://github.com/kamara-moses).

## License
This repository is licensed under the MIT license.

Copyright (c) [2020] [Moses Kamara]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Author 
![GitHub profile pic](https://avatars3.githubusercontent.com/u/65128951?v=4)
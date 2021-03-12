## Badges
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description:
A travel application that takes the users input and displays weather information for their destination of choice. The application implements a countdown to let the user know how many days they have left until their trip starts.

The application also lets the user know how long their trip is planned for. This is done by getting the depart that and return date from the user. The duration of the trip is calculate using Math.Ceil(subtracts the return date and depart date).

## Technologies:
- Node.js
- Express
- Cors
- Body-Parser
- API
- JavaScript
- Geonames
- Weatherbit
- Pixabay
- Node-Fetch
- Webpack
- Sass
- Loaders


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

    1. Click the green code button.
    2. Copy the repository url
    3. On your terminal navigate to where you want to clone the repo.
    4. Clone the Git repository into that directory by typing into the terminal
        $ git clone <repo>
    5. Navigate to the directory and open the directory in the code editor of your choice.
    6. Install all the dependencies for the application by typing.
        $ npm i - installs all dependencies in the directory

## Usage
Once all dependencies are installed. You can run the application by doing the following:

    1. NPM run build-prod - this build the dist folder that the application is rendered from by webpack
    2. NPM run start - this starts the express server
    3. NPM run build-dev - launch the webpack-dev-server
    4. http://localhost:8080 is the webpack-dev-server and http://localhost:8000 is the express server
    5. The webpack-dev-server and the express server needs to be running at the same time to communicate with each other.


## Contributors
This application is open to anyone who wants to contribute or enhance the application. If you would like to contribute please reach out to me on Github or email.

## Test
There are no automatic test designed for this application. I ran manual test to make sure everything was working the way it should.
    - input information into the zip or city search field and feelings
    - API call will get the data from the openweathermap and display it on the page

If you would like to design an automatic test for this application feel free to reach me on GitHub or Email

## Challenges
The challenge I had with this build was integrating three different API. I had to figure out the best way to integrate which I had to do a lot of research to understand how to do it.

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

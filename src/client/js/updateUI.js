function updateUI(days, img, dest, weather) {
    return `
            <div class="card__image">
                <img src="${img.hits[0].webformatURL}" alt="">
            </div>
            <div class="card__body">
                <div class="card__text">
                    <p>Your Trip To:</p>
                    <h3>${dest.city}, ${dest.country}</h3>
                    <br>
                    <p>Your trip is in ${days.diffInDays} days</p>
                    <br>
                    <p>Dates:</p>
                    <h4>${days.startDate} To ${days.endDate}</h4>
                </div>
                <div class="card__weather">
                <div id="card__weather--title">
                    <p>3-Day Weather Forecast:</p>
                </div>
                <div class="card__weather--icon">
                    <div id="date">${weather.data[0].datetime}</div>
                    <div id="icon"><img src="../media/${weather.data[0].weather.icon}.png" alt="${weather.data[0].weather.description}"></div>
                    <div id="temp">H:${weather.data[0].max_temp}° | L:${weather.data[0].min_temp}°</div>
                    <div id="pop">${weather.data[0].pop}%</div>
                </div>
                <div class="card__weather--icon">
                    <div id="date">${weather.data[1].datetime}</div>
                    <div id="icon"><img src="../media/${weather.data[1].weather.icon}.png" alt="${weather.data[1].weather.description}"></div>
                    <div id="temp">H:${weather.data[1].max_temp}° | L:${weather.data[1].min_temp}°</div>
                    <div id="pop">${weather.data[1].pop}%</div>
                </div>
                <div class="card__weather--icon">
                    <div id="date">${weather.data[2].datetime}</div>
                    <div id="icon"><img src="../media/${weather.data[2].weather.icon}.png" alt="${weather.data[2].weather.description}"></div>
                    <div id="temp">H:${weather.data[2].max_temp}° | L:${weather.data[2].min_temp}°</div>
                    <div id="pop">${weather.data[2].pop}%</div>
                </div>
            </div>`           
}

export { updateUI }
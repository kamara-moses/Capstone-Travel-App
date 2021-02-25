function updateUI(days, img, dest, weather) {
    return `
            <div id="dest_img">
                <img src="${img.hits[0].webformatURL}" alt="">
            </div>
            <div id="dest_countdown">
                in ${days.diffInDays} days
            </div>
            <div id="destination">
                <p>Your Trip To:</p>
                <h3>${dest.city}, ${dest.country}</h3>
            </div>
            <div id="dest_date">
                <p>Dates:</p>
                <h4>${days.startDate} To ${days.endDate}</h4>
            </div>
            <div id="forecast">
                <p>3-Day Weather Forecast:</p>
            </div>

            <div id="dest_weather">
                <div id="card">
                    <div id="date">${weather.data[0].datetime}</div>
                    <div id="icon"><img src="../media/${weather.data[0].weather.icon}.png" alt="${weather.data[0].weather.description}"></div>
                    <div id="temp">H:${weather.data[0].max_temp}° | L:${weather.data[0].min_temp}°</div>
                    <div id="pop">${weather.data[0].pop}%</div>
                </div>
                <div id="card">
                    <div id="date">${weather.data[1].datetime}</div>
                    <div id="icon"><img src="../media/${weather.data[1].weather.icon}.png" alt="${weather.data[1].weather.description}"></div>
                    <div id="temp">H:${weather.data[1].max_temp}° | L:${weather.data[1].min_temp}°</div>
                    <div id="pop">${weather.data[1].pop}%</div>
                </div>
                <div id="card">
                    <div id="date">${weather.data[2].datetime}</div>
                    <div id="icon"><img src="../media/${weather.data[2].weather.icon}.png" alt="${weather.data[2].weather.description}"></div>
                    <div id="temp">H:${weather.data[2].max_temp}° | L:${weather.data[2].min_temp}°</div>
                    <div id="pop">${weather.data[2].pop}%</div>
                </div>
            </div>
            `
}


export { updateUI }
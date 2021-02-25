const handleDate = async() => {
 //calculate how many days till trip departure
    let startDate = document.getElementById('depart').value
    let endDate = document.getElementById('return').value
    let today = new Date()
    let tripStart = new Date(startDate)
    let tripEnd = new Date(endDate)
    let diffInTime = tripStart.getTime() - today.getTime()
    // rounded up to the nearest integer (ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round)
    let diffInDays = Math.round(diffInTime / (1000*3600*24))
    // put dates in object to be accessible from everywhere
    let dates = {startDate, endDate, diffInDays}

    // check if a user enter a valid date
    if(tripStart < today || tripEnd < tripStart) {
        alert('Invalid date: either you select past date as start date or set end date earlier than start date.')
        return
    }

    client.updateUI(dates)
}

export { handleDate }
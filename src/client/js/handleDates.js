function handleDates(startDate, endDate) {
    const today = new Date();
    const depart = new Date(startDate);
    const returnDate = new Date(endDate);
    let isSoon = false;

    const countdown = Math.round((depart.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)); 
    const duration = Math.ceil((returnDate.getTime() - depart.getTime()) / (1000 * 60 * 60 * 24));

    if(countdown < 16) {
        isSoon = true;
    }
    return { depart: startDate, duration: duration, countdown: countdown + 1, isSoon: isSoon};
}

export { handleDates };
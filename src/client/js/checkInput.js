checkInput = (data) => {
    if(data.to == "" || data.from == "") {
        alert("Destinatation field is empty");
        return false;
    }
    else if (data.startDate == "" || data.endDate == "") {
        alert('Please select your dates');
        return false;
    }
    return true;
}

export { checkInput };

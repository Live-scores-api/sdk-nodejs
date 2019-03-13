//function to build the url for the request
const buildUrl = (route, parameters = []) => {
    let url = apiUrl + route;

    const params = new URLSearchParams();
    params.set('key', key);
    params.set('secret', secret);
    parameters.forEach(paramObj => {
        params.set(paramObj.name, paramObj.value);
    });

    url += '?' + params.toString();
    return url;
};


//function to check if country/league/page is integer and > 0
// 0 -> no integer, -1 -> <0, 1 -> correct
const checkCoLePa = (coLePa) => {
    if (!Number.isInteger(coLePa)) {
        return 0;
    } else if (coLePa <= 0) {
        return -1;
    } else {
        return 1
    }
};

// function to check if language is string and if it is from [ar, fa, en, ru]
// 0 => no string, -1 => it's not part of the list, 1 => correct
const checkLanguage = (language) => {
    const languages = ['ar', 'fa', 'ru'];
    if (typeof language !== 'string') {
        return 0;
    } else if (languages.indexOf(language) >= 0) {
        return 1;
    } else {
        return -1;
    }
};

// function to check if the date is in the right format
// 0 => no string, -1 => incorrect date format, 2 => incorrect year, 3 => incorrect month, 4 => incorrect day, 1 => correct date
const checkDate = (date) => {
    if (typeof date !== 'string') {
        return 0;
    }
    dateArray = date.split('-');
    if (dateArray.length == 3) {
        if (dateArray[0].length != 4 && parseInte(dateArray[0], 10) > 1990) {
            return 2;
        } else if (dateArray[1].length != 2 && parseInt(dateArray[1], 10) > 0 && parseInt(dateArray[1], 10) <= 12) {
            return 3;
        } else if (dateArray[2].length != 2 && parseInt(dateArray[2], 10) > 0 && parseInt(dateArray[2], 10) <= 31) {
            return 4;
        }
        return 1;
    } else {
        return -1;
    }
}

module.exports = {
    checkCoLePa,
    checkDate,
    checkLanguage,
    buildUrl
}
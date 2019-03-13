const checkers = require('./../checkers/checkers');

//get history
const getFullHistory = (callback) => {
    request(checkers.buildUrl("scores/history.json"), {
        json: true
    }, (err, res, body) => {
        if (err) {
            return callback(err);
        }

        callback(null, res.body.data.match);
    });
};

//get history from this date onwards   PARAMETER => string (yyyy-mm-dd)
const getHistoryFromDate = (date, callback) => {
    request(checkers.buildUrl('scores/history.json', [{
        name: 'from',
        value: date
    }]), {
        json: true
    }, (err, res, body) => {
        if (err) {
            return callback(err);
        }

        callback(null, res.body.data.match);
    });
};

//get history until this date included    PARAMETER => string (yyyy-mm-dd)
const getHistoryToDate = (date, callback) => {
    request(checkers.buildUrl('scores/history.json', [{
        name: 'to',
        value: date
    }]), {
        json: true
    }, (err, res, body) => {
        if (err) {
            return callback(err);
        }

        callback(null, res.body.data.match);
    });
};

//get history for a certain league    PARAMETER => integer(leagueId)
const getHistoryByLeague = (league, callback) => {
    check = checkers.checkCoLePa(league);
    if (check == 0) {
        return callback(new Error("Incorrect parameter! The league id must be an integer!"));
    } else if (check == -1) {
        return callback(new Error("Incorrect parameter! The league id must be bigger than 0!"));
    } else {
        request(checkers.buildUrl('scores/history.json', [{
            name: 'league',
            value: league
        }]), {
            json: true
        }, (err, res, body) => {
            if (err) {
                return callback(err);
            }

            callback(null, res.body.data.match);
        });
    }
};

//get matches from a cerain page if there are multiple     PARAMETER => integer(pageNo)
const getHistoryFromPage = (page, callback) => {
    check = checkers.checkCoLePa(page);
    if (check == 0) {
        return callback(new Error("Incorrect parameter! The page must be an integer!"));

    } else if (check == -1) {
        return callback(new Error("Incorrect parameter! The page must be bigger than 0!"));
    } else {
        request(checkers.buildUrl('scores/history.json', [{
            name: 'page',
            value: page
        }]), {
            json: true
        }, (err, res, body) => {
            if (err) {
                return callback(err);
            }

            callback(null, res.body.data.match);
        });
    }
};

//get history in a certain language    PARAMETER => string   [ar, fa, en, ru]
const getHistoryInLanguage = (language, callback) => {
    check = checkLanguage(language);
    if (check == 0) {
        return callback(new Error("Incorrect parameter! The language must be a string!"));
    } else if (check == -1) {
        return callback(new Error("Incorrect parameter! The language must be one of the following: [ar, fa, en, ru]!"));
    } else {
        request(checkers.buildUrl('scores/history.json', [{
            name: 'lang',
            value: language
        }]), {
            json: true
        }, (err, res, body) => {
            if (err) {
                return callback(err);
            }

            callback(null, res.body.data.match);
        });
    }
};

// get history between 2 dates from a certain league in a certain language
const GetHistoryBetweendDatesCountryLanguage = (fromDate, toDate, league, language, callback) => {
    checkFromDate = checkers.checkDate(fromDate);
    checkToDate = checkers.checkDate(toDate);
    checkLeague = checkers.checkCoLePa(league);
    checkLanguage = checkers.checkLanguage(language);
    if (checkFromDate == 0 || checkFromDate == -1 || checkToDate == 0 || checkToDate == -1) {
        return callback(new Error("Incorrect parameter! The date must be a string in this format: YYYY-MM-DD!"));
    } else if (checkFromDate == 2 || checkToDate == 2) {
        return callback(new Error("Incorrect parameter! The year must be in this format: YYYY"));

    } else if (checkFromDate == 3 || checkToDate == 3) {
        return callback(new Error("Incorrect parameter! The month must be in this format: MM"));
    } else if (checkFromDate == 4 || checkToDate == 4) {
        return callback(new Error("Incorrect parameter! The day must be in this format: DD"));
    }
    if (checkLanguage == 0) {
        return callback(new Error("Incorrect parameter! The language must be a string!"));
    } else if (checkLanguage == -1) {
        return callback(new Error("Incorrect parameter! The language must be one of the following: [ar, fa, en, ru]!"));
    }
    if (checkLeague == 0) {
        return callback(new Error("Incorrect parameter! The league id must be an integer!"));
    } else if (checkLeague == -1) {
        return callback(new Error("Incorrect parameter! The league id must be bigger than 0!"));
    }
    if (checkLanguage == 1 && checkLeague == 1 && checkFromDate == 1 && checkToDate == 1) {
        request(checkers.buildUrl('scores/history.json', [{
            name: 'from',
            value: fromDate
        }, {
            name: 'to',
            value: toDate
        }, {
            name: 'league',
            value: league
        }, {
            name: 'lang',
            value: language
        }]), {
            json: true
        }, (err, res, body) => {
            if (err) {
                return callback(err);
            }

            callback(null, res.body.data.match);
        });
    }
}

// get history between 2 dates from a certain league
const getHistoryBetweenDatesLeague = (fromDate, toDate, league, callback) => {
    checkFromDate = checkers.checkDate(fromDate);
    checkToDate = checkers.checkDate(toDate);
    checkLeague = checkers.checkCoLePa(league);
    if (checkFromDate == 0 || checkFromDate == -1 || checkToDate == 0 || checkToDate == -1) {
        return callback(new Error("Incorrect parameter! The date must be a string in this format: YYYY-MM-DD!"));
    } else if (checkFromDate == 2 || checkToDate == 2) {
        return callback(new Error("Incorrect parameter! The year must be in this format: YYYY"));

    } else if (checkFromDate == 3 || checkToDate == 3) {
        return callback(new Error("Incorrect parameter! The month must be in this format: MM"));
    } else if (checkFromDate == 4 || checkToDate == 4) {
        return callback(new Error("Incorrect parameter! The day must be in this format: DD"));
    }
    if (checkLeague == 0) {
        return callback(new Error("Incorrect parameter! The league id must be an integer!"));
    } else if (checkLeague == -1) {
        return callback(new Error("Incorrect parameter! The league id must be bigger than 0!"));
    }
    if (checkLeague == 1 && checkFromDate == 1 && checkToDate == 1) {
        request(checkers.buildUrl('scores/history.json', [{
            name: 'from',
            value: fromDate
        }, {
            name: 'to',
            value: toDate
        }, {
            name: 'league',
            value: league
        }]), {
            json: true
        }, (err, res, body) => {
            if (err) {
                return callback(err);
            }

            callback(null, res.body.data.match);
        });
    }
}

// get history between 2 dates in a certain language
const getHistoryBetweenDatesLanguage = (fromDate, toDate, language, callback) => {
    checkFromDate = checkers.checkDate(fromDate);
    checkToDate = checkers.checkDate(toDate);
    checkLanguage = checkers.checkLanguage(language);
    if (checkFromDate == 0 || checkFromDate == -1 || checkToDate == 0 || checkToDate == -1) {
        return {
            success: false,
            message: "Incorrect parameter! The date must be a string in this format: YYYY-MM-DD!"
        };
    } else if (checkFromDate == 2 || checkToDate == 2) {
        return callback(new Error("Incorrect parameter! The year must be in this format: YYYY"));

    } else if (checkFromDate == 3 || checkToDate == 3) {
        return callback(new Error("Incorrect parameter! The month must be in this format: MM"));
    } else if (checkFromDate == 4 || checkToDate == 4) {
        return callback(new Error("Incorrect parameter! The day must be in this format: DD"));
    }
    if (checkLanguage == 0) {
        return callback(new Error("Incorrect parameter! The language must be a string!"));
    } else if (checkLanguage == -1) {
        return callback(new Error("Incorrect parameter! The language must be one of the following: [ar, fa, en, ru]!"));
    }
    if (checkLeague == 1 && checkFromDate == 1 && checkToDate == 1) {
        request(checkers.buildUrl('scores/history.json', [{
            name: 'from',
            value: fromDate
        }, {
            name: 'to',
            value: toDate
        }, {
            name: 'lang',
            value: language
        }]), {
            json: true
        }, (err, res, body) => {
            if (err) {
                return callback(err);
            }

            callback(null, res.body.data.match);
        });
    }
}

//get history starting from a date from a certain league in a certain language
getHistoryFromDateLeagueLanguage = (fromDate, league, language, callback) => {
    checkFromDate = checkers.checkDate(fromDate);
    checkLeague = checkers.checkCoLePa(league);
    checkLanguage = checkers.checkLanguage(language);
    if (checkFromDate == 0 || checkFromDate == -1) {
        return {
            success: false,
            message: "Incorrect parameter! The date must be a string in this format: YYYY-MM-DD!"
        };
    } else if (checkFromDate == 2) {
        return callback(new Error("Incorrect parameter! The year must be in this format: YYYY"));

    } else if (checkFromDate == 3) {
        return callback(new Error("Incorrect parameter! The month must be in this format: MM"));
    } else if (checkFromDate == 4) {
        return callback(new Error("Incorrect parameter! The day must be in this format: DD"));
    }
    if (checkLanguage == 0) {
        return callback(new Error("Incorrect parameter! The language must be a string!"));
    } else if (checkLanguage == -1) {
        return callback(new Error("Incorrect parameter! The language must be one of the following: [ar, fa, en, ru]!"));
    }
    if (checkLeague == 0) {
        return callback(new Error("Incorrect parameter! The league id must be an integer!"));
    } else if (checkLeague == -1) {
        return callback(new Error("Incorrect parameter! The league id must be bigger than 0!"));
    }
    if (checkLanguage == 1 && checkLeague == 1 && checkFromDate == 1) {
        request(checkers.buildUrl('scores/history.json', [{
            name: 'from',
            value: fromDate
        }, {
            name: 'league',
            value: league
        }, {
            name: 'lang',
            value: language
        }]), {
            json: true
        }, (err, res, body) => {
            if (err) {
                return callback(err);
            }

            callback(null, res.body.data.match);
        });
    }
}

// get history until a date from a certain league in a certain language
const getHistoryToDateLeagueLanguage = (toDate, league, language, callback) => {
    checkToDate = checkers.checkDate(fromDate);
    checkLeague = checkers.checkCoLePa(league);
    checkLanguage = checkers.checkLanguage(language);
    if (checkToDate == 0 || checkToDate == -1) {
        return {
            success: false,
            message: "Incorrect parameter! The date must be a string in this format: YYYY-MM-DD!"
        };
    } else if (checkToDate == 2) {
        return callback(new Error("Incorrect parameter! The year must be in this format: YYYY"));

    } else if (checkToDate == 3) {
        return callback(new Error("Incorrect parameter! The month must be in this format: MM"));
    } else if (checkToDate == 4) {
        return callback(new Error("Incorrect parameter! The day must be in this format: DD"));
    }
    if (checkLanguage == 0) {
        return callback(new Error("Incorrect parameter! The language must be a string!"));
    } else if (checkLanguage == -1) {
        return callback(new Error("Incorrect parameter! The language must be one of the following: [ar, fa, en, ru]!"));
    }
    if (checkLeague == 0) {
        return callback(new Error("Incorrect parameter! The league id must be an integer!"));
    } else if (checkLeague == -1) {
        return callback(new Error("Incorrect parameter! The league id must be bigger than 0!"));
    }
    if (checkLanguage == 1 && checkLeague == 1 && checkToDate == 1) {
        request(checkers.buildUrl('scores/history.json', [{
            name: 'to',
            value: toDate
        }, {
            name: 'league',
            value: league
        }, {
            name: 'lang',
            value: language
        }]), {
            json: true
        }, (err, res, body) => {
            if (err) {
                return callback(err);
            }

            callback(null, res.body.data.match);
        });
    }
}

//get history between 2 dates
const getHistoryBetweenDates = (fromDate, toDate, callback) => {
    checkFromDate = checkers.checkDate(fromDate);
    checkToDate = checkers.checkDate(toDate);
    if (checkFromDate == 0 || checkFromDate == -1 || checkToDate == 0 || checkToDate == -1) {
        return {
            success: false,
            message: "Incorrect parameter! The date must be a string in this format: YYYY-MM-DD!"
        };
    } else if (checkFromDate == 2 || checkToDate == 2) {
        return callback(new Error("Incorrect parameter! The year must be in this format: YYYY"));

    } else if (checkFromDate == 3 || checkToDate == 3) {
        return callback(new Error("Incorrect parameter! The month must be in this format: MM"));
    } else if (checkFromDate == 4 || checkToDate == 4) {
        return callback(new Error("Incorrect parameter! The day must be in this format: DD"));
    } else if (checkFromDate == 1 && checkToDate == 1) {
        request(checkers.buildUrl('scores/history.json', [{
            name: 'from',
            value: fromDate
        }, {
            name: 'to',
            value: toDate
        }]), {
            json: true
        }, (err, res, body) => {
            if (err) {
                return callback(err);
            }

            callback(null, res.body.data.match);
        });
    }
}

// get history starting from a date from a certain league
const getHistoryFromDateLeague = (fromDate, league, callback) => {
    checkFromDate = checkers.checkDate(fromDate);
    checkLeague = checkers.checkCoLePa(league);
    if (checkFromDate == 0 || checkFromDate == -1) {
        return {
            success: false,
            message: "Incorrect parameter! The date must be a string in this format: YYYY-MM-DD!"
        };
    } else if (checkFromDate == 2) {
        return callback(new Error("Incorrect parameter! The year must be in this format: YYYY"));

    } else if (checkFromDate == 3) {
        return callback(new Error("Incorrect parameter! The month must be in this format: MM"));
    } else if (checkFromDate == 4) {
        return callback(new Error("Incorrect parameter! The day must be in this format: DD"));
    }
    if (checkLeague == 0) {
        return callback(new Error("Incorrect parameter! The league id must be an integer!"));
    } else if (checkLeague == -1) {
        return callback(new Error("Incorrect parameter! The league id must be bigger than 0!"));
    }
    if (checkLeague == 1 && checkFromDate == 1) {
        request(checkers.buildUrl('scores/history.json', [{
            name: 'from',
            value: fromDate
        }, {
            name: 'league',
            value: league
        }]), {
            json: true
        }, (err, res, body) => {
            if (err) {
                return callback(err);
            }

            callback(null, res.body.data.match);
        });
    }
}

//get history starting from a date in a certain language
const getHistoryFromDateLanguage = (fromDate, languge, callback) => {
    checkFromDate = checkers.checkDate(fromDate);
    checkLanguage = checkers.checkLanguage(languge);
    if (checkFromDate == 0 || checkFromDate == -1) {
        return {
            success: false,
            message: "Incorrect parameter! The date must be a string in this format: YYYY-MM-DD!"
        };
    } else if (checkFromDate == 2) {
        return callback(new Error("Incorrect parameter! The year must be in this format: YYYY"));

    } else if (checkFromDate == 3) {
        return callback(new Error("Incorrect parameter! The month must be in this format: MM"));
    } else if (checkFromDate == 4) {
        return callback(new Error("Incorrect parameter! The day must be in this format: DD"));
    }
    if (checkLanguage == 0) {
        return callback(new Error("Incorrect parameter! The language must be a string!"));
    } else if (checkLanguage == -1) {
        return callback(new Error("Incorrect parameter! The language must be one of the following: [ar, fa, en, ru]!"));
    }
    if (checkLanguage == 1 && checkFromDate == 1) {
        request(checkers.buildUrl('scores/history.json', [{
            name: 'from',
            value: fromDate
        }, {
            name: 'lang',
            value: language
        }]), {
            json: true
        }, (err, res, body) => {
            if (err) {
                return callback(err);
            }

            callback(null, res.body.data.match);
        });
    }
}

//get history until a date from a certain league
const getHistoryToDateLeague = (toDate, league, callback) => {
    checkToDate = checkers.checkDate(fromDate);
    checkLeague = checkers.checkCoLePa(league);
    if (checkToDate == 0 || checkToDate == -1) {
        return {
            success: false,
            message: "Incorrect parameter! The date must be a string in this format: YYYY-MM-DD!"
        };
    } else if (checkToDate == 2) {
        return callback(new Error("Incorrect parameter! The year must be in this format: YYYY"));

    } else if (checkToDate == 3) {
        return callback(new Error("Incorrect parameter! The month must be in this format: MM"));
    } else if (checkToDate == 4) {
        return callback(new Error("Incorrect parameter! The day must be in this format: DD"));
    }
    if (checkLeague == 0) {
        return callback(new Error("Incorrect parameter! The league id must be an integer!"));
    } else if (checkLeague == -1) {
        return callback(new Error("Incorrect parameter! The league id must be bigger than 0!"));
    }
    if (checkLeague == 1 && checkToDate == 1) {
        request(checkers.buildUrl('scores/history.json', [{
            name: 'to',
            value: toDate
        }, {
            name: 'league',
            value: league
        }]), {
            json: true
        }, (err, res, body) => {
            if (err) {
                return callback(err);
            }

            callback(null, res.body.data.match);
        });
    }
}

// get history until a date in a certain language
const getHistoryToDateLanguage = (toDate, language, callback) => {
    checkToDate = checkers.checkDate(fromDate);
    checkLanguage = checkers.checkLanguage(language);
    if (checkToDate == 0 || checkToDate == -1) {
        return {
            success: false,
            message: "Incorrect parameter! The date must be a string in this format: YYYY-MM-DD!"
        };
    } else if (checkToDate == 2) {
        return callback(new Error("Incorrect parameter! The year must be in this format: YYYY"));

    } else if (checkToDate == 3) {
        return callback(new Error("Incorrect parameter! The month must be in this format: MM"));
    } else if (checkToDate == 4) {
        return callback(new Error("Incorrect parameter! The day must be in this format: DD"));
    }
    if (checkLanguage == 0) {
        return callback(new Error("Incorrect parameter! The language must be a string!"));
    } else if (checkLanguage == -1) {
        return callback(new Error("Incorrect parameter! The language must be one of the following: [ar, fa, en, ru]!"));
    }
    if (checkLanguage == 1 && checkToDate == 1) {
        request(checkers.buildUrl('scores/history.json', [{
            name: 'to',
            value: toDate
        }, {
            name: 'lang',
            value: language
        }]), {
            json: true
        }, (err, res, body) => {
            if (err) {
                return callback(err);
            }

            callback(null, res.body.data.match);
        });
    }
}

// get history from a league in a certain language
getHistoryLeagueLanguage = (league, language, callback) => {
    checkLeague = checkers.checkCoLePa(league);
    checkLanguage = checkers.checkLanguage(language);
    if (checkLanguage == 0) {
        return callback(new Error("Incorrect parameter! The language must be a string!"));
    } else if (checkLanguage == -1) {
        return callback(new Error("Incorrect parameter! The language must be one of the following: [ar, fa, en, ru]!"));
    }
    if (checkLeague == 0) {
        return callback(new Error("Incorrect parameter! The league id must be an integer!"));
    } else if (checkLeague == -1) {
        return callback(new Error("Incorrect parameter! The league id must be bigger than 0!"));
    }
    if (checkLanguage == 1 && checkLeague == 1) {
        request(checkers.buildUrl('scores/history.json', [{
            name: 'league',
            value: league
        }, {
            name: 'lang',
            value: language
        }]), {
            json: true
        }, (err, res, body) => {
            if (err) {
                return callback(err);
            }

            callback(null, res.body.data.match);
        });
    }
}

module.exports = {
    getFullHistory,
    getHistoryFromDate,
    getHistoryBetweenDates,
    getHistoryBetweenDatesLanguage,
    getHistoryBetweenDatesLeague,
    getHistoryByLeague,
    getHistoryFromDate,
    getHistoryFromDateLanguage,
    getHistoryFromDateLeague,
    getHistoryFromDateLeagueLanguage,
    getHistoryFromPage,
    getHistoryInLanguage,
    getHistoryLeagueLanguage,
    getHistoryToDate,
    getHistoryToDateLanguage,
    getHistoryToDateLeague,
    getHistoryToDateLeagueLanguage,
    GetHistoryBetweendDatesCountryLanguage,
}
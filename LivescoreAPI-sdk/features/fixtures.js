const checkers = require('./../checkers/checkers');

//get all fixtures 
const getAllFixtures = (callback) => {
    request(checkers.buildUrl('fixtures/matches.json'), {
        json: true
    }, (err, res, body) => {
        if (err) {
            return callback(err);
        }

        callback(res.body.data.fixtures);;
    });
};

//get fixtures from a certain date      PARAMETER => string (yyyy-mm-dd)
const getFixturesFromDate = (date, callback) => {
    check = checkers.checkDate(date);
    if (check == 0 || check == -1) {
        return callback(new Error("Incorrect parameter! The date must be a string in this format: YYYY-MM-DD!"));
    } else if (check == 2) {
        return callback(new Error("Incorrect parameter! The year must be in this format: YYYY"));
    } else if (check == 3) {
        return callback(new Error("Incorrect parameter! The month must be in this format: MM"));
    } else if (check == 4) {
        return callback(new Error("Incorrect parameter! The day must be in this format: DD"));
    }
    request(checkers.buildUrl('fixtures/matches.json', [{
        name: 'date',
        value: date
    }]), {
        json: true
    }, (err, res, body) => {
        if (err) {
            return callback(err);
        }

        callback(null, res.body.data.fixtures);
    });
};

//get fixtures from a certain league    PARAMETER => integer(leagueId)
const getFixturesFromLeague = (league, callback) => {
    check = checkers.checkCoLePa(league);
    if (check == 0) {
        return callback(new Error("Incorrect parameter! The league id must be an integer!"));
    } else if (check == -1) {
        return callback(new Error("Incorrect parameter! The league id must be bigger than 0!"));
    } else {
        request(checkers.buildUrl('fixtures/matches.json', [{
            name: 'league',
            value: league
        }]), {
            json: true
        }, (err, res, body) => {
            if (err) {
                return callback(err);
            }

            callback(null, res.body.data.fixtures);
        });
    }
};

//get fixtures in a certain language    PARAMETER => string     [ar, fa, en, ru] 
const getFixturesInLanguage = (language, callback) => {
    check = checkers.checkLanguage(language);
    if (check == 0) {
        return callback(new Error("Incorrect parameter! The language must be a string!"));
    } else if (check == -1) {
        return callback(new Error("Incorrect parameter! The language must be one of the following: [ar, fa, en, ru]!"));
    } else {
        request(checkers.buildUrl('fixtures/matches.json', [{
            name: 'lang',
            value: language
        }]), {
            json: true
        }, (err, res, body) => {
            if (err) {
                return callback(err);
            }

            callback(null, res.body.data.fixtures);
        });
    }
};

//get fixtures from a certain page      PARAMETER => integer
const getFixturesFromPage = (page, callback) => {
    check = checkers.checkCoLePa(page);
    if (check == 0) {
        return callback(new Error("Incorrect parameter! The page must be an integer!"));
    } else if (check == -1) {
        return callback(new Error("Incorrect parameter! The page must be bigger than 0!"));
    } else {
        request(checkers.buildUrl('fixtures/matches.json', [{
            name: 'page',
            value: page
        }]), {
            json: true
        }, (err, res, body) => {
            if (err) {
                return callback(err);
            }

            callback(null, res.body.data.fixtures);
        });
    }
};

//get fixtures from a date, in a certain language from a certain league
const getFixturesDateLanguageLeague = (date, language, league, callback) => {
    checkLanguage = checkers.checkLanguage(language);
    checkLeague = checkers.checkCoLePa(league);
    checkDate = checkers.checkDate(date);
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
    if (checkDate == 0 || checkDate == -1) {
        return callback(new Error("Incorrect parameter! The date must be a string in this format: YYYY-MM-DD!"));
    } else if (checkDate == 2) {
        return callback(new Error("Incorrect parameter! The year must be in this format: YYYY"));
    } else if (checkDate == 3) {
        return callback(new Error("Incorrect parameter! The month must be in this format: MM"));
    } else if (checkDate == 4) {
        return callback(new Error("Incorrect parameter! The day must be in this format: DD"));
    }
    if (checkDate == 1 && checkLanguage == 1 && checkLeague == 1) {
        request(checkers.buildUrl('fixtures/matches.json', [{
            name: 'date',
            value: date
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

            callback(null, res.body.data.fixtures);
        });
    }
}

// get fixtures from a date in a certain language
const getFixturesDateLanguage = (date, language, callback) => {
    checkLanguage = checkers.checkLanguage(language);
    checkDate = checkers.checkDate(date);
    if (checkLanguage == 0) {
        return callback(new Error("Incorrect parameter! The language must be a string!"));
    } else if (checkLanguage == -1) {
        return callback(new Error("Incorrect parameter! The language must be one of the following: [ar, fa, en, ru]!"));
    }
    if (checkDate == 0 || checkDate == -1) {
        return callback(new Error("Incorrect parameter! The date must be a string in this format: YYYY-MM-DD!"));
    } else if (checkDate == 2) {
        return callback(new Error("Incorrect parameter! The year must be in this format: YYYY"));
    } else if (checkDate == 3) {
        return callback(new Error("Incorrect parameter! The month must be in this format: MM"));
    } else if (checkDate == 4) {
        return callback(new Error("Incorrect parameter! The day must be in this format: DD"));
    }
    if (checkDate == 1 && checkLanguage == 1) {
        request(checkers.buildUrl('fixtures/matches.json', [{
            name: 'date',
            value: date
        }, {
            name: 'lang',
            value: language
        }]), {
            json: true
        }, (err, res, body) => {
            if (err) {
                return callback(err);
            }

            callback(null, res.body.data.fixtures);
        });
    }
}

// get fixtures from a date from a certain league
const getFixturesDateLeague = (date, league) => {
    checkLeague = checkers.checkCoLePa(league);
    checkDate = checkers.checkDate(date);
    if (checkLeague == 0) {
        return callback(new Error("Incorrect parameter! The league id must be an integer!"));
    } else if (checkLeague == -1) {
        return callback(new Error("Incorrect parameter! The league id must be bigger than 0!"));
    }
    if (checkDate == 0 || checkDate == -1) {
        return callback(new Error("Incorrect parameter! The date must be a string in this format: YYYY-MM-DD!"));
    } else if (checkDate == 2) {
        return callback(new Error("Incorrect parameter! The year must be in this format: YYYY"));
    } else if (checkDate == 3) {
        return callback(new Error("Incorrect parameter! The month must be in this format: MM"));
    } else if (checkDate == 4) {
        return callback(new Error("Incorrect parameter! The day must be in this format: DD"));
    }
    if (checkDate == 1 && checkLeague == 1) {
        request(checkers.buildUrl('fixtures/matches.json', [{
            name: 'date',
            value: date
        }, {
            name: 'league',
            value: league
        }]), {
            json: true
        }, (err, res, body) => {
            if (err) {
                return callback(err);
            }

            callback(null, res.body.data.fixtures);
        });
    }
}

// get fixtures from a certain league in a certain language
const getFixturesLeagueLanguage = (league, language, callback) => {
    checkLanguage = checkers.checkLanguage(language);
    checkLeague = checkers.checkCoLePa(league);
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
        request(checkers.buildUrl('fixtures/matches.json', [{
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
            callback(null, res.body.data.fixtures);
        });
    }
}

module.exports = {
    getAllFixtures,
    getFixturesDateLanguage,
    getFixturesDateLanguageLeague,
    getFixturesDateLeague,
    getFixturesFromDate,
    getFixturesFromPage,
    getFixturesFromLeague,
    getFixturesInLanguage,
    getFixturesLeagueLanguage
}
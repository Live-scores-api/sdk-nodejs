const checkers = require('./../checkers/checkers');

//get livescores
const getAllLiveScores = (callback) => {
    request(checkers.buildUrl('scores/live.json'), {
        json: true
    }, (err, res, body) => {
        if (err) {
            return callback(err);
        }

        callback(null, res.body.data.match);
    });
};


//get livescores from a certain country  PARAMETER => integer(countryId)
const getLiveScoresByCountry = (country, callback) => {
    check = checkers.checkCoLePa(country);
    if (check == 0) {
        return callback(new Error("Incorrect parameter! The country id must be an integer!"));
    } else if (check == -1) {
        return callback(new Error("Incorrect parameter! The country id must be bigger than 0!"));
    } else {
        request(checkers.buildUrl('scores/live.json', [{
            name: 'country',
            value: country
        }]), (err, res, body) => {
            if (err) {
                return callback(err);
            }

            callback(null, res.body.data.match);
        });
    }
};

//get livescores from a certain league   PARAMETER => integer(leagueId)
const getLiveScoresByLeague = (league, callback) => {
    check = checkers.checkCoLePa(league);
    if (check == 0) {
        return callback(new Error("Incorrect parameter! The league id must be an integer!"));
    } else if (check == -1) {
        return callback(new Error("Incorrect parameter! The league id must be bigger than 0!"));
    } else {
        request(checkers.buildUrl('scores/live.json', [{
            name: 'league',
            value: league
        }]), (err, res, body) => {
            if (err) {
                return callback(err);
            }

            callback(null, res.body.data.match);
        });
    }
};

//get livescores in a certain language   PARAMETER => string     [ar, fa, en, ru]
const getLiveScoresInLanguage = (language, callback) => {
    check = checkers.checkLanguage(language);
    if (check == 0) {
        return callback(new Error("Incorrect parameter! The language must be a string!"));
    } else if (check == -1) {
        return callback(new Error("Incorrect parameter! The language must be one of the following: [ar, fa, en, ru]!"));
    } else {
        request(checkers.buildUrl('scores/live.json', [{
            name: 'lang',
            value: language
        }]), (err, res, body) => {
            if (err) {
                return callback(err);
            }

            callback(null, res.body.data.match);
        });
    }
};

//get livescores from a certain country, from a certain league in a certain language
const getLiveScoresCountryLeagueLanguage = (country, league, language, callback) => {
    checkCountry = checkers.checkCoLePa(country);
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
    if (checkCountry == 0) {
        return callback(new Error("Incorrect parameter! The country id must be an integer!"));
    } else if (checkLeague == -1) {
        return callback(new Error("Incorrect parameter! The country id must be bigger than 0!"));
    }
    if (checkCountry == 1 && checkLeague == 1 && checkLanguage == 1) {
        request(checkers.buildUrl('scores/live.json', [{
            name: 'country',
            value: country
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
                return callback(err)
            }

            callback(null, res.body.data.match);
        });
    }
}

// get livescores from a certain country in a certain language
const getLiveScoresCountryLanguage = (country, language, callback) => {
    checkCountry = checkers.checkCoLePa(country);
    checkLanguage = checkers.checkLanguage(language);
    if (checkLanguage == 0) {
        return callback(new Error("Incorrect parameter! The language must be a string!"));
    } else if (checkLanguage == -1) {
        return callback(new Error("Incorrect parameter! The language must be one of the following: [ar, fa, en, ru]!"));
    }
    if (checkCountry == 0) {
        return callback(new Error("Incorrect parameter! The country id must be an integer!"));
    } else if (checkLeague == -1) {
        return callback(new Error("Incorrect parameter! The country id must be bigger than 0!"));
    }
    if (checkCountry == 1 && checkLanguage == 1) {
        request(checkers.buildUrl('scores/live.json', [{
            name: 'country',
            value: country
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

// get livescores from a certain league in a certain country
const getLiveScoresCountryLeague = (country, league, callback) => {
    checkCountry = checkers.checkCoLePa(country);
    checkLeague = checkers.checkCoLePa(league);
    if (checkCountry == 0) {
        return callback(new Error("Incorrect parameter! The country id must be an integer!"));
    } else if (checkLeague == -1) {
        return callback(new Error("Incorrect parameter! The country id must be bigger than 0!"));
    }
    if (checkLeague == 0) {
        return callback(new Error("Incorrect parameter! The league id must be an integer!"));
    } else if (checkLeague == -1) {
        return callback(new Error("Incorrect parameter! The league id must be bigger than 0!"));
    }
    if (checkCountry == 1 && checkLeague == 1) {
        request(checkers.buildUrl('scores/live.json', [{
            name: 'country',
            value: country
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

// get livescores from a certain league in a certain language
const getLiveScoresLeagueLanguage = (league, language, callback) => {
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
    if (checkLeague == 1 && checkLanguage == 1) {
        request(checkers.buildUrl('scores/live.json', [{
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
    getAllLiveScores,
    getLiveScoresByCountry,
    getLiveScoresByLeague,
    getLiveScoresCountryLanguage,
    getLiveScoresCountryLeagueLanguage,
    getLiveScoresInLanguage,
    getLiveScoresLeagueLanguage,
    getLiveScoresCountryLeague,
}
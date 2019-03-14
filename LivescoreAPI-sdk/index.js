const request = require('request');
// const fixtures = require('./features/fixtures');
// const leagues = require('./features/leagues');
// const countries = require('./features/countries');
// const livescores = require('./features/livescores');
// const history = require('./features/history');
// const checkers = require('./checkers/checkers');

const apiUrl = 'http://livescore-api.com/api-client/';
let key = '';
let secret = '';

function LivescoreAPI (key, secret, apiUrl){
    this.apiUrl = apiUrl;
    this.key = key;
    this.secret = secret;

    this.setKeySecret = (inputKey, inputSecret) => {
        this.key = inputKey;
        this.secret = inputSecret;
    };
    
    //function to build the url for the request
    this.buildUrl = (route, parameters = []) => {
        let url = apiUrl + route;

        const params = new URLSearchParams();
        params.set('key', key);
        params.set('secret', secret);
        parameters.forEach(paramObj => {
            params.set(paramObj.name, paramObj.value);
        });

        url += '?' + params.toString();
        return url;
    }

    //check api key and secret
    this.checkKeySecret = () => {
        request(checkers.buildUrl('users/pair.json'), {
            json: true
        }, (err, res, body) => {
            if (err) {
                throw err;
            }
            return res.body.data.message;
        });
    };

    //function to check if country/league/page is integer and > 0
    // 0 -> no integer, -1 -> <0, 1 -> correct
    this.checkCoLePa = (coLePa) => {
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
    this.checkLanguage = (language) => {
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
    this.checkDate = (date) => {
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

    //get countries 
    this.getAllCountries = (callback) => {
        request(this.buildUrl("countries/list.json"), {
            json: true
        }, (err, res, body) => {
            if (err) {
                return callback(err);
            }
            callback(null, res.body.data.country);
        });
    };

    //get all fixtures 
    this.getAllFixtures = (callback) => {
        request(this.buildUrl('fixtures/matches.json'), {
            json: true
        }, (err, res, body) => {
            if (err) {
                return callback(err);
            }
            callback(res.body.data.fixtures);;
        });
    };

    //get fixtures from a certain date      PARAMETER => string (yyyy-mm-dd)
    this.getFixturesFromDate = (date, callback) => {
        check = this.checkDate(date);
        if (check == 0 || check == -1) {
            return callback(new Error("Incorrect parameter! The date must be a string in this format: YYYY-MM-DD!"));
        } else if (check == 2) {
            return callback(new Error("Incorrect parameter! The year must be in this format: YYYY"));
        } else if (check == 3) {
            return callback(new Error("Incorrect parameter! The month must be in this format: MM"));
        } else if (check == 4) {
            return callback(new Error("Incorrect parameter! The day must be in this format: DD"));
        }
        request(this.buildUrl('fixtures/matches.json', [{
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
    this.getFixturesFromLeague = (league, callback) => {
        check = this.checkCoLePa(league);
        if (check == 0) {
            return callback(new Error("Incorrect parameter! The league id must be an integer!"));
        } else if (check == -1) {
            return callback(new Error("Incorrect parameter! The league id must be bigger than 0!"));
        } else {
            request(this.buildUrl('fixtures/matches.json', [{
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
    this.getFixturesInLanguage = (language, callback) => {
        check = this.checkLanguage(language);
        if (check == 0) {
            return callback(new Error("Incorrect parameter! The language must be a string!"));
        } else if (check == -1) {
            return callback(new Error("Incorrect parameter! The language must be one of the following: [ar, fa, en, ru]!"));
        } else {
            request(this.buildUrl('fixtures/matches.json', [{
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
    this.getFixturesFromPage = (page, callback) => {
        check = this.checkCoLePa(page);
        if (check == 0) {
            return callback(new Error("Incorrect parameter! The page must be an integer!"));
        } else if (check == -1) {
            return callback(new Error("Incorrect parameter! The page must be bigger than 0!"));
        } else {
            request(this.buildUrl('fixtures/matches.json', [{
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
    this.getFixturesDateLanguageLeague = (date, language, league, callback) => {
        checkLanguage = this.checkLanguage(language);
        checkLeague = this.checkCoLePa(league);
        checkDate = this.checkDate(date);
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
            request(this.buildUrl('fixtures/matches.json', [{
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
    this.getFixturesDateLanguage = (date, language, callback) => {
        checkLanguage = this.checkLanguage(language);
        checkDate = this.checkDate(date);
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
            request(this.buildUrl('fixtures/matches.json', [{
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
    this.getFixturesDateLeague = (date, league, callback) => {
        checkLeague = this.checkCoLePa(league);
        checkDate = this.checkDate(date);
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
            request(this.buildUrl('fixtures/matches.json', [{
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
    this.getFixturesLeagueLanguage = (league, language, callback) => {
        checkLanguage = this.checkLanguage(language);
        checkLeague = this.checkCoLePa(league);
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
            request(this.buildUrl('fixtures/matches.json', [{
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

    //get history
    this.getFullHistory = (callback) => {
        request(this.buildUrl("scores/history.json"), {
            json: true
        }, (err, res, body) => {
            if (err) {
                return callback(err);
            }

            callback(null, res.body.data.match);
        });
    };

    //get history from this date onwards   PARAMETER => string (yyyy-mm-dd)
    this.getHistoryFromDate = (date, callback) => {
        request(this.buildUrl('scores/history.json', [{
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
    this.getHistoryToDate = (date, callback) => {
        request(this.buildUrl('scores/history.json', [{
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
    this.getHistoryByLeague = (league, callback) => {
        check = this.checkCoLePa(league);
        if (check == 0) {
            return callback(new Error("Incorrect parameter! The league id must be an integer!"));
        } else if (check == -1) {
            return callback(new Error("Incorrect parameter! The league id must be bigger than 0!"));
        } else {
            request(this.buildUrl('scores/history.json', [{
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
    this.getHistoryFromPage = (page, callback) => {
        check = this.checkCoLePa(page);
        if (check == 0) {
            return callback(new Error("Incorrect parameter! The page must be an integer!"));

        } else if (check == -1) {
            return callback(new Error("Incorrect parameter! The page must be bigger than 0!"));
        } else {
            request(this.buildUrl('scores/history.json', [{
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
    this.getHistoryInLanguage = (language, callback) => {
        check = this.checkLanguage(language);
        if (check == 0) {
            return callback(new Error("Incorrect parameter! The language must be a string!"));
        } else if (check == -1) {
            return callback(new Error("Incorrect parameter! The language must be one of the following: [ar, fa, en, ru]!"));
        } else {
            request(this.buildUrl('scores/history.json', [{
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
    this.GetHistoryBetweendDatesCountryLanguage = (fromDate, toDate, league, language, callback) => {
        checkFromDate = this.checkDate(fromDate);
        checkToDate = this.checkDate(toDate);
        checkLeague = this.checkCoLePa(league);
        checkLanguage = this.checkLanguage(language);
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
            request(this.buildUrl('scores/history.json', [{
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
    this.getHistoryBetweenDatesLeague = (fromDate, toDate, league, callback) => {
        checkFromDate = this.checkDate(fromDate);
        checkToDate = this.checkDate(toDate);
        checkLeague = this.checkCoLePa(league);
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
            request(this.buildUrl('scores/history.json', [{
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
    this.getHistoryBetweenDatesLanguage = (fromDate, toDate, language, callback) => {
        checkFromDate = this.checkDate(fromDate);
        checkToDate = this.checkDate(toDate);
        checkLanguage = this.checkLanguage(language);
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
        if (checkLanguage == 1 && checkFromDate == 1 && checkToDate == 1) {
            request(this.buildUrl('scores/history.json', [{
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
    this.getHistoryFromDateLeagueLanguage = (fromDate, league, language, callback) => {
        checkFromDate = this.checkDate(fromDate);
        checkLeague = this.checkCoLePa(league);
        checkLanguage = this.checkLanguage(language);
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
            request(this.buildUrl('scores/history.json', [{
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
    this.getHistoryToDateLeagueLanguage = (toDate, league, language, callback) => {
        checkToDate = this.checkDate(toDate);
        checkLeague = this.checkCoLePa(league);
        checkLanguage = this.checkLanguage(language);
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
            request(this.buildUrl('scores/history.json', [{
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
    this.getHistoryBetweenDates = (fromDate, toDate, callback) => {
        checkFromDate = this.checkDate(fromDate);
        checkToDate = this.checkDate(toDate);
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
            request(this.buildUrl('scores/history.json', [{
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
    this.getHistoryFromDateLeague = (fromDate, league, callback) => {
        checkFromDate = this.checkDate(fromDate);
        checkLeague = this.checkCoLePa(league);
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
            request(this.buildUrl('scores/history.json', [{
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
    this.getHistoryFromDateLanguage = (fromDate, language, callback) => {
        checkFromDate = this.checkDate(fromDate);
        checkLanguage = this.checkLanguage(language);
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
            request(this.buildUrl('scores/history.json', [{
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
    this.getHistoryToDateLeague = (toDate, league, callback) => {
        checkToDate = this.checkDate(toDate);
        checkLeague = this.checkCoLePa(league);
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
            request(this.buildUrl('scores/history.json', [{
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
    this.getHistoryToDateLanguage = (toDate, language, callback) => {
        checkToDate = this.checkDate(toDate);
        checkLanguage = this.checkLanguage(language);
        if (checkToDate == 0 || checkToDate == -1) {
            return callback(new Error("Incorrect parameter! The date must be a string in this format: YYYY-MM-DD!"));
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
            request(this.buildUrl('scores/history.json', [{
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
    this.getHistoryLeagueLanguage = (league, language, callback) => {
        checkLeague = this.checkCoLePa(league);
        checkLanguage = this.checkLanguage(language);
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
            request(this.buildUrl('scores/history.json', [{
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

    //get leagues
    this.getAllLeagues = (callback) => {
        request(this.buildUrl('leagues/list.json'), {
            json: true
        }, (err, res, body) => {
            if (err) {
                return callback(err);
            }

            callback(null, res.body.data.league);
        });
    };

    //get leagues with fixtures
    this.getLeaguesWithFixtures = (callback) => {
        request(this.buildUrl('fixtures/leagues.json'), {
            json: true
        }, (err, res, body) => {
            if (err) {
                return callback(err);
            }

            callback(null, res.body.data.leagues);
        })
    }

    //get leagues from a certain country     PARAMETER => integer(countryId)
    this.getLeaguesFromCountry = (country, callback) => {
        check = this.checkCoLePa(country);
        if (check == 0) {
            return callback(new Error("Incorrect parameter! The country id must be an integer!"));
        } else if (check == -1) {
            return callback(new Error("Incorrect parameter! The country id must be bigger than 0!"));
        } else if (check == 1) {
            request(this.buildUrl("leagues/list.json", [{
                name: 'country',
                value: country
            }]), {
                json: true
            }, (err, res, body) => {
                if (err) {
                    return callback(err);
                }

                callback(null, res.body.data.league);
            });
        }
    };

    //get livescores
    this.getAllLiveScores = (callback) => {
        request(this.buildUrl('scores/live.json'), {
            json: true
        }, (err, res, body) => {
            if (err) {
                return callback(err);
            }

            callback(null, res.body.data.match);
        });
    };


    //get livescores from a certain country  PARAMETER => integer(countryId)
    this.getLiveScoresByCountry = (country, callback) => {
        check = this.checkCoLePa(country);
        if (check == 0) {
            return callback(new Error("Incorrect parameter! The country id must be an integer!"));
        } else if (check == -1) {
            return callback(new Error("Incorrect parameter! The country id must be bigger than 0!"));
        } else {
            request(this.buildUrl('scores/live.json', [{
                name: 'country',
                value: country
            }]), {json: true}, (err, res, body) => {
                if (err) {
                    return callback(err);
                }

                callback(null, res.body.data.match);
            });
        }
    };

    //get livescores from a certain league   PARAMETER => integer(leagueId)
    this.getLiveScoresByLeague = (league, callback) => {
        check = this.checkCoLePa(league);
        if (check == 0) {
            return callback(new Error("Incorrect parameter! The league id must be an integer!"));
        } else if (check == -1) {
            return callback(new Error("Incorrect parameter! The league id must be bigger than 0!"));
        } else {
            request(this.buildUrl('scores/live.json', [{
                name: 'league',
                value: league
            }]), {json: true}, (err, res, body) => {
                if (err) {
                    return callback(err);
                }

                callback(null, res.body.data.match);
            });
        }
    };

    //get livescores in a certain language   PARAMETER => string     [ar, fa, en, ru]
    this.getLiveScoresInLanguage = (language, callback) => {
        check = this.checkLanguage(language);
        if (check == 0) {
            return callback(new Error("Incorrect parameter! The language must be a string!"));
        } else if (check == -1) {
            return callback(new Error("Incorrect parameter! The language must be one of the following: [ar, fa, en, ru]!"));
        } else {
            request(this.buildUrl('scores/live.json', [{
                name: 'lang',
                value: language
            }]), {json: true}, (err, res, body) => {
                if (err) {
                    return callback(err);
                }
                callback(null, res.body.data.match);
            });
        }
    };

    //get livescores from a certain country, from a certain league in a certain language
    this.getLiveScoresCountryLeagueLanguage = (country, league, language, callback) => {
        checkCountry = this.checkCoLePa(country);
        checkLeague = this.checkCoLePa(league);
        checkLanguage = this.checkLanguage(language);
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
            request(this.buildUrl('scores/live.json', [{
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
    this.getLiveScoresCountryLanguage = (country, language, callback) => {
        checkCountry = this.checkCoLePa(country);
        checkLanguage = this.checkLanguage(language);
        if (checkLanguage == 0) {
            return callback(new Error("Incorrect parameter! The language must be a string!"));
        } else if (checkLanguage == -1) {
            return callback(new Error("Incorrect parameter! The language must be one of the following: [ar, fa, en, ru]!"));
        }
        if (checkCountry == 0) {
            return callback(new Error("Incorrect parameter! The country id must be an integer!"));
        } else if (checkCountry == -1) {
            return callback(new Error("Incorrect parameter! The country id must be bigger than 0!"));
        }
        if (checkCountry == 1 && checkLanguage == 1) {
            request(this.buildUrl('scores/live.json', [{
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
    this.getLiveScoresCountryLeague = (country, league, callback) => {
        checkCountry = this.checkCoLePa(country);
        checkLeague = this.checkCoLePa(league);
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
            request(this.buildUrl('scores/live.json', [{
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
    this.getLiveScoresLeagueLanguage = (league, language, callback) => {
        checkLeague = this.checkCoLePa(league);
        checkLanguage = this.checkLanguage(language);
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
            request(this.buildUrl('scores/live.json', [{
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

    // this.getLiveScoresCountryLanguage = livescores.getLiveScoresCountryLanguage;

    return this;
}

module.exports = {
    LivescoreAPI   
}
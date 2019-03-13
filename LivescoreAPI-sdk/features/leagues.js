const checkers = require('./../checkers/checkers');

//get leagues
const getAllLeagues = (callback) => {
    request(checkers.buildUrl('leagues/list.json'), {
        json: true
    }, (err, res, body) => {
        if (err) {
            return callback(err);
        }

        callback(null, res.body.data.league);
    });
};

//get leagues with fixtures
const getLeaguesWithFixtures = (callback) => {
    request(checkers.buildUrl('fixtures/leagues.json'), {
        json: true
    }, (err, res, body) => {
        if (err) {
            return callback(err);
        }

        callback(null, res.body.data.leagues);
    })
}


//get leagues from a certain country     PARAMETER => integer(countryId)
const getLeaguesFromCountry = (country, callback) => {
    check = checkers.checkCoLePa(country);
    if (check == 0) {
        return callback(new Error("Incorrect parameter! The country id must be an integer!"));
    } else if (check == -1) {
        return callback(new Error("Incorrect parameter! The country id must be bigger than 0!"));
    } else if (check == 1) {
        request(checkers.buildUrl("leagues/list.json", [{
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

module.exports = {
    getAllLeagues,
    getLeaguesFromCountry,
    getLeaguesWithFixtures
}
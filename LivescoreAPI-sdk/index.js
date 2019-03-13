const request = require('request');
const fixtures = require('./features/fixtures');
const leagues = require('./features/leagues');
const countries = require('./features/countries');
const livescores = require('./features/livescores');
const history = require('./features/history');
const checkers = require('./checkers/checkers');

const apiUrl = 'http://livescore-api.com/api-client/';
let key = '';
let secret = '';

//set api key and secret
const setKeySecre = (inputKey, inputSecret) => {
    key = inputKey;
    secret = inputSecret;
}

//check api key and secret
const checkKeySecret = () => {
    request(checkers.buildUrl('users/pair.json'), {
        json: true
    }, (err, res, body) => {
        if (err) {
            throw err;
        }
        return res.body.data.message;
    });
};
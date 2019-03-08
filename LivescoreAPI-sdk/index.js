const request = require('request');
const fixtures = require('./features/fixtures');
const leagues = require('./features/leagues');
const countries = require('./features/countries');
const livescores = require('./features/livescores');
const history = require('./features/history');

const apiUrl = 'http://livescore-api.com/api-client/';
let key = '';
let secret = '';

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

//set api key and secret
const setKeySecre = (inputKey, inputSecret) => {
    key = inputKey;
    secret = inputSecret;
}

//check api key and secret
const checkKeySecret = () => {
    request(buildUrl('users/pair.json'), {
        json: true
    }, (err, res, body) => {
        if (err) {
            throw err;
        }
        return res.body.data.message;
    });
};
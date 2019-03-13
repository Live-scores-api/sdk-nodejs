const checkers = require('./../checkers/checkers');

//get countries 
const getAllCountries = (callback) => {
    request(checkers.buildUrl("countries/list.json"), {
        json: true
    }, (err, res, body) => {
        if (err) {
            return callback(err);
        }

        callback(null, res.body.data.country);
    });
};

module.exports = {
    getAllCountries
}
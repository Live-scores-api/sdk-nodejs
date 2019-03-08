//get countries 
const getAllCountries = (callback) => {
    request(buildUrl("countries/list.json"), {
        json: true
    }, (err, res, body) => {
        if (err) {
            return callback(err);
        }

        callback(null, res.body.data.country);
    });
};

module.exports = {
    countries
}
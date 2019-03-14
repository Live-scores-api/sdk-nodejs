const livescoreapi = require("./LivescoreAPI-sdk/index");

client = livescoreapi.LivescoreAPI("jKmNacIioQWUs3UD", "Re1D24KqMVULrKBKvYxGbgYA7UuAYodQ", 'http://livescore-api.com/api-client/')

// client.getAllCountries((err, countries) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(countries);
//     }
// });

// client.getAllFixtures((err, fixtures) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(fixtures)
//     }
// });

// client.getFixturesFromDate("2019-03-15",(err, fixtures) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(fixtures);
//     }
// })

// client.getFixturesFromLeague(4, (err, fixtures) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(fixtures);
//     }
// })

// client.getFixturesInLanguage("ru", (err, fixtures) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(fixtures);
//     }
// })

// client.getFixturesFromPage(3, (err, fixtures) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(fixtures);
//     }
// })

// client.getFixturesDateLanguageLeague("2019-03-14", 'ru', 91, (err, fixtures) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(fixtures);
//     }
// })

// client.getFixturesDateLanguage("2019-03-14", 'ru', (err, fixtures) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(fixtures);
//     }
// })

// client.getFixturesDateLeague("2019-03-14", 91, (err, fixtures) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(fixtures);
//     }
// })

// client.getFixturesLeagueLanguage(91, 'ru', (err, fixtures) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(fixtures);
//     }
// })

// client.getFullHistory((err, history) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(history);
//     }
// })

// client.getHistoryFromDate("2019-03-08", (err, history) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(history);
//     }
// })

// client.getHistoryToDate("2019-03-14", (err, history) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(history)
//     }
// })

// client.getHistoryByLeague(1, (err, history) => {
//     if (err) {
//         console.log (err);
//     } else {
//         console.log(history);
//     }
// })

// client.getHistoryFromPage(3, (err, history) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(history);
//     }
// })

// client.getHistoryInLanguage('ru', (err, history) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(history);
//     }
// })

// client.GetHistoryBetweendDatesCountryLanguage("2019-02-01", "2019-03-01", 1, 'ru', (err, history) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(history);
//     }
// })

// client.getHistoryBetweenDatesLeague("2019-02-01", "2019-03-01", 1, (err, history) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(history);
//     }
// })

// client.getHistoryBetweenDatesLanguage("2019-02-01", "2019-03-01", 'ru', (err, history) => {
//     if (err){
//         console.log(err);
//     } else {
//         console.log(history);
//     }
// })

// client.getHistoryFromDateLeagueLanguage("2019-03-01", 1, 'ru', (err, history) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(history);
//     }
// })

// client.getHistoryToDateLeagueLanguage("2019-03-01", 1, 'ru', (err, history) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(history);
//     }
// })

// client.getHistoryBetweenDates("2019-03-11", "2019-03-16", (err, history) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(history);
//     }
// })

// client.getHistoryFromDateLeague("2019-03-02", 1, (err, history) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(history);
//     }
// })

// client.getHistoryFromDateLanguage("2019-03-02", 'ru', (err, history) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(history);
//     }
// })


// client.getHistoryToDateLeague("2019-03-09", 1, (err, history) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(history);
//     }
// })

// client.getHistoryToDateLanguage('2019-03-09', 'ru', (err, history) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(history);
//     }
// })

// client.getHistoryLeagueLanguage(1, 'ru', (err, history) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(history);
//     }
// })

// client.getAllLeagues((err, leagues) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(leagues);
//     }
// })

// client.getLeaguesWithFixtures((err, leagues) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(leagues);
//     }
// })

// client.getLeaguesFromCountry(1, (err, leagues) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(leagues);
//     }
// })

// client.getAllLiveScores((err, livescores) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(livescores);
//     }
// })

// client.getLiveScoresByCountry(57, (err, livescores) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(livescores);
//     }
// })

// client.getLiveScoresByLeague(24, (err, livescores) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(livescores);
//     }
// })

// client.getLiveScoresInLanguage('ru', (err, livescores) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(livescores);
//     }
// })

// client.getLiveScoresCountryLeagueLanguage(1, 1, 'ru', (err, livescores) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(livescores);
//     }
// })

// client.getLiveScoresCountryLanguage(1, 'ru', (err, livescores) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(livescores);
//     }
// })

// client.getLiveScoresCountryLeague(1, 1, (err, livescores) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(livescores);
//     }
// })

// client.getLiveScoresLeagueLanguage(24, 'ru', (err, livescores) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(livescores);
//     }
// })


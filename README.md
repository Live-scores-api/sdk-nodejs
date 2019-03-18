# Livescore API - simplified HTTP client
http://livescore-api.com/

## Installation

This module is installed via npm 

```shell
$ npm install --save livescoreapi
```

## Super simple to use
Livescoreapi package is designed to be the simplest way possible to make http requests to the Livescore API

The easiest way ever to create an awesome API... no, really. It's as simple as:


```js
const client = require('livescoreapi');

client = livescoreapi.LivescoreAPI("<KEY>", "<SECRET>", 'http://livescore-api.com/api-client/');

client.getAllLiveScores((err, livescores) => {
    if (err) {
        console.log(err); // Print the error if one occurred
    } else {
        console.log(livescores); // Print the response of the API
    }
});

```

## Table of contents

- [Countries](#countries)
- [Leagues](#leagues)
- [Livescores](#livescores)
- [Fixtures](#fixtures)
- [History](#history)

## Countries
##### Method to get the list of countries
* getAllCountries() 

## Leagues

##### Mehtods to get the list of leagues
* Gel all leagues
    * getAllLeagues()
* Get leagues with fixtures
    * getLeaguesWithFixtures()
* Get leagues from a certain country
    * getLeaguesFromCountry()


## Livescores

##### Method to get the list of all livescores
* getAllLiveScores()

##### Methods to get the list of livescores based on different parameters
* Get livescores from a certain country; takes as parameter the country id
    * getLiveScoresByCountry()
* Get livescores from a certain league; takes as parameter the league id
    * getLiveScoresByLeague()
* Get livescores in a certain language; takes as parameter the language ([ar, fa, ru])
    * getLiveScoresInLanguage()
* Get livescores from a certain country, from a certain league in a certain language; takes as parameters: country id, league id, language
    * getLiveScoresCountryLeagueLanguage()
* Get livescores from a certain country in a certain language; takes as parameters: country id, language
    * getLiveScoresCountryLanguage()
* Get livescores from a certain league in a certain country; takes as parameters: league id, country id
    * getLiveScoresCountryLeague()
* Get livescores from a certain league in a certain language; takes as parameters: league id, language
    * getLiveScoresLeagueLanguage()

## Fixtures

##### Method to get the list of fixtures
* getAllFixtures()

##### Methods to get the list of fixtures based on different parameters
* Get the list of fixtures from a certain date; takes as parameter the date ("YYYY-MM-DD")
    * getFixturesFromDate()
* Get the list of fixtures from a league; takes as parameter the league id 
    * getFixturesFromLeague()
* Get the list of fixtures from a certain language; takes as parameter the language ([ar, fa, ru])
    * getFixturesInLanguage()
* Get the list of fixtures based on date, language and league; takes as parameters: date, language, league id
    * getFixturesDateLanguageLeague()   
* Get the list of fixtures based on date and language; takes as parameters: date, language
    * getFixturesDateLanguage()
* Get the list of fixtures based on date and league; takes as parameters: date, league id
    * getFixturesDateLeague()
* Get the list of fixtures based in the league and language; takes as parameters: league id, language
    * getFixturesLeagueLanguage()


## History

##### Method to get the history of matches
* getFullHistory()

##### Methods to get the history of matches based on different parameters
* Get the history from a date onwards; takes as parameter the date ("YYYY-MM-DD")
    * getHistoryFromDate() 
* Get past matches from this date onwards; takes as parameter the date ("YYYY-MM-DD")
    * getHistoryToDate()
* Get history for a certain league; takes as parameter the league id
    * getHistoryByLeague()  
* Get history in a certain language; takes as parameter the language ([ar, fa, ru])
    * getHistoryInLanguage()
* Get history between 2 dates from a certain league in a certain language; takes as parameters: start date, end date, league id, language 
    * getHistoryBetweendDatesCountryLanguage()
* Get history between 2 dates from a certain league; takes as parameters: start date, end date, league id
    * getHistoryBetweenDatesLeague()
* Get history between 2 dates in a certain language; takes as parameters: start date, end date, language
    * getHistoryBetweenDatesLanguage()
* Get history starting from a date from a certain league in a certain language; takes as parameters: date, language
    * getHistoryFromDateLeagueLanguage()
* Get history until a date from a certain league in a certain language; takes as parameters: date, language
    * getHistoryToDateLeagueLanguage()
* Get history between 2 dates; takes as parameters: start date, end date
    * getHistoryBetweenDates()
* Get history starting from a date from a certain league; takes as parameters: date, league id
    * getHistoryFromDateLeague()
* Get history starting from a date in a certain language; takes as parameters: date, language
    * getHistoryFromDateLanguage()
* Get history until a date from a certain league; takes as parameters: date, league id
    * getHistoryToDateLeague()
* Get history until a date in a certain language; takes as parameters: date, language
    * getHistoryToDateLanguage()
* Get history from a league in a certain language; takes as parameters: league id, language
    * getHistoryLeagueLanguage()


 










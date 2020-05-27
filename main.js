'use strict';

const date = new Date();
document.getElementById("date").innerHTML = "Stats for Habs' kids as of " + date; 

/* need data for
jesperi
nick suzuki
cale fleury
ryan
romanov
cayden primeau 
Jayden Struble
Jake Evans
*/

let requestURL = 'https://statsapi.web.nhl.com/api/v1/people/8480829/?expand=person.stats&stats=yearByYear';
let request = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const jesperiData = request.response;
  populateList(jesperiData);
}

function populateList(jsonObj) {
  const jesperiStats = jsonObj['people'];
  
  for (let i = 0; i < jesperiStats.length; i++) {
    const jesperiList = document.createElement('div');
    const jesperiAge = document.createElement('p');
    const jesperiPosition = document.createElement('p');
    const jesperiBirth = document.createElement('p');
    const jesperiGames = document.createElement('p');
    const jesperiGoals = document.createElement('p');
    const jesperiAssists = document.createElement('p');
    const jesperiPlusminus = document.createElement('p');
    const jesperiMinutes = document.createElement('p');

    jesperiAge.textContent = 'Age: ' + jesperiStats[i].currentAge;
    jesperiPosition.textContent = 'Position: ' + jesperiStats[i].primaryPosition.name;
    jesperiBirth.textContent = 'Born in: ' + jesperiStats[i].birthCity;
    jesperiGames.textContent = 'Games played: ' + (jesperiStats[i].stats[0].splits[10].stat.games + jesperiStats[i].stats[0].splits[11].stat.games);
    jesperiGoals.textContent = 'Goals: ' + (jesperiStats[i].stats[0].splits[10].stat.goals + jesperiStats[i].stats[0].splits[11].stat.goals);
    jesperiAssists.textContent = 'Assists: ' + (jesperiStats[i].stats[0].splits[10].stat.assists + jesperiStats[i].stats[0].splits[11].stat.assists);
    jesperiPlusminus.textContent = '+/-: ' + (jesperiStats[i].stats[0].splits[10].stat.plusMinus + jesperiStats[i].stats[0].splits[11].stat.plusMinus);
    const gamesTotal = (jesperiStats[i].stats[0].splits[10].stat.games + jesperiStats[i].stats[0].splits[11].stat.games);
    const minutesFirst = jesperiStats[i].stats[0].splits[10].stat.timeOnIce;
    const minutesSecond = jesperiStats[i].stats[0].splits[11].stat.timeOnIce;
    const timeOnIce = (parseInt(minutesFirst) + parseInt(minutesSecond))/gamesTotal;
    jesperiMinutes.textContent = 'Avg minutes per game: ' + timeOnIce.toFixed(2);

    jesperiList.appendChild(jesperiBirth);
    jesperiList.appendChild(jesperiAge);
    jesperiList.appendChild(jesperiPosition);
    jesperiList.appendChild(jesperiGames);
    jesperiList.appendChild(jesperiGoals);
    jesperiList.appendChild(jesperiAssists);
    jesperiList.appendChild(jesperiPlusminus);
    jesperiList.appendChild(jesperiMinutes);

    document.getElementById("jesperi").appendChild(jesperiList);
  }
}




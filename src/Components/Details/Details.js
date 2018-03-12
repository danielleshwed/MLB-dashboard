import React, { Component } from 'react';
import Scoreboard from '../Scoreboard/Scoreboard.js';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

class Details extends Component {
  constructor(){
    super();
    this.state = {
      date: '',
      gameInfo: [],
      batterHome: [],
      battersAway: [],
      homeRun: '',
      homeHit: '',
      awayRun: '',
      awayHit: ''
    }
    this.getData = this.getData.bind(this);
  }

  componentWillMount(){
    var date = localStorage.getItem("date")
    var param = localStorage.getItem("url");
    this.getData(date.split("-"), param);
  }

  getData(date, param){
    var url = `http://gd2.mlb.com${param}/boxscore.json`;
    fetch(url)
    .then(data => {
      return data.json();
    }).then(results => {
        var getScore = results.data.boxscore.linescore;
        console.log(results.data.boxscore.batting[0].batter)
        this.setState({
          awayRuns: getScore.away_team_runs,
          awayHits: getScore.away_team_hits,
          homeRuns: getScore.home_team_runs,
          awayHits: getScore.home_team_hits
        })

        let gameInfo = getScore.inning_line_score.map((linescore) =>{
          return(
                <tr>
                  <td>{linescore.inning}</td>
                  <td>{linescore.home}</td>
                  <td>{linescore.away}</td>
                </tr>

            )
        })
        let battersHome = results.data.boxscore.batting[0].batter.map((batter) =>{
          return(
                <tr>
                  <td>{batter.name_display_first_last}</td>
                  <td>{batter.ab}</td>
                  <td>{batter.r}</td>
                  <td>{batter.h}</td>
                  <td>{batter.r}</td>
                  <td>{batter.bb}</td>
                  <td>{batter.s_bb}</td>
                  <td>{batter.rbi}</td>
                  <td>{batter.r}</td>
                  <td>{batter.bo}</td>
                  <td>{batter.cs}</td>
                  <td>{batter.lob}</td>
                  <td>{batter.so}</td>
                  <td>{batter.avg}</td>
                  <td>{batter.obp}</td>
                  <td>{batter.slg}</td>
                  <td>{batter.ops}</td>
                </tr>

            )
        })

        let battersAway = results.data.boxscore.batting[1].batter.map((batter) =>{
          return(
                <tr>
                  <td>{batter.name_display_first_last}</td>
                  <td>{batter.ab}</td>
                  <td>{batter.r}</td>
                  <td>{batter.h}</td>
                  <td>{batter.r}</td>
                  <td>{batter.bb}</td>
                  <td>{batter.s_bb}</td>
                  <td>{batter.rbi}</td>
                  <td>{batter.r}</td>
                  <td>{batter.bo}</td>
                  <td>{batter.cs}</td>
                  <td>{batter.lob}</td>
                  <td>{batter.so}</td>
                  <td>{batter.avg}</td>
                  <td>{batter.obp}</td>
                  <td>{batter.slg}</td>
                  <td>{batter.ops}</td>
                </tr>

            )
        })
        this.setState({
          gameInfo: gameInfo,
          battersHome: battersHome,
          battersAway: battersAway
        });
    })
}

  render() {
    return (
      <div className="App">
        <h1>Details</h1>
          <h3> Away Team Runs: {this.state.awayRuns} </h3>
          <h3> Away Team Hits: {this.state.awayHits} </h3>
          <h3> Home Team Runs: {this.state.homeRuns} </h3>
          <h3> Home Team Hits: {this.state.homeRuns} </h3>
            <table>
              <tr>
                <th>Inning Number</th>
                <th>Home</th>
                <th>Away</th>
              </tr>
              {this.state.gameInfo}
            </table>
            <label class="switch"/>
              <input type="checkbox" class="switch-input" />
              <span class="switch-label" data-on="On" data-off="Off"></span>
              <span class="switch-handle"></span>

            <table>
              <tr>
                <th>Player</th>
                <th>AB</th>
                <th>R</th>
                <th>H</th>
                <th>2B</th>
                <th>3B</th>
                <th>RBI</th>
                <th>SB</th>
                <th>CS</th>
                <th>BB</th>
                <th>SO</th>
                <th>AVG</th>
                <th>OBP</th>
                <th>SLG</th>
                <th>OPS</th>
                <th>WAR</th>
              </tr>
              {this.state.battersHome}
            </table>

      </div>
    )
  }
}

export default Details;

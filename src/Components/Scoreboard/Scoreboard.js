import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardTitle } from 'material-ui/Card';

class Scoreboard extends Component {
  constructor(props){
    super(props);
    console.log(this.props.date)
    if(localStorage.getItem("date") == null){
      this.state = {
        games: [],
        date: this.props.date.split("-")
      }
    }
    else{
      this.state = {
        date: localStorage.getItem("date"),
        flag: true
      }
      this.getData(this.state.date);
    }

    this.getDetails = this.getDetails.bind(this);
  }


  getDetails(e, gameData){
    localStorage.setItem("date", this.state.date);
    localStorage.setItem("url", e);
    browserHistory.push("/details");
  }

  getData(date){
    this.setState({date: date});
    date = date.split("-")

    var url = `http://gd2.mlb.com/components/game/mlb/year_${date[0]}/month_${date[1]}/day_${date[2]}/master_scoreboard.json`;
    fetch(url)
    .then(data => {
      return data.json();
    }).then(results => {

      const sortedGames = results.data.games.game.reduce((i,game) =>{
        if(game.home_team_name === "Blue Jays" || game.away_team_name === "Blue Jays"){
          return [game, ...i];
        }
        return [...i, game];
      }, []);

      let games = sortedGames.map((game) =>{
        var gameData = game.game_data_directory;

        if(game.linescore.r.home > game.linescore.r.away){
          var winnerName = game.home_team_name;
          var winnerScore = game.linescore.r.home;
          var loserName = game.away_team_name;
          var loserScore = game.linescore.r.away;
        } else {
          loserName = game.home_team_name;
          loserScore = game.linescore.r.home;
          winnerName = game.away_team_name;
          winnerScore = game.linescore.r.away;
        }
        return(
          <Card key={game.id}
            style={{
              width: '50%',
              margin: '0 auto',
              paddingBottom: '50px',
              paddingTop: '30px',
              marginTop: '10px',
              backgroundColor: '#6C7A89',
            }}>
            <b><CardTitle title={winnerName} subtitle= {winnerScore}/></b>
            <CardTitle title={loserName} subtitle= {loserScore}/>
            <CardTitle title={game.status.status} />
            <RaisedButton value = {gameData} onClick={this.getDetails.bind(this, gameData)} label="Details" />
          </Card>
        )
      })
      this.setState({games: games});
    })
    .catch((err) => {
      let games = <div>
                    <h3> No Games Today </h3>
                  </div>


      this.setState({games: games});
    });
  }

  render() {
    return (
      <div className="scoreboard">
        <h2> {this.state.date} </h2>
        {this.state.games}
      </div>
    );
  }
}

export default Scoreboard;

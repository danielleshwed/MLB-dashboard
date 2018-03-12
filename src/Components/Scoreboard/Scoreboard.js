import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class Scoreboard extends Component {
  constructor(props){
    super(props);

    if(localStorage.getItem("date") !== 'undefined'){
      this.state = {
        date: localStorage.getItem("date"),
      }
      this.getData(this.state.date);
    }
    else{
      this.state = {
        games: [],
        date: this.props.date.split("-"),
        loading: false
      }
    }

    this.getDetails = this.getDetails.bind(this);
  }

  getDetails(e){
    localStorage.setItem("date", this.state.date);
    localStorage.setItem("url", e.target.value);
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
        return(
          <Card key={game.id}>
            <CardTitle title={game.home_team_name} subtitle= {game.linescore.r.home}/>
            <CardTitle title={game.away_team_name} subtitle= {game.linescore.r.away}/>
            <CardTitle title={game.status.status} />
            <RaisedButton value = {gameData} onClick={(e) => this.getDetails(e)} label="Details" />
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

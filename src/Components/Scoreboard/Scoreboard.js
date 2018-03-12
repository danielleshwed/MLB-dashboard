import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardTitle } from 'material-ui/Card';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const style = {
  container: {
    position: 'relative',
  },
  loading: {
    display: 'inline-block',
    position: 'relative',
  },
};

class Scoreboard extends Component {
  constructor(props){
    super(props);

    if(localStorage.getItem("date") == null){
      this.state = {
        games: [],
        date: this.props.date.split("-"),
        loading: false
      }
    }
    else{
      //if date already set, grab from localstorage
      this.state = {
        date: localStorage.getItem("date"),
        loading: false
      }
      this.getData(this.state.date);
    }
    this.getDetails = this.getDetails.bind(this);
    this.showLoading = this.showLoading.bind(this);
  }

  /**
  Save the games we've already pulled from our api in localstorage along with the Date
  go to Details page
  **/
  getDetails(e, gameData){
    localStorage.setItem("date", this.state.date);
    localStorage.setItem("url", e);
    browserHistory.push("/details");
  }

  showLoading(){
    return(
      <div style={style.container}>
        <RefreshIndicator
          size={40}
          left={10}
          top={0}
          status="loading"
          style={style.loading}
        />
      </div>
    )
  }

  /**
  Get data will make an api call, getting all games played on that date.
  If no games are found, state.games will be set to "no games found"
  **/
  getData(date){
    this.setState({date: date});
    date = date.split("-")

    var url = `http://gd2.mlb.com/components/game/mlb/year_${date[0]}/month_${date[1]}/day_${date[2]}/master_scoreboard.json`;
    fetch(url)
    .then(data => {
      this.setState({
        loading: true
      })
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
      this.setState({
        games: games,
        loading: false
      });
    })
    .catch((err) => {
      let games = <div>
                    <h3> No Games Today </h3>
                  </div>


      this.setState({
        games: games,
        loading: false
      });
    });
  }

  render() {
    return (
      <div className="scoreboard">
        <h2> {this.state.date} </h2>
        {this.state.loading ? this.showLoading() : ''}
        {this.state.games}
      </div>
    );
  }
}

export default Scoreboard;

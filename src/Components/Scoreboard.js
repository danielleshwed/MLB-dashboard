import React, { Component } from 'react';

class Scoreboard extends Component {
  constructor(props){
    super(props);
    console.log(this.props.date)
    this.state = {
      games: [],
      date: this.props.date.split("-"),
      loading: false
    }
  }

  getData(date){
    console.log('getting data')
    this.setState({date: date});
    date = date.split("-")

    var url = `http://gd2.mlb.com/components/game/mlb/year_${date[0]}/month_${date[1]}/day_${date[2]}/master_scoreboard.json`;
    fetch(url)
    .then(data => {
      return data.json();
    }).then(results => {
      let games = results.data.games.game.map((game) =>{
        return(
          <div key={game.id}>
            <h3 className="home">
              {game.home_team_name} ........ {game.linescore.r.home}
            </h3>
            <h3 className="away">
              {game.away_team_name} ........ {game.linescore.r.away}
            </h3>
            <h3 className="status">
              {game.status.status}
            </h3>
            <p>--------------</p>
          </div>
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

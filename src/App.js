import React, { Component } from 'react';
import logo from './mlb.png';
import './App.css';
import Scoreboard from './Components/Scoreboard.js'
//import 'materialize-css';
//import 'materialize-css/dist/css/materialize.min.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      date: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.scoreboard = null;
  }

  handleClick(){
    this._scoreboard.getData(this.state.date);
  }

  updateInput(e){
    this.setState({
      date: e.target.value
    })
    console.log(this.state.date);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">MLB SCOREBOARD</h1>
        </header>

        <input type="date" name="bday" onChange = {this.updateInput}/>
        <input type="submit" value="Submit" onClick={this.handleClick}/>

        <div>
          <Scoreboard date={this.state.date} ref={(scoreboard) => { this._scoreboard = scoreboard; }}/>
        </div>
      </div>
    );
  }
}

export default App;

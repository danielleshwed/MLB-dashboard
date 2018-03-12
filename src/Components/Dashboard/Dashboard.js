import React, { Component } from 'react';
import logo from './mlb.png';
import './App.css';
import Scoreboard from '../Scoreboard/Scoreboard.js';

class Dashboard extends Component {
  constructor(){
    super();
    this.state = {
      date: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.scoreboard = null;
  }

  handleClick(){
    this._scoreboard.getData(this.state.date);
  }

  changeDate(e){
    var dayMonthYear = this.state.date.split("-");
    var date = new Date(dayMonthYear[0], dayMonthYear[1], dayMonthYear[2]);
    if(e.target.value === "back"){
      date.setDate(date.getDate() - 1)
    }
    else{
      date.setDate(date.getDate() + 1)
    }
    var newDate = date.getFullYear() + "-" + ("0" + date.getMonth()).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
    this.setState({date: newDate})
    this._scoreboard.getData(newDate);

  }

  updateInput(e){
    this.setState({
      date: e.target.value
    })
    console.log(this.state.date)
  }

  render() {
    return (
      <div className="UserInput">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">MLB SCOREBOARD</h1>
        </header>
        <button value="back" onClick = {this.changeDate}> back </button>
        <input type="date" name="bday" onChange = {this.updateInput}/>
        <input type="submit" value="Submit" onClick={this.handleClick}/>
        <button value="next" onClick = {this.changeDate}> next </button>
        <div>
          <Scoreboard date={this.state.date} ref={(scoreboard) => { this._scoreboard = scoreboard; }}/>
        </div>
      </div>
    );
  }
}

export default Dashboard;

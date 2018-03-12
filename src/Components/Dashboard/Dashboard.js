import React, { Component } from 'react';
import logo from './mlb.png';
import './App.css';
import Scoreboard from '../Scoreboard/Scoreboard.js';

import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

class Dashboard extends Component {
  constructor(){
    super();
    if(localStorage.getItem("date") !== 'undefined'){
      this.state = {
        date: localStorage.getItem("date"),
      }
    }
    else{
      this.state = {
        date: ''
      }
    }

    this.handleClick = this.handleClick.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.scoreboard = null;
  }

  handleClick(){
    this._scoreboard.getData(this.state.date);
  }

  changeDate(e, val){
    var dayMonthYear = this.state.date.split("-");
    var date = new Date(dayMonthYear[0], dayMonthYear[1], dayMonthYear[2]);
    if(e === "back"){
      date.setDate(date.getDate() - 1)
    }
    else{
      date.setDate(date.getDate() + 1)
    }
    var newDate = date.getFullYear() + "-" + ("0" + date.getMonth()).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);;
    this.setState({date: newDate})
    this._scoreboard.getData(newDate);

  }

  formatDate(date){
    var month = Number(date.getMonth()) + 1;
    var newDate = date.getFullYear() + "-" + ("0" + month).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
    return newDate;
  }

  updateInput(e,date){
    this.setState({
      date: this.formatDate(date)
    })
  }

  render() {
    return (
      <div className="UserInput">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">MLB SCOREBOARD</h1>
        </header>
        <div>
          <i
            className="material-icons"
            value="back"
            onClick = {this.changeDate.bind(this, "back")}
            style={{
              display: 'inline-block'
            }}
          >
            keyboard_arrow_left
          </i>
            <DatePicker
              hintText="Choose a date"
              onChange={this.updateInput}
              style={{
                paddingTop: '50px',
                paddingBottom: '30px',
                display: 'inline-block'
              }}
            />
          <i
            className="material-icons"
            value="next"
            onClick = {this.changeDate.bind(this, "next")}
            style={{
              display: 'inline-block'
            }}
          >
            keyboard_arrow_right
          </i>
        </div>
        <div>
          <RaisedButton
            value="Submit"
            onClick={this.handleClick}
            label="Get Games"
            style={{
              marginBottom: '30px'
            }}
          />
          <Scoreboard date={this.state.date} ref={(scoreboard) => { this._scoreboard = scoreboard; }}/>
        </div>
      </div>
    );
  }
}

export default Dashboard;

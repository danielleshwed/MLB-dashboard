import React, { Component } from 'react';
import Toggle from 'material-ui/Toggle';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const style = {
  container: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  loadingContainer: {
    position: 'relative',
  },
  loading: {
    display: 'inline-block',
    position: 'relative',
  },
}

class Details extends Component {
  constructor(){
    super();
    this.state = {
      date: '',
      gameInfo: [],
      batterHome: [],
      battersAway: [],
      showAway: true,
      showHome: true,
      loading: false,
      homeName: '',
      awayName: ''
    }
    this.getData = this.getData.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.showLoading= this.showLoading.bind(this);
  }

  componentWillMount(){
    var date = localStorage.getItem("date")
    var param = localStorage.getItem("url");
    this.getData(date.split("-"), param);
  }

  /**
  Show home and away batters based on toggle
  **/
  handleToggle(e, toggled){
    this.setState({
      [e.target.name]: toggled,
    })
  }

  showLoading(){
    return(
      <div style={style.loadingContainer}>
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
  Fetch batter stats and line score from api and display stats in table
  **/
  getData(date, param){
    var url = `http://gd2.mlb.com${param}/boxscore.json`;
    fetch(url)
    .then(data => {
      this.setState({
        loading: true
      })
      return data.json();
    }).then(results => {
        var getScore = results.data.boxscore.linescore;
        this.setState({
          homeName: results.data.boxscore.home_sname,
          awayName: results.data.boxscore.away_fname
        })
        let gameInfo = getScore.inning_line_score.map((linescore) =>{
          return(
                <TableRow key={linescore.inning}>
                  <TableRowColumn>{linescore.inning}</TableRowColumn>
                  <TableRowColumn>{linescore.home}</TableRowColumn>
                  <TableRowColumn>{linescore.away}</TableRowColumn>
                </TableRow>

            )
        })
        let battersHome = results.data.boxscore.batting[0].batter.map((batter) =>{
          return(
                <TableRow key={batter.name_display_first_last}>
                  <TableRowColumn>{batter.name_display_first_last}</TableRowColumn>
                  <TableRowColumn>Home</TableRowColumn>
                  <TableRowColumn>{batter.ab}</TableRowColumn>
                  <TableRowColumn>{batter.r}</TableRowColumn>
                  <TableRowColumn>{batter.h}</TableRowColumn>
                  <TableRowColumn>{batter.bb}</TableRowColumn>
                  <TableRowColumn>{batter.rbi}</TableRowColumn>
                  <TableRowColumn>{batter.bo}</TableRowColumn>
                  <TableRowColumn>{batter.cs}</TableRowColumn>
                  <TableRowColumn>{batter.avg}</TableRowColumn>
                </TableRow>

            )
        })

        let battersAway = results.data.boxscore.batting[1].batter.map((batter) =>{
          return(
            <TableRow key={batter.name_display_first_last}>
              <TableRowColumn>{batter.name_display_first_last}</TableRowColumn>
              <TableRowColumn>Away</TableRowColumn>
              <TableRowColumn>{batter.ab}</TableRowColumn>
              <TableRowColumn>{batter.r}</TableRowColumn>
              <TableRowColumn>{batter.h}</TableRowColumn>
              <TableRowColumn>{batter.bb}</TableRowColumn>
              <TableRowColumn>{batter.rbi}</TableRowColumn>
              <TableRowColumn>{batter.bo}</TableRowColumn>
              <TableRowColumn>{batter.cs}</TableRowColumn>

              <TableRowColumn>{batter.avg}</TableRowColumn>

            </TableRow>

            )
        })
        this.setState({
          gameInfo: gameInfo,
          battersHome: battersHome,
          battersAway: battersAway,
          loading: false
        });
    })
}

  render() {
    return (
      <div className="App">
        <h1>Details</h1>
        <h3> {this.state.homeName} (Home) vs. {this.state.awayName} (Away) </h3>

          {this.state.loading ? this.showLoading() : ''}

          <div style={style.container}>
          <h3>Views</h3>
          <Toggle
            name="showHome"
            label="Home Batter Stats"
            onToggle={this.handleToggle}
            defaultToggled={true}
          />
          <Toggle
            name="showAway"
            label="Away Batter Stats"
            onToggle={this.handleToggle}
            defaultToggled={true}
          />
      </div>

            <Table
              height='300px'
              fixedHeader={true}
              fixedFooter={false}
              selectable={false}
              multiSelectable={false}
            >
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}
              >
            <TableRow>
              <TableHeaderColumn colSpan="3" tooltip="Linescores" style={{textAlign: 'center'}}>
                Game Details
              </TableHeaderColumn>
            </TableRow>

            <TableRow>
              <TableHeaderColumn tooltip="Inning">Inning Number</TableHeaderColumn>
              <TableHeaderColumn tooltip={this.state.homeName}>Home</TableHeaderColumn>
              <TableHeaderColumn tooltip={this.state.awayName}>Away</TableHeaderColumn>
            </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
            >
              {this.state.gameInfo}
            </TableBody>
          </Table>

          <Table
            height='300px'
            fixedHeader={true}
            fixedFooter={false}
            selectable={false}
            multiSelectable={false}
          >
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
            >
          <TableRow>
            <TableHeaderColumn colSpan="10" tooltip="Batter Stats" style={{textAlign: 'center'}}>
              Batter Stats
            </TableHeaderColumn>
          </TableRow>

          <TableRow
            hoverable={true}
          >
            <TableHeaderColumn tooltip="Player">Player</TableHeaderColumn>
            <TableHeaderColumn tooltip="Team">Team</TableHeaderColumn>
            <TableHeaderColumn tooltip="AB">AB</TableHeaderColumn>
            <TableHeaderColumn tooltip="R">R</TableHeaderColumn>
            <TableHeaderColumn tooltip="H">H</TableHeaderColumn>
            <TableHeaderColumn tooltip="2B">2B</TableHeaderColumn>
            <TableHeaderColumn tooltip="RBI">RBI</TableHeaderColumn>
            <TableHeaderColumn tooltip="RBI">BO</TableHeaderColumn>
            <TableHeaderColumn tooltip="CS">CS</TableHeaderColumn>
            <TableHeaderColumn tooltip="AVG">AVG</TableHeaderColumn>
          </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            {this.state.showAway ? this.state.battersHome : ''}
            {this.state.showHome? this.state.battersAway: ''}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default Details;

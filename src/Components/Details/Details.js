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
      loading: false
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
                  <TableRowColumn>{batter.ab}</TableRowColumn>
                  <TableRowColumn>{batter.r}</TableRowColumn>
                  <TableRowColumn>{batter.h}</TableRowColumn>
                  <TableRowColumn>{batter.bb}</TableRowColumn>
                  <TableRowColumn>{batter.s_bb}</TableRowColumn>
                  <TableRowColumn>{batter.rbi}</TableRowColumn>
                  <TableRowColumn>{batter.bo}</TableRowColumn>
                  <TableRowColumn>{batter.cs}</TableRowColumn>
                  <TableRowColumn>{batter.lob}</TableRowColumn>
                  <TableRowColumn>{batter.so}</TableRowColumn>
                  <TableRowColumn>{batter.avg}</TableRowColumn>
                  <TableRowColumn>{batter.obp}</TableRowColumn>
                  <TableRowColumn>{batter.slg}</TableRowColumn>
                  <TableRowColumn>{batter.ops}</TableRowColumn>
                </TableRow>

            )
        })

        let battersAway = results.data.boxscore.batting[1].batter.map((batter) =>{
          return(
            <TableRow key={batter.name_display_first_last}>
              <TableRowColumn>{batter.name_display_first_last}</TableRowColumn>
              <TableRowColumn>{batter.ab}</TableRowColumn>
              <TableRowColumn>{batter.r}</TableRowColumn>
              <TableRowColumn>{batter.h}</TableRowColumn>
              <TableRowColumn>{batter.bb}</TableRowColumn>
              <TableRowColumn>{batter.s_bb}</TableRowColumn>
              <TableRowColumn>{batter.rbi}</TableRowColumn>
              <TableRowColumn>{batter.bo}</TableRowColumn>
              <TableRowColumn>{batter.cs}</TableRowColumn>
              <TableRowColumn>{batter.lob}</TableRowColumn>
              <TableRowColumn>{batter.so}</TableRowColumn>
              <TableRowColumn>{batter.avg}</TableRowColumn>
              <TableRowColumn>{batter.obp}</TableRowColumn>
              <TableRowColumn>{batter.slg}</TableRowColumn>
              <TableRowColumn>{batter.ops}</TableRowColumn>
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
              <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{textAlign: 'center'}}>
                Game Details
              </TableHeaderColumn>
            </TableRow>

            <TableRow>
              <TableHeaderColumn tooltip="The ID">Inning Number</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Name">Home</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">Away</TableHeaderColumn>
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
            <TableHeaderColumn colSpan="15" tooltip="Super Header" style={{textAlign: 'center'}}>
              Batter Stats
            </TableHeaderColumn>
          </TableRow>

          <TableRow>
            <TableHeaderColumn tooltip="Player">Player</TableHeaderColumn>
            <TableHeaderColumn tooltip="AB">AB</TableHeaderColumn>
            <TableHeaderColumn tooltip="R">R</TableHeaderColumn>
            <TableHeaderColumn tooltip="H">H</TableHeaderColumn>
            <TableHeaderColumn tooltip="2B">2B</TableHeaderColumn>
            <TableHeaderColumn tooltip="3B">3B</TableHeaderColumn>
            <TableHeaderColumn tooltip="RBI">RBI</TableHeaderColumn>
            <TableHeaderColumn tooltip="RBI">BO</TableHeaderColumn>
            <TableHeaderColumn tooltip="CS">CS</TableHeaderColumn>
            <TableHeaderColumn tooltip="LOB">LOB</TableHeaderColumn>
            <TableHeaderColumn tooltip="SO">SO</TableHeaderColumn>
            <TableHeaderColumn tooltip="AVG">AVG</TableHeaderColumn>
            <TableHeaderColumn tooltip="OBP">OBP</TableHeaderColumn>
            <TableHeaderColumn tooltip="SLG">SLG</TableHeaderColumn>
            <TableHeaderColumn tooltip="OPS">OPS</TableHeaderColumn>
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

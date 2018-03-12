import React, { Component } from 'react';
import Scoreboard from '../Scoreboard/Scoreboard.js';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import Dashboard from '../Dashboard/Dashboard';
import Details from '../Details/Details';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


class App extends Component {
  constructor(){
    super();
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Router history={browserHistory}>
            <Route path='/' component={Dashboard} />
            <Route path='/details' component={Details} />
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Dashboard from '../Dashboard/Dashboard';
import Details from '../Details/Details';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class App extends Component {

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

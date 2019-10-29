import React, { Component } from 'react';
import './vendor/bootstrap/css/bootstrap.min.css';
import './css/one-page-wonder.min.css';
import './App.css';
import { BrowserRouter as Router, Route, withRouter} from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import { Switch } from 'react-router-dom';
import UserPage from './pages/UserPage';
import Landing from "./pages/landing"

class App extends Component {
  render() {
    return(
      <Router>
        <Switch>
          <Route exact path="/" component={withRouter(Landing)} />
          <Route path="/signup" component={withRouter(Signup)} />
          <Route path="/login" component={Login} />
          <Route path='/userpage' component={UserPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;

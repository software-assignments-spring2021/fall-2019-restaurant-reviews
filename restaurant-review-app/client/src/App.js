import React from 'react';
import './vendor/bootstrap/css/bootstrap.min.css';
import './css/one-page-wonder.min.css';
import './App.css';
//import BrowserRouter 
import {BrowserRouter as Router, Route} from 'react-router-dom';
//import components
import Restaurant from './containers/Restaurants/Restaurant';

import Landing from './Landing';

class App extends React.Component {
  render(){
    return (
      <Router>

        <div>
          <Route path='/' component={Landing} exact />
          <Route path='/restaurant' component={Restaurant} />
        </div>
      </Router>
  
    


      
    );
  }
}

export default App;

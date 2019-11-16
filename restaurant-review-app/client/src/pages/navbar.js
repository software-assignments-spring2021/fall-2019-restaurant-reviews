import React from 'react';
import { Link } from 'react-router-dom';
import '../css/one-page-wonder.min.css';
import '../App.css';


function NavBar(props) {
  
    //if user logs in and the token is not expired within an hour, display PROFILE, LOG OUT on nav bar 
    if(props.loggedin){
      
      return(
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
          <div className="container">
            <Link className="navbar-brand" to="/">rate the plate</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" 
            aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item" onClick={props.onClick}>
                  <Link className="nav-link" to="/">Sign Out</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/userpage">Profile</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    }
    return (<nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
    <div className="container">
      <Link className="navbar-brand" to="/">rate the plate</Link>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" 
      aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
         
            <Link className="nav-link" to="/signup">Sign Up</Link>

          </li>
          <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>  
          </li>
        </ul>
      </div>
    </div>
  </nav>
  );
}

export default NavBar;
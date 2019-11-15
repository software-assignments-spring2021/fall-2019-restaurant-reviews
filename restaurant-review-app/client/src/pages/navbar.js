import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/one-page-wonder.min.css';
import '../App.css';


function NavBar() {
    
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
          <li className="nav-item">
            <Link className="nav-link" to="/userpage">My User Page</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  );
}

export default NavBar;
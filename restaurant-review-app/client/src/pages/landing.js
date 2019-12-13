import React, { Component } from "react";
// import '../vendor/bootstrap/css/bootstrap.min.css';
import "../css/one-page-wonder.min.css";
import "../App.css";
import NavBar from "./navbar";
//import { BrowserRouter as Router} from "react-router-dom";
//import Signup from "./signup";
//import Login from "./login";
// import { Switch } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { MDBCol, MDBIcon } from "mdbreact";
// import SelectSearch from 'react-select-search'
import Autocomplete from "../Autocomplete";
import axios from "axios";

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ids: [],
      names: [],
      my_dict: {}
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/restaurant").then(response => {
      if (response.data.length > 0) {
        console.log(response.data);
        var keys = response.data.map(restaurant => restaurant.name);
        var values = response.data.map(restaurant => restaurant._id);
        var result = {};
        keys.forEach((key, i) => (result[key] = values[i]));

        console.log(result);
        this.setState({
          names: keys,
          my_dict: result

          // ids: response.data.map(restaurant => restaurant._id),
          // names: response.data.map(restaurant => restaurant.name),

          // my_dict: this.state.names.map(function(obj,index){
          //   var myobj = {};
          //   myobj[this.state.ids[index]] = obj;
          //   return myobj;
          // })
        });
      }
      console.log(typeof this.state.my_dict);
    });
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <header className="masthead text-center text-white">
          <div className="masthead-content">
            <div className="container">
              <h2 className="masthead-subheading mb-0">
                Rate The Plate
              </h2>
              <Autocomplete
                className="container2"
                suggestions={this.state.my_dict}
                loggedStatus={this.state.loggedIn}
              />
            </div>
          </div>

          <div className="bg-circle-1 bg-circle"></div>
          <div className="bg-circle-2 bg-circle"></div>
          <div className="bg-circle-3 bg-circle"></div>
          <div className="bg-circle-4 bg-circle"></div>
        </header>

        <section>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="p-5">
                  <img
                    className="img-fluid rounded-circle"
                    src={require("../img/food1.jpeg")}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="p-5">
                  <h2 className="display-4">For those who want the best!</h2>
                  <p>
                    The main purpose of RRA is to give its users (restaurant
                    goers) clear and concise information on individual dishes of
                    any given restaurant without them having to read hundreds of
                    overly-enthusiastic, hateful, or paid-for reviews.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 order-lg-2">
                <div className="p-5">
                  <img
                    className="img-fluid rounded-circle"
                    src={require("../img/food3.jpeg")}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-lg-6 order-lg-1">
                <div className="p-5">
                  <h2 className="display-4">Find the Best!</h2>
                  <p>
                    Search through restaurants in NYC and see aggregated scores
                    for dishes served at your restaurant of choice!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-5 bg-black">
          <div className="container">
            <p className="m-0 text-center text-white small">
              <a
                className="nav-link"
                href="https://github.com/nyu-software-engineering/fall-2019-restaurant-reviews"
              >
                Contact The Team
              </a>
            </p>
          </div>
        </footer>

        <script src="../vendor/jquery/jquery.min.js"></script>
        <script src="../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
      </div>
    );
  }
}

function getRestaurantList() {
  axios.get("http://localhost:5000/restaurant").then(response => {
    if (response.data.length > 0) {
      console.log(response.data.map(restaurant => restaurant.name));
      return response.data.map(restaurant => restaurant.name);
    }
  });
}

function refreshPage() {
  window.location.reload();
}

export default Landing;

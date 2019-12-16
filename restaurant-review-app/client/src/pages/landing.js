import React, { Component } from "react";
import "../css/one-page-wonder.min.css";
import "../App.css";
import NavBar from "./navbar";
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
              <br/>
              <h2 className="masthead-subheading mb-0">
                Rate The Plate
              </h2>
              <br/>
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
                  <h2 className="display-4">Why did we make Rate The Plate?</h2>
                  <p>

                    The resources to help users find restaurants to eat at 
                    are plentiful. 
                    However, even the best restaurants can 
                    have unsatisfactory dishes. 
                    Rate the Plate was made to
                    address this issue by offering restaurant-goers a new 
                    kind of tool. Instead of having to scour through hundreds
                    of overly-enthusiastic, hateful, or paid-for reviews,
                    in order to find information on certain dishes, users
                    can see a precise quantitative score on each menu item.

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
                  <h2 className="display-4">How does RTP work?</h2>
                  <p>
                    
                    The first step is to find your restaurant by searching
                    for it from the landing page. 
                    Next, you will be presented
                    with some basic information about the restaurant, such as
                    it's address, cuisine and overall rating. 
                    As you scroll
                    down, you will be able to see ratings for each of the
                    individual menu items along with some comments about that
                    dish in particular. This should help you know what to
                    order. Once you've decided what to order and have eaten,
                    we encourage you to leave your own ratings and comments
                    on the plates you ate for other restaurant-goers!

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


export default Landing;

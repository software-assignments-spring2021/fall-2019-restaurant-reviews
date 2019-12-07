import React, { Component } from "react";
import axios from "axios";
// import '../vendor/bootstrap/css/bootstrap.min.css';
// import { BrowserRouter as Router} from "react-router-dom";
// import { Switch } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import NavBar from "../pages/navbar";
import Dish from "../components/Dish";
import { ClipLoader } from "react-spinners";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.favoriteHandler = this.favoriteHandler.bind(this);
    this.makeDishes = this.makeDishes.bind(this);
    this.updateRating = this.updateRating.bind(this);

    this.state = {
      name: "",
      dishes: [],
      snippets: [],
      id: null,
      stared: true,
      loggedIn: false,
      loading: true,
      userRatings: {}
    };
  }

  componentDidMount() {
    const { handle } = this.props.match.params;
    const userID = localStorage.getItem("userID");
    if (userID != null) {
      this.setState({ loggedIn: true });
    }
    axios
      .get(`http://localhost:5000/restaurant/${handle}`)
      .then(res => {
        this.setState({
          name: res.data["name"],
          dishes: res.data["menu"],
          snippets: res.data["menu_snippets"],
          id: res.data["_id"],
          address: res.data["address"],
          rating: res.data["rating"],
          cuisine: res.data["cuisine"],
          items: res.data["menu_items"]
        });
      })
      .catch(err => {
        console.log("fuckkkk");
        console.log(err);
      });
  }
  favoriteHandler(e) {
    e.preventDefault();
    console.log(this);
    const userID = localStorage.getItem("userID");
    //console.log(this.state.name);

    if (userID === null) {
      alert("You must log in to star your favorite restaurants!");
    } else {
      const newfav = { newFavorite: this.state.name };
      axios
        .post("http://localhost:5000/user/" + userID + "/favorites/add", newfav)
        .then(res => {
          this.setState({ stared: true });
        })
        .catch(err => "Err" + err);
    }
    alert("You have stared this restaurant!");
  }

  getUrlParameter(url, parameter) {
    parameter = parameter.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?|&]" + parameter.toLowerCase() + "=([^&#]*)");
    var results = regex.exec("?" + url.toLowerCase().split("?")[1]);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  makeDishes(dishes) {
    var arr = [];
    for (const name of Object.keys(dishes)) {
      let ratings = dishes[name][1].slice();
      if (this.state.userRatings[name] !== undefined) {
        ratings.push(this.state.userRatings[name]);
      }
      arr.push(
        <Dish
          dishName={name}
          dishSnippets={dishes[name][0]}
          dishRating={this.averageRating(ratings)}
          triggerParentUpdate={this.updateRating}
        />
      );
    }
    return arr;
  }

  split(obj) {
    let objOne = {};
    let objTwo = {};
    let i = 0;
    for (const name of Object.keys(obj)) {
      i += 1;

      if (i > Object.keys(obj).length / 2) {
        objTwo[name] = obj[name];
      } else {
        objOne[name] = obj[name];
      }
    }
    return [objOne, objTwo];
  }

  updateRating(num, name) {
    let user = this.state.userRatings;
    user[name] = num;
    this.setState({
      userRatings: user
    });
  }

  averageRating(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
      total += arr[i];
    }
    return (total / arr.length).toFixed(2);
  }

  render() {
    if (this.state.items !== undefined) {
      let x = this.split(this.state.items);
      let y = x[0];
      let z = x[1];

      return (
        <div className="App" style={{ backgroundColor: "rgb(235, 235, 235)" }}>
          <NavBar loggedin={this.state.loggedIn} />
          <header
            className="masthead text-black"
            style={{ height: "450px", paddingTop: "calc(4rem + 72px)" }}
          >
            <div className="masthead-content">
              <div className="container">
                <h2 className="masthead-subheading text-left res">
                  {this.state.name}
                </h2>
                <h4 className="res" align="left">
                  {" "}
                  {this.state.address}{" "}
                </h4>
                <h4 className="res" align="left">
                  {" "}
                  {this.state.rating} star restaurant
                </h4>
                <h4 className="res" align="left">
                  {" "}
                  {this.state.cuisine}{" "}
                </h4>

                <button
                  type="button"
                  class="btn btn-outline-warning"
                  onClick={this.favoriteHandler}
                >
                  Add to my favorite.
                </button>
              </div>
            </div>
          </header>
          <div className="items">
            <MDBRow className="no-gutters">
              <MDBCol>{this.makeDishes(y)}</MDBCol>
              <MDBCol>{this.makeDishes(z)}</MDBCol>
            </MDBRow>
          </div>
        </div>
      );
    } else {
      return (
        <div className="center-screen ">
          <ClipLoader
            sizeUnit={"px"}
            size={150}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
      );
    }
  }
}

export default Restaurant;

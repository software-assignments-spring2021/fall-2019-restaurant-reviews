import React, { Component } from "react";
import axios from "axios";
import NavBar from "../pages/navbar";
import Dish from "../components/Dish";
import { ClipLoader } from "react-spinners";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBFormInline,
  MDBBtn,
  MDBInput
} from "mdbreact";
import Sentiment from "sentiment";

class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.favoriteHandler = this.favoriteHandler.bind(this);
    this.makeDishes = this.makeDishes.bind(this);
    this.updateUserStates = this.updateUserStates.bind(this);
    this.checkStarStatus = this.checkStarStatus.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.state = {
      name: "",
      dishes: [],
      snippets: [],
      id: null,
      stared: false,
      loading: true,
      userRatings: {},
      userComments: {},
      searchValue: "",
      sentences: [],
      none: false
    };
  }

  checkStarStatus(resname, userID) {
    axios.get("http://localhost:5000/user/" + userID).then(res => {
      const favs = res.data["favoriteRes"];
      const userInput = res.data["userInput"];
      if (favs.includes(resname)) {
        this.setState({ stared: true });
      }
    });
  }
  componentDidMount() {
    const { handle } = this.props.match.params;
    const userID = localStorage.getItem("userID");

    axios
      .get(`http://localhost:5000/restaurant/${handle}`)
      .then(res => {
        this.setState({
          name: res.data["name"],
          dishes: res.data["menu"],
          id: res.data["_id"],
          address: res.data["address"],
          rating: res.data["rating"],
          cuisine: res.data["cuisine"],
          items: res.data["menu_items"],
          reviews: res.data["reviews"],
          userSnippets: res.data["new_reviews"]
        });
        this.checkStarStatus(res.data["name"], userID);
      })
      .catch(err => {
        console.log(err);
      });

    if (userID != null) {
      this.setState({ loggedIn: true });
    }
  }
  favoriteHandler(e) {
    e.preventDefault();
    const userID = localStorage.getItem("userID");

    if (userID === "null") {
      alert("You must log in to star your favorite restaurants!");
    } else {
      const restaurant = { newFavorite: this.state.name };
      if (this.state.stared == false) {
        axios
          .post(
            "http://localhost:5000/user/" + userID + "/favorites/add",
            restaurant
          )
          .then(res => {
            this.setState({ stared: true });
          })
          .catch(err => "Err" + err);
        //alert("You have stared this restaurant!");
      } else {
        axios
          .put(
            "http://localhost:5000/user/" + userID + "/favorites/delete",
            restaurant
          )
          .then(res => {
            this.setState({ stared: false });
          })
          .catch(err => "Err" + err);
        //alert("You have unstared this restaurant!");
      }
    }
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
      let comments = dishes[name][0].slice();
      let userSnippets = this.state.userSnippets;
      let userComments = [];
      let userRatings = [];
      for (let i = 0; i < userSnippets.length; i++) {
        if (userSnippets[i]["dishname"] === name) {
          for (let j = 0; j < userSnippets[i]["ratings"].length; j++) {
            ratings.push(userSnippets[i]["ratings"][j]);
          }
          for (let j = 0; j < userSnippets[i]["comments"].length; j++) {
            comments.push(userSnippets[i]["comments"][j]);
          }
          // userRatings = userSnippets[i]["ratings"];
          // comments.push(userSnippets[i]["comments"]);
          break;
        }
      }

      if (this.state.userRatings[name] !== undefined) {
        ratings.push(this.state.userRatings[name]);
      }
      if (this.state.userComments[name] !== undefined) {
        comments.splice(0, 0, this.state.userComments[name]);
        // comments.push(this.state.userComments[name]);
      }
      // ratings.concat(userRatings);
      console.log("comments for ", name, comments);

      arr.push(
        <Dish
          dishName={name}
          dishSnippets={comments}
          dishUserSnippets={userComments}
          dishRating={this.averageRating(ratings)}
          triggerParentUpdate={this.updateUserStates}
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

  updateUserStates(num, name, comment) {
    let ratings = this.state.userRatings;
    ratings[name] = num;
    let comments = this.state.userComments;
    if (comment.trim() !== "") {
      let converted = (num - 3) * 0.5;
      comments[name] = [comment, converted];
    }

    this.setState({
      userRatings: ratings,
      userComments: comments
    });
    const { handle } = this.props.match.params;
    const newRating = {
      dishrating: num,
      dishname: name,
      comments: comments[name]
    };
    axios
      .post(
        `http://localhost:5000/restaurant/${handle}/add/rating&comment`,
        newRating
      )
      .then(res => {
        console.log("success", res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  averageRating(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
      total += parseInt(arr[i]);
    }
    return (total / arr.length).toFixed(2);
  }

  handleOnClick() {
    const search = this.state.searchValue;
    this.setState({
      searched: search
    });
    const reviews = this.state.reviews;
    let sentences = [];
    for (let r = 0; r < reviews.length; r++) {
      let review = reviews[r];
      review = review.substring(1);
      review = review.replace(/\r?\n|\r/g, " ");
      review = review.match(/[^\.!\?]+[\.!\?]+/g);
      if (review !== null) {
        for (let s = 0; s < review.length; s++) {
          const sentence = review[s];
          if (sentence.toLowerCase().indexOf(" " + search + " ") !== -1) {
            sentences.push(sentence);
            this.getSentiment(sentence);
          }
        }
      }
    }
    if (sentences.length === 0) {
      this.setState({
        none: true,
        sentences: sentences
      });
    } else {
      this.setState({
        none: false,
        sentences: sentences
      });
    }
  }

  getSentiment(sentence) {
    var sentiment = new Sentiment();
    var result = sentiment.analyze(sentence);
    //console.log(result.comparative);
    return result.comparative;
  }

  findDish(text, dish) {
    let t = [];
    let index = text.toLowerCase().indexOf(dish);
    if (index === -1) {
      t.push(<span>{text}</span>);
    } else {
      let first = text.slice(0, index);
      let bold = text.slice(index, index + dish.length);
      let second = text.slice(index + dish.length);
      t.push(<span>{first}</span>);
      t.push(<span style={{ fontWeight: "bold" }}>{bold}</span>);
      t.push(<span>{second}</span>);
    }
    return t;
  }

  makeCards(sentences) {
    let cards = [];
    if (sentences.length === 0) {
      return [];
    }
    for (let i = 0; i < sentences.length; i++) {
      let score = this.getSentiment(sentences[i]);
      let color = `rgb(${255 - 255 * score}, ${255 + 255 * score},0)`;
      cards.push(
        <MDBCard
          className=" z-depth-1"
          style={{
            height: "100px",
            width: "400px",
            display: "inline-block",
            overflowY: "scroll",
            whiteSpace: "normal",
            textAlign: "left",
            margin: "8px",
            borderStyle: "solid",
            borderWidth: "3px",
            borderColor: color
          }}
        >
          <div
            style={{
              padding: "0.5rem",
              fontSize: "18px",
              textAlign: "left"
            }}
          >
            {this.findDish(sentences[i], this.state.searched)}
          </div>
        </MDBCard>
      );
    }
    return cards;
  }

  render() {
    let searchSize = "70px";
    if (this.state.sentences.length !== 0) {
      searchSize = "200px";
    } else if (this.state.none === true) {
      searchSize = "100px";
    }

    if (this.state.items !== undefined) {
      let x = this.split(this.state.items);
      let y = x[0];
      let z = x[1];

      //use the state design pattern to check if the user has already starred the restaurant or not.
      //if it's starred, display "add it to favorites". Otherwise, display unfavorite the restaurant.
      let favbutton = null;

      if (this.state.stared == false)
        favbutton = (
          <button
            type="button"
            className="goldstar bglightgrey"
            onClick={this.favoriteHandler}
          >
            ☆
          </button>
        );
      else {
        favbutton = (
          <button
            type="button"
            className="goldstar bglightgrey"
            onClick={this.favoriteHandler}
          >
            ★
          </button>
        );
      }
      return (
        //bottom background
        <div className="bgblue">
          <NavBar />
          <header
            className="bglightgrey"
            style={{ height: "332px", paddingTop: "90px" }}
          >
            <br />
            <div className="masthead-content">
              <div className="container res">
                <h2
                  className=" text-left res"
                  style={{ fontSize: "50px", fontFamily: "Catamaran" }}
                >
                  {this.state.name}
                  {favbutton}
                </h2>
                <h4
                  className="res"
                  align="left"
                  style={{ fontFamily: "Catamaran" }}
                >
                  {this.state.address}
                </h4>
                <h4
                  className="res"
                  align="left"
                  style={{ fontFamily: "Catamaran" }}
                >
                  {this.state.rating} star restaurant
                </h4>
                <h4
                  className="res"
                  align="left"
                  style={{ fontFamily: "Catamaran" }}
                >
                  {this.state.cuisine}
                </h4>
              </div>
            </div>
          </header>

          <div
            class="card peach-gradient squarecorners"
            style={{ height: searchSize }}
          >
            <MDBFormInline
              className="md-form mr-auto mt-1 mb-0"
              style={{
                marginLeft: "11%"
              }}
            >
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search for a keyword..."
                aria-label="Search"
                onChange={event => {
                  this.setState({
                    searchValue: event.target.value.toLowerCase()
                  });
                }}
              />
              <MDBBtn
                class="bglightgrey black-text btn Ripple-parent mr-auto btn-rounded btn-sm"
                color="#333333"
                rounded
                size="sm"
                className="mr-auto"
                tag="a"
                role="button"
                onClick={this.handleOnClick}
              >
                <b>Search</b>
              </MDBBtn>
            </MDBFormInline>
            <div
              className="mr-5 ml-5 mt-0"
              style={{
                overflowY: "hidden",
                whiteSpace: "nowrap",
                overflowX: "auto",
                position: "relative",
                display: "inline-block",
                marginBottom: "10px"
              }}
            >
              {this.state.none ? (
                <span style={{ marginLeft: "8%" }}>No results found</span>
              ) : (
                this.makeCards(this.state.sentences)
              )}
            </div>
          </div>

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

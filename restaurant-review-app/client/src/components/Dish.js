import React, { Component } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from "mdbreact";
import "../vendor/bootstrap/css/bootstrap.css";

import axios from "axios";
import StarRatingComponent from "react-star-rating-component";
import StarRatings from "react-star-ratings";

class Dish extends Component {
  constructor(props) {
    super(props);
    // this.changeRating = this.changeRating.bind(this);
    this.state = {
      rating: "",
      message: "add your rating"
    };
  }

  // changeRating(newRating, name) {
  //   this.setState({
  //     rating: newRating
  //   });
  // }

  // onChangeHandler(event) {
  //   event.preventDefault();
  //   this.setState({
  //     rating: event.target.value
  //   });
  // }

  // onStarClick(nextValue, prevValue, name) {
  //   this.setState({ rating: nextValue, message: "your rating" });
  //   this.props.triggerParentUpdate(nextValue, this.props.dishName);
  // }

  snippets(text, dish) {
    let s = [];
    for (var i = 0; i < 6; i++) {
      if (text[i] !== "") {
        if (text[i][0].trim() !== "") {
          let color = `rgb(
            ${255 - 255 * text[i][1]}, 
            ${255 + 255 * text[i][1]},
             0)`;
          s.push(
            <MDBCard
              style={{
                margin: "8px",
                borderStyle: "solid",
                borderWidth: "4px",
                borderColor: color
              }}
              className="rounded-snippet"
            >
              <div
                style={{
                  padding: "1rem",
                  fontSize: "20px",
                  textAlign: "left"
                }}
              >
                {/* {text[i][0]} */}
                {this.findDish(text[i][0], dish)}
              </div>
            </MDBCard>
          );
        }
      }
    }
    return s;
  }

  findDish(text, dish) {
    let t = [];
    let index = text.indexOf(dish);
    // console.log("index", index);
    let first = text.slice(0, index);
    let bold = text.slice(index, index + dish.length);
    let second = text.slice(index + dish.length);
    // console.log("first: ", first);
    // console.log("bold: ", bold);
    // console.log("second: ", second);
    t.push(<span>{first}</span>);
    t.push(<span style={{ fontWeight: "bold" }}>{bold}</span>);
    t.push(<span>{second}</span>);
    return t;
  }

  render() {
    var dishName = this.props.dishName;
    var dishSnippets = this.props.dishSnippets;
    var dishRating = parseFloat(this.props.dishRating);

    return (
      <div style={{ margin: "40px" }}>
        <MDBCard
          style={{
            maxHeight: "550px",
            backgroundImage:
              "linear-gradient(to bottom, rgb(255, 166, 0), 20%,rgb(255,255,255) )",
            padding: "20px"
          }}
          className="rounded-dish"
        >
          <MDBCardBody cascade className="text-center view-cascade ">
            <h1 className="h2-responsive mb-2 res" style={{ color: "black " }}>
              {dishName.toUpperCase()}
            </h1>
            <h2>
              <StarRatings
                starEmptyColor="white"
                starRatedColor="red"
                numberOfStars={5}
                rating={dishRating}
                name="rating"
                starDimension="30px"
              />
            </h2>
            <MDBCardText style={{ overflow: "scroll", maxHeight: "24rem" }}>
              {this.snippets(dishSnippets, dishName)}
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </div>
    );
  }
}

export default Dish;

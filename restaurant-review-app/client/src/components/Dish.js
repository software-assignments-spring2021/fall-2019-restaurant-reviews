import React, { Component } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBIcon,
  MDBContainer,
  MDBInputGroup,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBBtn
} from "mdbreact";
import "../vendor/bootstrap/css/bootstrap.css";

import axios from "axios";
import StarRatings from "react-star-ratings";

class Dish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: "",
      button: "disabled",
      value: [0, 1, 2, 3, 4]
    };
  }

  onChange = e => {
    console.log("here ", e);
    var newValue = e.nativeEvent.target.value;
    this.setState({ rating: newValue, button: "" });
  };

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
                borderWidth: "2px",
                borderLeftColor: color
              }}
              className="z-depth-1 hoverable"
            >
              <div
                style={{
                  padding: "1rem",
                  fontSize: "18px",
                  textAlign: "left"
                }}
              >
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
    let first = text.slice(0, index);
    let bold = text.slice(index, index + dish.length);
    let second = text.slice(index + dish.length);

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

            padding: "20px"
          }}
          className="rounded-dish cloudy-knoxville-gradient
"
        >
          <MDBCardBody cascade className="text-center view-cascade ">
            <h1 className="h2-responsive mb-2 res" style={{ color: "black " }}>
              {dishName.toUpperCase()}
            </h1>
            <h2>
              <StarRatings
                starEmptyColor="white"
                starRatedColor="blue"
                numberOfStars={5}
                rating={dishRating}
                name="rating"
                starDimension="30px"
              />
            </h2>

            <MDBContainer>
              <MDBInputGroup
                containerClassName="mt-4 mb-4 mx-n4"
                size="lg"
                hint="Add comment..."
                type="textarea"
                style={{ width: "auto" }}
                prepend={
                  <div>
                    <select
                      className="browser-default custom-select primary-color text-light h-100"
                      style={{ fontSize: "24px" }}
                      test={this.getTextContent}
                      onChange={this.onChange}
                    >
                      <option>Rate</option>
                      <option value="5">5★</option>
                      <option value="4">4★</option>
                      <option value="3">3★</option>
                      <option value="2">2★</option>
                      <option value="1">1★</option>
                    </select>
                  </div>
                }
                append={
                  <MDBBtn
                    color="primary"
                    className={`m-0 z-depth-0 border border-3 ${this.state.button}`}
                  >
                    Submit
                  </MDBBtn>
                }
              />
            </MDBContainer>

            <MDBCardText style={{ overflow: "scroll", maxHeight: "16rem" }}>
              {this.snippets(dishSnippets, dishName)}
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </div>
    );
  }
}

export default Dish;

import React, { Component } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBIcon,
  MDBBtn,
  MDBInput
} from "mdbreact";
import "../vendor/bootstrap/css/bootstrap.css";

import StarRatings from "react-star-ratings";

class Dish extends Component {
  constructor(props) {
    super(props);

    this.submitInput = this.submitInput.bind(this);
    this.showComment = this.showComment.bind(this);

    this.state = {
      rating: "",
      userComment: "",
      button: "disabled",
      value: [0, 1, 2, 3, 4],
      submitted: false,
      show: false
    };
  }

  onChange = e => {
    console.log("here ", e);
    var newValue = e.nativeEvent.target.value;
    this.setState({ rating: newValue, button: "" });
  };

  submitInput() {
    this.setState({
      submitted: true
    });
    this.props.triggerParentUpdate(
      this.state.rating,
      this.props.dishName,
      this.state.userComment
    );
  }

  snippets(text, dish) {
    let s = [];
    for (var i = 0; i < text.length; i++) {
      console.log(text);
      if (text !== null && text[i] !== "" && text[i] !== null) {
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
  showComment() {
    this.setState({ show: true });
  }
  render() {
    var dishName = this.props.dishName;
    var dishSnippets = this.props.dishSnippets;
    var dishRating = parseFloat(this.props.dishRating);
    let commentCard;

    if (this.state.show) {
      commentCard = (
        <MDBCard className="mt-3 mb-1 mx-0">
          <div>
            <select
              className="browser-default custom-select primary-color text-light mt-2 ml-3 mb-0"
              style={{
                fontSize: "14px",
                width: "15%",
                float: "left"
              }}
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
            <br></br>
            <textarea
              className="form-control ml-3 mr-3"
              style={{ width: "94%" }}
              placeholder="Add comment..."
              rows="2"
              onChange={event => {
                this.setState({
                  userComment: event.target.value
                });
              }}
            />
          </div>
          <MDBBtn
            color="primary"
            style={{ float: "right", fontSize: "14px" }}
            className={`mr-3 mb-2 mt-0 z-depth-0 border border-3 ${this.state.button}`}
            onClick={this.submitInput}
          >
            Submit
          </MDBBtn>
        </MDBCard>
      );
    } else {
      commentCard = (
        <MDBBtn
          color="primary"
          style={{ textAlign: "center", fontSize: "14px" }}
          className={"mr-3 mb-2 mt-0 z-depth-0 border border-3"}
          onClick={this.showComment}
        >
          Leave a comment
        </MDBBtn>
      );
    }
    return (
      <div style={{ margin: "40px" }}>
        <MDBCard
          style={{
            maxHeight: "600px",

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

            <MDBCardText style={{ overflow: "scroll", maxHeight: "15rem" }}>
              {this.snippets(dishSnippets, dishName)}
            </MDBCardText>

            {commentCard}
          </MDBCardBody>
        </MDBCard>
      </div>
    );
  }
}

export default Dish;

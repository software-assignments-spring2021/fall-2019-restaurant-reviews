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
import axios from "axios";
import StarRatingComponent from "react-star-rating-component";

class Dish extends Component {
  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.state = {
      rating: "",
      rated: false,
      message: "add your rating"
    };
  }

  onChangeHandler(event) {
    event.preventDefault();
    this.setState({
      rating: event.target.value
    });
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue, message: "your rating" });
    this.props.triggerParentUpdate(nextValue, this.props.dishName);
  }

  snippets(text) {
    let s = [];
    for (var i = 0; i < 6; i++) {
      console.log(text[i]);
      if (text[i].trim() !== "") {
        s.push(<li>{text[i]}</li>);
      }
    }
    return s;
  }

  render() {
    var dishName = this.props.dishName;
    var dishSnippets = this.props.dishSnippets;
    var dishRating = this.props.dishRating;
    return (
      <MDBCard>
        <MDBCardImage
          className="view view-cascade gradient-card-header peach-gradient"
          cascade
          tag="div"
        >
          <h2 className="h2-responsive mb-2">{dishName.toUpperCase()}</h2>
        </MDBCardImage>
        <MDBCardBody cascade className="text-center">
          <MDBCardText>
            <h1>
              {dishRating}
              <i className="fas fa-star"></i>
            </h1>

            <StarRatingComponent
              name="rate"
              starCount={5}
              value={this.state.rating}
              onStarClick={this.onStarClick.bind(this)}
            />
            <p>{this.state.message}</p>
            {/* <ul style={{ textAlign: "left" }}>{this.snippets(dishSnippets)}</ul> */}
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    );
  }
}

export default Dish;

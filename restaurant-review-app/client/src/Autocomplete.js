import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { MDBCol, MDBIcon } from "mdbreact";
import "./App.css";
import axios from "axios";
import { Link } from "react-router-dom";

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Object)
  };

  static defaultProps = {
    suggestions: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: "",
      clicked: false
    };
  }

  // Event fired when the input value is changed
  onChange = e => {
    // console.log(this.props.suggestionszz);
    const suggestions = Object.keys(this.props.suggestions);
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
      clicked: true
    });
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;
    // const us = this.state.userInput;
    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
      e.preventDefault();

      // console.log(this.state.userInput);
      // alert(this.state.userInput);
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          
          <nav class="suggest">
            <ul class="suggestions">
              {filteredSuggestions.map((suggestion, index) => {
                let className;

                // Flag the active suggestion with a class
                if (index === activeSuggestion) {
                  className = "suggestion-active";
                }

                return (
                  <li className={className} key={suggestion} onClick={onClick}>
                    {suggestion}
                  </li>
                );
              })}
            </ul>
          </nav>
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No such restaurant</em>
          </div>
        );
      }
    }

    if (this.state.clicked) {
      console.log("clicked");
      window.location = `/restaurant/${
        this.props.suggestions[this.state.userInput]
      }`;
    }

    return (
      <Fragment>
        <div>
          <MDBCol md="12">
            <form>
              <input
                style={{ display: "inline-block"}}
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={userInput}
                className="form-control form-control-lg ml-4 w-75"
                type="text"
                placeholder="Start typing..."
                aria-label="Search"
              />
            </form>
            {suggestionsListComponent}
          </MDBCol>
        </div>
      </Fragment>
    );
  }
}

export default Autocomplete;

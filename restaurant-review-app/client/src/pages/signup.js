import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import "../App.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../vendor/bootstrap/css/bootstrap.min.css';
import '../css/one-page-wonder.min.css';
import axios from "axios";

class Signup extends Component {

    constructor(props) {
        super(props);
    
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            email: '',
            password: '',
            firstname: '',
            lastname: ''
        }
    }
    
    onChangeEmail(e) {
        this.setState({
          email: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
          password: e.target.value
        })
    }

    onChangeFirstname(e) {
        this.setState({
          firstname: e.target.value
        })
    }
    onChangeLastname(e) {
        this.setState({
          lastname: e.target.value
        })
    }
    
    onSubmit(e) {
        e.preventDefault();
    
        const user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password
        }
        console.log(user);
    
        axios.post('http://localhost:6000/user/register', user)
          .then(res => console.log(res.data));
    
        this.setState({
          email: '',
          password: '',
          firstname: '',
          lastname: ''
        })
      }

    render() {
        return (
            <div className="bg">
                <MDBContainer>
                    <MDBRow>
                    <MDBCol>
                            <MDBCol md="6">
                            <MDBCard >
                                <div className="header pt-3 peach-gradient">
                                <MDBRow className="d-flex justify-content-center">
                                    <h3 className="white-text mb-3 pt-3 font-weight-bold">
                                    Sign Up
                                    </h3>
                                </MDBRow>
                                <MDBRow className="mt-2 mb-3 d-flex justify-content-center">
                                    <a href="#!" className="fa-lg p-2 m-2 fb-ic">
                                    <MDBIcon fab icon="facebook-f" size="lg" className="white-text" />
                                    </a>
                                    <a href="#!" className="fa-lg p-2 m-2 gplus-ic">
                                    <MDBIcon fab className="fa-google-plus-g white-text fa-lg" />
                                    </a>
                                </MDBRow>
                                </div>
                                <MDBCardBody className="mx-4 mt-4">
                                    <MDBInput 
                                        label="First Name" 
                                        group type="text" 
                                        validate 
                                        containerClass="mb-0"
                                        value={this.state.firstname}
                                        onChange={this.onChangeFirstname}
                                    />
                                    <MDBInput 
                                        label="Last Name" 
                                        group type="text" 
                                        validate 
                                        containerClass="mb-0"
                                        value={this.state.lastname}
                                        onChange={this.onChangeLastname}
                                    />
                                    <MDBInput 
                                        label="Your email" 
                                        group type="text" 
                                        validate 
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                    />
                                    <MDBInput
                                        label="Your password"
                                        group type="password"
                                        validate
                                        containerClass="mb-0"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                    />
                                
                                <MDBRow className="d-flex align-items-center mb-4 mt-5">
                                    <MDBCol md="5" className="d-flex align-items-start">
                                    <div className="text-center">
                                        <MDBBtn
                                        color="orange"
                                        rounded
                                        type="button"
                                        className="z-depth-1a"
                                        onClick={this.onSubmit}
                                        >
                                        Sign Up!
                                        </MDBBtn>
                                    </div>
                                    </MDBCol>
                                </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                            </MDBCol>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}

export default Signup;
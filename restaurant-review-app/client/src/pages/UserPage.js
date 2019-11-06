import React, {Component} from 'react';
import '../vendor/bootstrap/css/bootstrap.css';
import "mdbreact/dist/css/mdb.css";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import { BrowserRouter as Router} from "react-router-dom";
import { Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/one-page-wonder.css';

class UserPage extends Component {  
    state = {
        email       : '',
        favRest     : []
    }

    componentDidMount() {
        this.setState({
            email       : 'andyhamilton@nyu.edu',
            favRest     : ['Chipotle', 'McDonalds', 'Pizza Hut']
        });
    }

    render () {
        return (
            <div className="bg">
                <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to="/">rate the plate</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" 
                        aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">Sign Up</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/userpage">My User Page</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <br/><br/><br/><br/>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="12">
                        <MDBCard>
                            <div className="header pt-3 peach-gradient">
                            <MDBRow className="d-flex justify-content-center">
                                <h3 className="white-text mb-3 pt-3 font-weight-bold"> Your Profile </h3>
                            </MDBRow>
                            </div>
                            <MDBCardBody className="mx-4 mt-4">
                            Welcome back, <b>{this.state.email}</b>!
                            <div align="right">
                                <MDBBtn
                                    color="orange"
                                    rounded
                                    type="button"
                                    className="z-depth-1a"
                                    align="right"
                                    onClick={this.onSubmit} >
                                        Change Email
                                </MDBBtn>
                                <MDBBtn
                                    color="orange"
                                    rounded
                                    type="button"
                                    className="z-depth-1a"
                                    align="right"
                                    onClick={this.onSubmit} >
                                        Change Password
                                </MDBBtn>
                            </div>
                            <br/><br/>
                            <b padding="1px"> &nbsp;&nbsp; Your Starred Restaurants:</b> <br/>
                            <div class="list-group">
                            <button type="button" class="list-group-item list-group-item-action">⭐ Chipotle </button>
                            <button type="button" class="list-group-item list-group-item-action">⭐ McDonalds</button>
                            <button type="button" class="list-group-item list-group-item-action">⭐ Dominoes</button>
                            <button type="button" class="list-group-item list-group-item-action">⭐ Sticky's</button>
                            <button type="button" class="list-group-item list-group-item-action">⭐ Halal Guys</button>
                            <button type="button" class="list-group-item list-group-item-action">⭐ Papaya Dog</button>
                            </div>
                            </MDBCardBody>
                        </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}
function refreshPage(){ 
    window.location.reload(); 
}
export default UserPage;
import React, {Component} from 'react';
import '../vendor/bootstrap/css/bootstrap.css';
import "mdbreact/dist/css/mdb.css";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
// import { BrowserRouter as Router} from "react-router-dom";
// import { Switch } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import '../css/one-page-wonder.css';
import NavBar from './navbar';

class UserPage extends Component { 
    constructor(props) {
        
        super(props);
        this.signoutHandler =this.signoutHandler.bind(this);
        this.state = {
            email       : '',
            favRest     : [],
            loggedIn: false,        
        }
    }

    
    signoutHandler(){
        const {history} =this.props;
        this.setState({loggedIn:false});
        localStorage.setItem('jwtToken',null);
        history.push('/');
    }

    componentDidMount() {
        let loggedin = (localStorage.getItem('jwtToken') === null) ? false:true;
      
        console.log(loggedin);
        this.setState({
            email: 'andyhamilton@nyu.edu',
            favRest: ['Chipotle', 'McDonalds', 'Pizza Hut'],
            loggedIn: loggedin
        });
        console.log(this.state.loggedIn);
    }

    render () {
        return (
            <div className="bg">
            <NavBar loggedin = {this.state.loggedIn} onClick = {this.signoutHandler}/>

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
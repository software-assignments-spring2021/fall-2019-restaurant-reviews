import React, {Component} from 'react';
import '../vendor/bootstrap/css/bootstrap.css';
import "mdbreact/dist/css/mdb.css";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBCardTitle, MDBCardText } from 'mdbreact';
// import { BrowserRouter as Router} from "react-router-dom";
// import { Switch } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import '../css/one-page-wonder.css';
import NavBar from './navbar';
import axios from 'axios';
import FavoriteResList from '../components/FavoriteResList';

class UserPage extends Component { 
    constructor(props) {
        
        super(props);
        this.signoutHandler =this.signoutHandler.bind(this);
        this.passChangeHandler = this.passChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);

        this.state = {
            firstname   : '',
            email       : '',
            favRest     : [],
            loggedIn: false,        
        }
    }

    
    signoutHandler(){
        const {history} =this.props;
        this.setState({loggedIn:false});
        localStorage.setItem('jwtToken',null);
        localStorage.setItem('userID',null);
        history.push('/');
    }

    componentDidMount() {
        let loggedin = (localStorage.getItem('jwtToken') === null) ? false:true;
        
        if(loggedin){
            
            const userId = localStorage.userID;
            axios.get('http://localhost:5000/user/' + userId)
            .then(res =>{
                console.log(res.data);
                this.setState({
                    firstname: res.data.firstname,
                    email: res.data.email,
                    favRest: res.data.favoriteRes,
                    loggedIn: loggedin
                });
                console.log(this.state.favRest);
            })
            .catch(err => {console.log('Err' + err);});
            

        }
        
    }

    passChangeHandler(e) {
        const user = {
            password: this.state.password
        }
        const userID = localStorage.userID;
        axios.put('http://localhost:5000/user/' + userID + '/changepassword', user);
    }

    emailChangeHandler(e) {
        const user = {
            email: this.state.email
        }
        const userID = localStorage.userID;
        axios.put('http://localhost:5000/user/' + userID + '/changeemail', user);
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

    render () {
        return(
            <div class="bguser">

            <NavBar loggedin = {this.state.loggedIn} onClick = {this.signoutHandler}/>
            <MDBContainer>
               <MDBRow>
                   <MDBCol md="12">

                   <MDBCard>
                   <div className="header pt-3 peach-gradient">
                       <MDBRow className="header pt-3 peach-gradient">
                         <h3 className="white-text mb-3 pt-3 font-weight-bold"> Welcome back, {this.state.firstname} </h3>
                       </MDBRow>
                    </div>

                    <MDBContainer>
                    <MDBRow className="mb-4">
                        <MDBCol sm="6">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle>Change your email</MDBCardTitle>
                                <MDBInput 
                                    outline color='primary'
                                    color="blue"
                                    label="Enter your new email here" 
                                    type="text" 
                                    className="z-depth-1a"
                                    align="left"
                                    validate
                                    onChange={this.onChangeEmail}
                                />

                                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                
                                <MDBBtn
                                        color="primary"
                                        onClick={this.emailChangeHandler}>
                                        Change Email
                                </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                        </MDBCol>

                        <MDBCol sm="6">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle>Edit your password</MDBCardTitle>
                                <MDBInput 
                                    outline color='primary'
                                    color="blue"
                                    label="Enter your new password here" 
                                    type="password" 
                                    className="z-depth-1a"
                                    align="left"
                                    validate
                                    onChange={this.onChangePassword}
                                />
                                
                                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                
                                <MDBBtn
                                        color="primary"
                                        onClick={this.passChangeHandler}>
                                        Edit Password
                                </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    </MDBContainer>

                    <MDBCardBody className="mx-4 mt-4">
                       <b padding="1px"> Your Starred Restaurants:</b> <br/>
                       {/* display user's favorite restaurants list  */}
                        <div>
                            <FavoriteResList favRes={this.state.favRest}/>
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

export default UserPage;
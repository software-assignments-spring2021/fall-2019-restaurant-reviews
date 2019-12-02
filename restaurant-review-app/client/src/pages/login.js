import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import "../App.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router} from "react-router-dom";
import { Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios";
import NavBar from './navbar'
import jwt from 'jsonwebtoken';

class Login extends Component { 

    constructor(props) {
        super(props);
    
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            email: '',
            password: '',
            emailErr:'',
            passwordErr:'',
            loginStatus:'',
            success:false,
            token:''
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
    
    validate(){
        let emailErr= '';

        if(!this.state.email.includes('@')){

            emailErr = 'Invalid Email.';
            this.setState({emailErr:emailErr});
                
            console.log(this.state.emailErr);
            return false;
        }

        let passwordErr= '';
        if(this.state.password === ""){
            passwordErr = "Password cannot be empty.";
            this.setState({passwordErr:passwordErr});
            return false;

        }

        return true;
    }
    onSubmit(e) {
        e.preventDefault();
        const isValid = this.validate();
        
        if(isValid){
            const user = {
                email: this.state.email,
                password: this.state.password
            }
            const {history} =this.props;
            //make a POST call to server to validate user data and get token
            axios.post('http://localhost:5000/user/login', user)
            .then(res => {
                
                this.setState({success:true,loginStatus:'Logged in!'});
                //store jwt in Cookie
                localStorage.setItem('jwtToken',res.data.token);
                localStorage.setItem('userID',res.data.id);
                history.push('/');
            })
            .catch(err => {
                console.log(err);
                this.setState({loginStatus:'Incorrect email or password',success:false});
                
            });


            this.setState({

                emailErr:'',
                passwordErr:'',
                loginStatus:'',
                success:false

            });
        }

       

     
    }
 
    render() {

        return (

            <div className="bg">
                <NavBar />
                <br/><br/>
                <br/><br/>
                <center>
                <MDBContainer>
                    <MDBRow>
                    <MDBCol>
                        <MDBCol md="6">
                            <MDBCard>
                                <div className="header pt-3 peach-gradient">
                                <MDBRow className="d-flex justify-content-center">
                                    <h3 className="white-text mb-3 pt-3 font-weight-bold">
                                    Log in
                                    </h3>
                                </MDBRow>
                                </div>
                                <MDBCardBody className="mx-4 mt-4">
                                <MDBInput 
                                    label="Your email" 
                                    group type="text" 
                                    validate 
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                />
                                <div style={{fontSize:15,color:"red"}}>                              
                                    {this.state.emailErr}
                                </div>
                                <MDBInput
                                    label="Your password"
                                    group
                                    type="password"
                                    validate
                                    containerClass="mb-0"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                />
                                {/*display error message */}
                                <div style={{fontSize:15,color:"red"}}>                              
                                    {this.state.passwordErr}
                                </div>
                                {/*display error message */}
                                <div style={{fontSize:15,color:"red"}}>                              
                                    {this.state.loginStatus}
                                </div>
                                <p className="font-small grey-text d-flex justify-content-end">
                                    
                                    Forgot
                                    <a
                                    href="#!"
                                    className="dark-grey-text ml-1 font-weight-bold"
                                    >
                                    Password?
                                    </a>

                                </p>
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
                                            Log in
                                        </MDBBtn>
                                    
                                    </div>

                                    </MDBCol>
                                    <MDBCol md="7" className="d-flex justify-content-end">
                                    <p className="font-small grey-text mt-3">
                                        Don't have an account?
                                        <Router>
                                            <Switch>
                                                <button type="button" onClick={ refreshPage } className = "button">
                                                    <Link to='/signup' className="nav-link" >Sign Up</Link>
                                                </button> 
                                            </Switch>
                                        </Router>
                                    </p>
                                    </MDBCol>
                                </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBCol>
                    </MDBRow>
                </MDBContainer>
                </center>
            </div>
        );
    }
}
function refreshPage(){ 
    window.location.reload(); 
}
export default Login;
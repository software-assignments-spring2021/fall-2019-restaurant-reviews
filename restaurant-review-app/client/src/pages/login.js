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
            success:false
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
            console.log(user);
            
            axios.post('http://localhost:5000/user/login', user)
            .then(res => {
                console.log(res.data[0].user);
                this.setState({success:true,loginStatus:'Logged in!'});
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
                        <MDBCol md="6">
                        <MDBCard>
                            <div className="header pt-3 peach-gradient">
                            <MDBRow className="d-flex justify-content-center">
                                <h3 className="white-text mb-3 pt-3 font-weight-bold">
                                Log in
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
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}
function refreshPage(){ 
    window.location.reload(); 
}
export default Login;
import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon} from 'mdbreact';
import "../App.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../vendor/bootstrap/css/bootstrap.min.css';
import '../css/one-page-wonder.min.css';
import axios from "axios";
import { BrowserRouter as Router} from "react-router-dom";
import { Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavBar from './navbar';
class Signup extends Component {

    constructor(props) {
        super(props);
    
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);


        this.state = {
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            emailErr:'',
            passwordErr:'',
            nameErr:''
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

    validate(){
        
        let nameErr= '';
        if(!this.state.firstname === "" || this.state.lastname === ""){
            nameErr = "First name or last name cannot be empty.";
            this.setState({nameErr:nameErr});
            return false;

        }

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
        if(this.state.password.length < 6){
            passwordErr = "Passwort must have at least 6 characters.";
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
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                password: this.state.password
            }
            console.log(user);
            alert("Hello " + user.firstname);
            //stores data in mongodb
            axios.post('http://localhost:5000/user/register', user)
                .then(res => console.log(res.data));


            //window.location.replace('/login');

            //set to initial state
            this.setState({
                email: '',
                password: '',
                firstname: '',
                lastname: '',
                emailErr:'',
                passwordErr:'',
                nameErr:''
            });
        }
    }
    
    render() {
        return (
            <div className="bg">
                <NavBar/>
                <br/><br/><br/><br/>
                <MDBContainer>
                    <MDBRow>
                    <MDBCol>
                            <MDBCol md="6">
                            <MDBCard >
                                <div className="header pt-3 peach-gradient">
                                <MDBRow className="d-flex justify-content-center">
                                    <h3 className="white-text mb-2 pt-2 font-weight-bold">
                                    Sign Up
                                    </h3>
                                </MDBRow>
                                <MDBRow className="mt-0 mb-3 d-flex justify-content-center">
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
                                    {/*display error message */}
                                    <div style={{fontSize:15,color:"red"}}>
                                        {this.state.nameErr}
                                    </div>
                                    <MDBInput 
                                        label="Your email" 
                                        group type="text" 
                                        validate 
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                    />
                                    {/*display error message */}
                                    <div style={{fontSize:15,color:"red"}}>                              
                                        {this.state.emailErr}
                                    </div>
                                    
                                    <MDBInput
                                        label="Your password"
                                        group type="password"
                                        validate
                                        containerClass="mb-0"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                    />
                                    {/*display error message */}
                                    <div style={{fontSize:15,color:"red"}}>
                                        {this.state.passwordErr}
                                    </div>
                                <MDBRow className="d-flex align-items-center mb-0 mt-0">
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
                                    <MDBCol md="7" className="d-flex justify-content-end">
                                    <div className="font-small grey-text mt-3">
                                    Have an account? 
                                    <Router>
                                        <Switch>
                                            <button type="button" onClick={ refreshPage } className = "button">
                                                <Link to='/login' className="nav-link" >Login</Link>
                                            </button> 
                                        </Switch>
                                    </Router>
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

function refreshPage(){ 
    window.location.reload(); 
}

export default Signup;
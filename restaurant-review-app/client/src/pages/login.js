import React from 'react';
//import { Link } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import "../App.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router} from "react-router-dom";
import { Switch } from 'react-router-dom';
import { Link } from 'react-router-dom'

const Login = () => { 

    return (
        <div className="bg">
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
                        <MDBInput label="Your email" group type="text" validate />
                        <MDBInput
                            label="Your password"
                            group
                            type="password"
                            validate
                            containerClass="mb-0"
                        />
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
                                color="grey"
                                rounded
                                type="button"
                                className="z-depth-1a"
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
function refreshPage(){ 
    window.location.reload(); 
}
export default Login;
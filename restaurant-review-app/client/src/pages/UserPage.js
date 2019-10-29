import React, {Component} from 'react';
import '../vendor/bootstrap/css/bootstrap.css';
import '../css/one-page-wonder.css';
import { Link } from 'react-router-dom';

class UserPage extends Component {  
    state = {
        userName    : '',
        email       : '',
        favRest     : []
    }

    componentDidMount() {
        this.setState({
            userName    : 'test username',
            email       : 'test@test.com',
            favRest     : ['Chipotle', 'McDonalds', 'Pizza Hut']
        });
    }

    render () {
        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
                    <Link className="navbar-brand" to="/">Restaurant Review Aggregator</Link>
                    
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                {/*<Router><Route path="/" exact component={signUp} > </Router>*/}
                                <a className="nav-link" href="signup.html">Sign Up</a>
                            </li>
                            <li className="nav-item">
                                {/*<Router> <Route path="/edit/:id" component={login} /> </Router>*/}
                                <a className="nav-link" href="login.html">Log In</a>
                            </li>
                            <li className="nav-item">
                                {/*<Router> <Route path="/userpage" component={UserPage} /> </Router>*/}
                                <Link className="nav-link" to="/userpage">My User Page</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="profileTableDiv">
                    <table className="profileTable">
                        <tr>
                            <td>
                                User Name:
                            </td>
                            <td>
                                <p3>{this.state.userName}</p3>
                            </td>
                            <td>
                                <button>Change Username</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Email:
                            </td>
                            <td>
                                {this.state.email}
                            </td>
                            <td>
                                <button>Change Email</button>
                            </td>
                        </tr>
                    </table>
                </div>

                <script src="vendor/jquery/jquery.min.js"></script>
                <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
            </div>
        )
    }
}

export default UserPage;
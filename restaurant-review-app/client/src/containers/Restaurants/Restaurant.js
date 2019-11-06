import React, {Component} from 'react';
import axios from 'axios';
// import '../vendor/bootstrap/css/bootstrap.min.css';
// import './../css/one-page-wonder.min.css';
// import './restaurants/App.css';
import { BrowserRouter as Router} from "react-router-dom";
import { Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';

class Restaurant extends Component{

    state = {
        name:'',
        location:'',
        dishes:'',
        comments:''
    }
    componentDidMount(){
        const { id } = this.props.location;

        axios.get('http://localhost:5000/restaurant/')
             .then( (res) => {
                 this.setState({
                     name: id
                    //  name:res.data[1].name,
                    //  location:res.data[1].location,
                    //  dishes:res.data[1].dishes,
                    //  comments:res.data[1].comments,
                 })
                 console.log(res.data);
             })
             .catch( (err) =>{
                console.log(err);
             })
    }
    
    render(){
        return(
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
          <div className="container">
            <a className="navbar-brand" href="index.html">Restaurant Review Agregator</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" 
            aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                <Router>
                    <Switch>
                        <button type="button" onClick={ refreshPage } className = "button">
                            <Link to='/signup' className="nav-link" >Sign Up</Link>
                        </button> 
                    </Switch>
                </Router>
                 
                </li>
                <li className="nav-item">
                <Router>
                    <Switch>
                        <button type="button" onClick={ refreshPage } className = "button">
                            <Link to='/login' className="nav-link" >Login</Link>
                        </button> 
                    </Switch>
                </Router>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/userpage">My User Page</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <header className="masthead text-white">
        <div className="masthead-content">
        <div className="container">
            <h2 className="masthead-subheading text-left">{this.state.name}</h2>
            
            {/* <h2 className="masthead-subheading mb-0">Everyone Eats</h2> */}
        </div>
        </div>
        </header>

    </div>



            // <div className={styles.Restaurant}>
            //     <h2>{this.state.name}</h2> 
                
            //     <h4>{this.state.location}</h4>
            //     <div className={styles.Dish}>     
            //         {this.state.dishes} 
            //         <div className={styles.Comments}>
            //         {this.state.comments} 
            //         </div>
            //     </div>
             
                // {/* <MyComments>  </MyComments> */}
                
            // </div>

        )
    }
    
}
function refreshPage(){ 
    window.location.reload(); 
}

export default Restaurant;
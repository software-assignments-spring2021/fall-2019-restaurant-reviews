import React, {Component} from 'react';
import axios from 'axios';
// import '../vendor/bootstrap/css/bootstrap.min.css';
// import './../css/one-page-wonder.min.css';
// import { BrowserRouter as Router} from "react-router-dom";
// import { Switch } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import NavBar from '../pages/navbar';
import Dish from '../components/Dish';

class Restaurant extends Component{

    state = {
        name: null,
        dishes: [],
        id: null

    }
    componentDidMount(){
        const { handle } = this.props.match.params;

        axios.get(`http://localhost:5000/restaurant/${handle}`)
             .then( (res) => {
                 this.setState({
                     name: res.data['name'],
                     dishes: res.data['menu_ratings'],
                     id: res.data['_id'],
                     address: res.data['address'],
                     rating: res.data['rating'],
                     cuisine: res.data['cuisine']
                 })
             })
             .catch( (err) =>{
                console.log(err);
             })

    }

    getUrlParameter(url, parameter) {
        parameter = parameter.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?|&]' + parameter.toLowerCase() + '=([^&#]*)');
        var results = regex.exec('?' + url.toLowerCase().split('?')[1]);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
    
    render(){
        return(
        <div className="App">
            <NavBar/>
            <header className="masthead text-white">
                <div className="masthead-content">
                    <div className="container">
                        <h2 className="masthead-subheading text-left">{this.state.name}</h2>
                        <h4 align='left'> {this.state.address} </h4>
                        <h4 align='left'> {this.state.rating} star restaurant</h4>
                        <h4 align='left'> {this.state.cuisine} </h4>
                    </div>
                </div>
            </header>
            <div>
                <h1 className="masthead"> The Menu </h1>
                <Dish dishList={this.state.dishes}/>
            </div>
        </div>

        )
    }
    
}

export default Restaurant;
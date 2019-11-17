import React, {Component} from 'react';
import axios from 'axios';
// import '../vendor/bootstrap/css/bootstrap.min.css';
// import './../css/one-page-wonder.min.css';
// import { BrowserRouter as Router} from "react-router-dom";
// import { Switch } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import NavBar from '../../pages/navbar';


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
                     dishes: res.data['dishes'],
                     id: res.data['_id']
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
                    </div>
                </div>
            </header>
        </div>

        )
    }
    
}
function refreshPage(){ 
    window.location.reload(); 
}

export default Restaurant;
import React, {Component} from 'react';
import styles from './Restaurant.module.css';
//import axios to connect backend
import axios from 'axios';


//NOTE: SHOULD INCLUDE A NAVBAR THE SAME AS IN THE LANDING PAGE.
class Restaurant extends Component{

    state = {

        // a sample data of a restaurant
        // name : 'Good Noodles',

        // location : '5 University Pl',

        // dishes : [
        //     {
        //         name:'Beef noodles',
        //         rating:'4',
        //         comments:['tasty beef','delicious soup']
        //     },

        //     {
        //         name:'Chicken noodles',
        //         rating:'2',
        //         comments:['broth is normal','chicken is not fresh','pricy']
        //     },
        //     {
        //         name:'Veggie noodles',
        //         rating:'3.5',
        //         comments:['great ingredients','smells good']
        //     }


        // ]
        name:'',
        location:'',
        dishes:'',
        comments:''
        // mycomment = {
        //     date:Date(),
        //     rating:''
        // }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/restaurant/')
             .then( (res) => {
                 this.setState({
                     name:res.data[1].name,
                     location:res.data[1].location,
                     dishes:res.data[1].dishes,
                     comments:res.data[1].comments,
                 })
                 console.log(res.data);
             })
             .catch( (err) =>{
                console.log(err);
             })
    }
    
    render(){
        return(

            <div className={styles.Restaurant}>
                <h2>{this.state.name}</h2> 
                
                <h4>{this.state.location}</h4>
                <div className={styles.Dish}>     
                    {this.state.dishes} 
                    <div className={styles.Comments}>
                    {this.state.comments} 
                    </div>
                </div>
             
                {/* <MyComments>  </MyComments> */}
                
            </div>

        )
    }
}

export default Restaurant;
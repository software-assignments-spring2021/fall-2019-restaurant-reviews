import React, {Component} from 'react';
import styles from './Restaurant.module.css';

//NOTE: SHOULD INCLUDE A NAVBAR THE SAME AS IN THE LANDING PAGE.
class Restaurant extends Component{

    state = {

     
        name : 'Good Noodles',

        location : '5 University Pl',

        dishes : [
            {
                name:'Beef noodles',
                rating:'4',
                comments:['tasty beef','delicious soup']
            },

            {
                name:'Chicken noodles',
                rating:'2',
                comments:['broth is normal','chicken is not fresh','pricy']
            },
            {
                name:'Veggie noodles',
                rating:'3.5',
                comments:['great ingredients','smells good']
            }


        ]
            // {
            //     name:'Stir-fried chicken noodles',
            //     rating:'5',
            //     keywords:['soft noodles','fresh vegetables']
            // }
        
        
    

        // mycomment = {
        //     date:Date(),
        //     rating:''
        // }
    }
    
    render(){
        return(

            <div className={styles.Restaurant}>
                <h2>{this.state.name}</h2> 
                
                <h4>{this.state.location}</h4>
                <div className={styles.Dish}>     
                    {this.state.dishes[0].name} <br/>
                    <div className={styles.Comments}>
                    {this.state.dishes[0].comments[0]} <br/>
                    {this.state.dishes[0].comments[1]}<br/>
                    </div>
                </div>
                <div className={styles.Dish}>     
                    {this.state.dishes[1].name} <br/>
                    <div className={styles.Comments}>
                    {this.state.dishes[1].comments[0]} <br/>
                    {this.state.dishes[1].comments[1]}<br/>
                    </div>
                </div>
                <div className={styles.Dish}>     
                    {this.state.dishes[2].name} <br/>
                    <div className={styles.Comments}>
                    {this.state.dishes[2].comments[0]} <br/>
                    {this.state.dishes[2].comments[1]}<br/>
                    </div>
                </div>
                {/* <MyComments>  </MyComments> */}
                
            </div>

        )
    }
}

export default Restaurant;
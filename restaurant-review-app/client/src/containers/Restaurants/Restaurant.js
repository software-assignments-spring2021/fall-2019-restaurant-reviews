import React, {Component} from 'react';

class Restaurant extends Component{

    state = {

     
        name : 'Good Noodles',

        location : '5 University Pl',

        dishes : 
            {
                name:'Beef noodles',
                rating:'4',
                comments:['tasty beef','delicious soup']
            },

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

            <div className='restaurant-name'>
                <p3>{this.state.name}</p3> 
                <br></br>
                <p4>{this.state.location}</p4>
                <div className='Dish'>     
                    {this.state.dishes.name} <br/>
                    {this.state.dishes.location} <br/>
                    {this.state.dishes.comments[0]} <br/>
                    {this.state.dishes.comments[1]}<br/>
                </div>
                {/* <MyComments>  </MyComments> */}
                
            </div>

        )
    }
}

export default Restaurant;
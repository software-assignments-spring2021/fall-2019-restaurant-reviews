import React, {Component} from 'react';

class Restaurant extends Component{

    state = {
        name = 'Good Noodles',

        location = '5 University Pl',

        dish = {
            name:'Beef noodles',
            rating:'4',
            keywords:['tasty beef','delicious soup']
        },

        // mycomment = {
        //     date:Date(),
        //     rating:''
        // }
    }
    render(){
        return(

            <div className='restaurant-name'>
                <title>{this.state.name}</title>
                <p4>{this.state.location}</p4>
                <div className='Dish'>     
                    <div className='Rating'> 
                        <p>{this.state.dish.rating}</p>
                    </div> 

                    <div className='CommentKeywords'>
                        <p>{this.state.dish.keywords}</p>
                    </div>
                </div>
                <MyComments>  </MyComments>
                
            </div>

        )
    }
}

export default Restaurant;
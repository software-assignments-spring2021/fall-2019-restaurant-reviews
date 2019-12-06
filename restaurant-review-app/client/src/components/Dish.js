import React, {Component} from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBIcon, MDBTable, MDBTableBody, MDBTableHead } from
'mdbreact';
import axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';
class Dish extends Component {
    constructor(props){
      super(props);
      this.onSubmitHandler = this.onSubmitHandler.bind(this);
      this.onChangeHandler = this.onChangeHandler.bind(this);
      this.makeDishRows = this.makeDishRows.bind(this);
      this.state={
        rating:'',
        rated:false
      }
    }

    onSubmitHandler(event){
      event.preventDefault();
      this.setState({
        rated:true
      })
      //TO DO: UPDATE DATA BY CALLING API
    }

    onChangeHandler(event){
      event.preventDefault();
      console.log(event);
      console.log(event.target.value);
      this.setState({
        rating:event.target.value
      })

    }
    makeDishRows(){
      var dishDivs = new Array();
      var count = 0;
      const rating = this.state.rating;
      // const style={
      //   display:'flex',
      //   justifyContent:'space-between'
      // }
      let showRatingForm = null;
      //if(this.state.rated == false && this.props.loginStatus == true){
        showRatingForm = (
        <div>           
        <p>Rate this dish</p>
          <StarRatingComponent
          name={String} /* name of the radio input, it is required */
          value={Number} /* number of selected icon (`0` - none, `1` - first) */
          />
        </div>
        )
      //}
      for (var dishName in this.props.dishList) {
          var dishRating = this.props.dishList[dishName];
          var stars = "";
          var s;
          for (s = 0; s < Math.round(dishRating); s++) {
              stars = stars + '🌟';
          }
          dishDivs[count] =   <MDBCol col='3'>
                              <MDBCard wide>
                                <MDBCardImage
                                  className='view view-cascade gradient-card-header peach-gradient'
                                  cascade
                                  tag='div'
                                >
                                  <h2 className='h2-responsive mb-2' >{dishName.toUpperCase()}</h2>
                                </MDBCardImage>
                                <MDBCardBody cascade className='text-center'>
                                  <MDBCardText>
                                      {dishRating+" "}{stars}
                                  </MDBCardText>
                                  {/* <a
                                    href='!#'
                                    className='orange-text mt-1 d-flex justify-content-end align-items-center'
                                  >
                                  </a> */}
                              
                                {showRatingForm}
                                </MDBCardBody>
                              </MDBCard>
                            </MDBCol>;
          count = count + 1;
      }
      var dishRows = new Array();
      var i = 0;
      var numRuns = dishDivs.length/3;
      if (dishDivs.length % 3 != 0) {
          numRuns = numRuns + 1;
      }

      for (i = 0; i < numRuns; i++) {
          dishRows[i] =   <MDBTable><tr>
                              <td>{dishDivs[i*3]}</td>
                              <td>{dishDivs[i*3+1]}</td>
                              <td>{dishDivs[i*3+2]}</td>
                          </tr>
                          </MDBTable>;
      }

      return dishRows;
    }
    render(){
      const dishRows = this.makeDishRows();
      return dishRows;
    }
   
}

export default Dish;
import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBIcon, MDBTable, MDBTableBody, MDBTableHead } from
'mdbreact';

function Dish(props) {
    var dishDivs = new Array();
    var count = 0;
    for (var dishName in props.dishList) {
        var dishRating = props.dishList[dishName];
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
                                <a
                                  href='!#'
                                  className='orange-text mt-1 d-flex justify-content-end align-items-center'
                                >
                                </a>
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

export default Dish;
import React from 'react';
import '../css/one-page-wonder.css';
import '../vendor/bootstrap/css/bootstrap.css';
import "mdbreact/dist/css/mdb.css";

function FavoriteResList(props) {
   
    return props.favRes.map( favorite => {    
         
        return(
            <div>
                <button type="button" class="list-group-item list-group-item-action somepadding">
                    <span className="goldstartext">★</span> &nbsp;&nbsp; {favorite}
                </button> 
            </div> 
        );
    });

}

export default FavoriteResList;
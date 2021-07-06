import React from 'react'
import { Card, CardGroup, CardDeck, Button } from "react-bootstrap";
import './best.css'

class Best extends React.Component{
    render(){
        return(
            <>
             <p className="heading-TopBrand">
             Best Seller{" "}
          <Button variant="btn btn-success btn-lg float-right">VIEW ALL</Button>{" "}
        </p>{" "}
           
            <div id="container1">
              <div class="block1">Travel Accessories</div>
              <div class="block1">Suitcase & Trolley</div>
              <div class="block1">Wallets & Belts</div>
              <div class="block1">Travel Duffets</div>
            </div>
            <div id="container3">
              <div class="block1">Travel Accessories</div>
              <div class="block1">Suitcase & Trolley</div>
              <div class="block1">Wallets & Belts</div>
              <div class="block1">Travel Duffets</div>
            </div>

            <div id="container2">
               <div class="block"></div>
            </div>
            </>
        )
    }
}
export default Best
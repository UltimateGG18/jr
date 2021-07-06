import React from 'react';
import { Card, CardGroup, CardDeck, Button } from "react-bootstrap";
import {Link} from 'react-router-dom';
import './Electronics.css';
import axios from 'axios';
import { withRouter  } from "react-router-dom";

class Electronics extends React.Component{
    constructor(){
        super();
        this.state = {
            electronics : [],
            visible : 5
        }
    }

    componentDidMount(){
        axios({
            method : 'GET',
            url:'http://3.129.92.172:5000/viewProd',
            headers:{'Content-Type':'application.json'}
          }).then(res=>{
            console.log(res.data);
            const electronicsData=res.data.filter(item=>{
              if(item.prod.categoryId !== undefined && item.prod.categoryId.name === 'Electronicse'){
                return item;
              }
            })
            console.log(electronicsData);
            this.setState({electronics :electronicsData })
          })
          .catch()
    }

    handleViewMore = (categoryId) => {
      this.props.history.push(`/viewmore?category=${categoryId}`);
    }
    handleProductDetails = (productId) => {
      this.props.history.push(`/productdetails?product=${productId}`);
    }

   render(){
       const {electronics,visible} = this.state;
       return(
        <>
        {electronics && electronics.length > 0 ? 
            <p className="heading-TopBrand" style={{marginTop:"15px" }}>
            {electronics[0].prod.categoryId.name} {" "}
         <Button variant="btn btn-success btn-lg float-right" onClick={() =>this.handleViewMore(electronics[0].prod.categoryId._id)}>VIEW ALL</Button>{" "}
       </p>
        :null}
        
     <div className="wrapper">
     {electronics.slice(0,visible).map(item=>{
                return(
                  <>
                  <div className="card">
          <div className="card__body">
            <img className="card__image" src={`http://3.129.92.172:5000/${item.prod.images[0]}`}/>
                <h5 className="card__title" style={{color:"black"}}>{item.prod.name}</h5>
                <p className="card__description1" style={{color:"black"}}><span style={{textDecoration:"line-through"}}>₹{item.prod.price}</span> <b style={{color:"green"}}>{item.quantity[2].discount}{item.quantity[2].discountType} OFF</b></p>
             <p className="card__description" style={{color:"black"}}>₹{item.quantity[2].discountedPrice}</p>
          </div>
          <button className="card__button"  onClick={() =>this.handleProductDetails(electronics[0].prod._id)}>view details</button>
        </div>
                    </>
                )
              })}

        </div>
  
       </>
       )
   }

    }
export default withRouter(Electronics);

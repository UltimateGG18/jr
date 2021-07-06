import React from 'react';
import { Card, CardGroup, CardDeck, Button } from "react-bootstrap";
import {Link} from 'react-router-dom';
import "./TopBrands.css";
import axios from 'axios';
import { withRouter  } from "react-router-dom";

class TopBrands extends React.Component{
    constructor(){
        super();
        this.state = {
            homeproduct1 : [],
            homeproduct2 : [],
            visible : 5,
            discount : []
        }
    }

    componentDidMount(){
      //API FOR HOME & OFFICE APPLIANCES
        axios({
            method : 'GET',
            url:'http://3.129.92.172:5000/viewProd',
            headers:{'Content-Type':'application.json'}
          }).then(res=>{
            console.log(res.data);
            const homeData1=res.data.filter(item=>{
              if(item.prod.categoryId !== undefined && item.prod.categoryId.name === 'HOME & OFFICE APPLIANCES'){
                return item;
              }
            })
            console.log(homeData1);
            const result=homeData1.map((item)=>item.quantity)
            console.log(result)
            const result1=result.filter((item)=>item.length)
            console.log(result1)
            const result2 = result.map((item)=>item[item.length-1])
            console.log(result2)
            this.setState({homeproduct1 :homeData1,discount:result1 })
            
          })
          .catch()

          //API FOR HOME & OFFICE FURNITURES
          axios({
            method : 'GET',
            url:'http://3.129.92.172:5000/viewProd',
            headers:{'Content-Type':'application.json'}
          }).then(res=>{
            console.log(res.data);
            const homeData2=res.data.filter(item=>{
              if(item.prod.categoryId !== undefined && item.prod.categoryId.name === 'HOME & OFFICE FURNITURES'){
                return item;
              }
            })
            console.log(homeData2);
            this.setState({homeproduct2 :homeData2 })
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
       const {homeproduct1,homeproduct2,visible ,discount} = this.state;
       return(
        <>
        {homeproduct1 && homeproduct1.length > 0 ?
        <p className="heading-TopBrand" style={{marginTop:"15px" }}>
         {homeproduct1[0].prod.categoryId.name} {" "}
          <Button variant="btn btn-success btn-lg float-right" onClick={() =>this.handleViewMore(homeproduct1[0].prod.categoryId._id)}>VIEW ALL</Button>
         </p>
        : null}
     <div className="wrapper">
     {homeproduct1 && homeproduct1.length > 0 ? homeproduct1.slice(0,visible).map(item=>{
                return(
                  <>
                  <div className="card">
          <div className="card__body">
            <img className="card__image" src={`http://3.129.92.172:5000/${item.prod.images[0]}`}/>
                <h5 className="card__title" style={{color:"black"}}>{item.prod.name}</h5>
                {item.quantity && item.quantity.length > 0 ? 
              item.quantity.filter((item1)=>{
                if(item1.length!==undefined){
                  return item1.length.map((item2)=>{
                    return item2[item2.length-1].map((item3)=>{
                    return(
                      <>
                      <p className="card__description1" style={{color:"black"}}><span style={{textDecoration:"line-through"}}>₹{item.prod.price}</span> <b style={{color:"green"}} >{item3.discount}{item3.discountType} OFF</b></p>
                      <p className="card__description" style={{color:"black"}} >₹{item3.discountedPrice}</p>
                      </>
                    )
                    })
                  })
                }
                 })

                :
                <>
                <p className="card__description1" style={{color:"black"}}><b style={{color:"green"}}>0% OFF</b></p>
                <p className="card__description" style={{color:"black"}}>₹{item.prod.price}</p>
               </>}
          </div>
          <button className="card__button" onClick={() =>this.handleProductDetails(homeproduct1[0].prod._id)}>view details</button>
        </div>
                    </>
                )
              }) : null}

        </div>
      <br></br>
      {homeproduct2 && homeproduct2.length > 0 ?
      <p className="heading-TopBrand" style={{marginTop:"15px" }}>
      {homeproduct1[0].prod.categoryId.name} {" "}
      <Button variant="btn btn-success btn-lg float-right" onClick={() =>this.handleViewMore(homeproduct2[0].prod.categoryId._id)}>VIEW ALL</Button>
       </p>
       : null}
        
     <div className="wrapper">
     {homeproduct2 && homeproduct2.length > 0 ? homeproduct2.slice(0,visible).map(item=>{
                return(
                  <>
                  <div className="card">
          <div className="card__body">
            <img className="card__image" src={`http://3.129.92.172:5000/${item.prod.images[0]}`}/>
                <h5 className="card__title" style={{color:"black"}}>{item.prod.name}</h5>
                <p className="card__description1" style={{color:"black"}}><span style={{textDecoration:"line-through"}}>₹{item.prod.price}</span> <b style={{color:"green"}}>{item.quantity[2].discount}{item.quantity[2].discountType} OFF</b></p>
             <p className="card__description" style={{color:"black"}}>₹{item.quantity[2].discountedPrice}</p>
          </div>
          <button className="card__button" onClick={() =>this.handleProductDetails(homeproduct2[0].prod._id)}>view details</button>
        </div>
                    </>
                )
              }): null}

        </div>
  
       </>
       )
   }

    }
export default withRouter(TopBrands);

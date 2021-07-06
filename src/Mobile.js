import React from 'react';
import './Mobile.css';
import { Card, CardGroup, CardDeck, Button, NavItem } from "react-bootstrap";
import {Link} from 'react-router-dom';
import { useEffect, useState }  from "react";
import axios from "axios";
import { withRouter  } from "react-router-dom";
import {Grid} from "@material-ui/core";




//  class Mobile extends React.Component{
//   constructor(props){
//     super(props);
// }
 


  // function Mobile = () =>{
  
  //   const [data, setData] = useState([]);  
  //   useEffect(() => {
  //     axios.get("http://13.58.37.17:5000/viewBanner")
  //     .then((res) => {
  //       console.log(res)
  //       setData({data:res.data.result});
  //       console.log(res.data.result)
  //     });
  //   },
  //    []);
  // }
  class Mobile extends React.Component{
    constructor(){
      super();
      this.state = {
        mobiles : [],
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
        const mobiles=res.data.filter(item=>{
          if(item.prod.categoryId !== undefined && item.prod.categoryId.name === 'MOBILE & TABLETS'){
            return item;
          }
        })
        console.log(mobiles);
        console.log(mobiles[0].prod.categoryId._id)
        
        this.setState({mobiles : mobiles});
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
      const {mobiles,visible} = this.state;
      return(
        <>
        {mobiles && mobiles.length > 0 ? 
            <p className="heading-TopBrand" style={{marginTop:"15px" }}>
            {mobiles[0].prod.categoryId.name} {" "}
         <Button variant="btn btn-success btn-lg float-right" onClick={() =>this.handleViewMore(mobiles[0].prod.categoryId._id)}>VIEW ALL</Button>{" "}
       </p>
        :null}
        
     
  <div className="wrapper">
  {mobiles && mobiles.length > 0 ? mobiles.slice(0,visible).map(item=>{
             return(
               <>
               <div className="card" >
       <div className="card__body">
         <img className="card__image" src={`http://3.129.92.172:5000/${item.prod.images[0]}`}/>
             <h5 className="card__title" style={{color:"black"}}>{item.prod.name}</h5>
             <p className="card__description1" style={{color:"black"}}><span style={{textDecoration:"line-through"}}>₹{item.prod.price}</span> <b style={{color:"green"}}>{item.quantity[2].discount}{item.quantity[2].discountType} OFF</b></p>
             <p className="card__description" style={{color:"black"}}>₹{item.quantity[2].discountedPrice}</p>
       </div>
       <button className="card__button" onClick={() =>this.handleProductDetails(mobiles[0].prod._id)}>view details</button>
     </div>
                 </>
             )
           }) : null}

     </div>
       </>
      )
    }
    }

 
  
export default withRouter(Mobile);
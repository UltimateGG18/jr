import React , { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import {  Nav, Navbar,  NavDropdown, Form,  FormControl, Button,Carousel } from "react-bootstrap";
 import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
 import SearchIcon from "@material-ui/icons/Search";
 import axios from "axios";
 import {withRouter} from 'react-router-dom';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import "./Productdetail.css";
import queryString from 'query-string';
import { CgProfile } from "react-icons/cg";
import { IoWalletOutline } from "react-icons/io5";
import Sb from '../Sb';
import Logo from "./Logo";


class Productdetail extends React.Component{
  constructor(){
    super();
    this.state = {
      viewdetails : {},
      prodId : undefined,
      qty : [],
      user : undefined,
      quantity : 0
    }
  }
  componentDidMount(){
    var userid=localStorage.getItem("user")
console.log(userid)
    const qs = queryString.parse(this.props.location.search);
    const productId = qs.product;
  axios({
    method : 'GET',
    url:`http://3.129.92.172:5000/prodDetail/${productId}`,
    headers:{'Content-Type':'application.json'}
  }).then(res=>{
    //console.log(res.data)
    this.setState({viewdetails : res.data.prod ,prodId : productId ,qty : res.data.quantity ,user: userid })
    
  })
  .catch()

  }

  closeNav = () =>{
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }
   openNav = () =>{
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }

  handleCart = () =>{
    this.props.history.push(`/cart`);
  }
  handleQuantity = (event,state) => {
this.setState({[state]:event.target.value})
  }
  increment = () =>{
    this.setState({quantity : this.state.quantity+1})
  }
  decrement = () =>{
    this.setState({quantity : this.state.quantity-1})
  }

  handleAddToCart = () => {
    const{user,prodId,viewdetails,quantity} = this.state;
    if(user !== undefined && user !== null){
      const inputObj = {
        productId:prodId,
        userId : user,
        quantity : quantity
      }
      axios({
        method:"POST",
        url:`http://3.129.92.172:5000/addCart`,
        headers: { 'Content-Type': 'application/json' },
        data: inputObj
      }).then(res =>{
        console.log(res)
        if(res){
          alert("Product added into cart");
         
        }
      }).catch()
    }else{
      this.props.history.push(`/Login`);
    }

   
  }

  
  render(){
    const {viewdetails,prodId,qty,user,cart,quantity} = this.state;
    console.log(viewdetails)
    console.log(prodId)
    console.log(qty)
    console.log(user)
    
    return(
      <>

<div>
      <Logo />

      {/* <*****************************************Navbar************************************> */}
      <div className="container-fluid">
        <div className="nav-main">
          <Navbar
            sticky="top"
            collapseOnSelect
            expand="lg"
            className="bg-navbar"
            variant="dark"
          >
          <Sb/>
            
            {/* <*****************************************Input Search************************************> */}

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Form inline className="input-group input-group-md">
                <FormControl
                  type="text"
                  id="input-search"
                  placeholder="Search for Products, Brands and more.."
                  className="mr-sm-6"
                />
                <Button variant="outline-success">
                  <SearchIcon className="" />
                </Button>
              </Form>
              
              
              

              {/* <*****************************************B2B************************************> */}

              <Nav className="mr-auto">
                <Nav.Link className="nav-b2b" href="#businessTobusiness">
                  B2B
                </Nav.Link>

                <Nav.Link className="nav-b2b" href="#businessTobusiness">
                <IoWalletOutline className="wallet"/>
                </Nav.Link>
               


                {/* <*****************************************Sign-In************************************> */}

                <NavDropdown
                  title="Sign In"
                  id="collasible-nav-dropdown"
                  className="nav-dropdown"
                  style={{marginTop:"3px"}}
                >
                  <NavDropdown.Item href="#action/3.1" style={{marginTop:"3px",marginRight:"-20px"}}>
                    New Customer ?
                    <ul className="nav-divider">
                      <li class="divider"></li>
                    </ul>
                    <button><Link to ="/Login">Sign In </Link></button>
                  </NavDropdown.Item>
                </NavDropdown>

                {/* <*****************************************Cart************************************> */}

                <Nav.Link className="nav-cart" >
                  <ShoppingCartIcon onClick={() => this.handleCart()} style={{marginTop:"3px",marginRight:"-20px",fontSize:"25px"}}/>
                  <div></div>
                </Nav.Link>

                {/* <*****************************************More Options************************************> */}

                <NavDropdown
                  title="More"
                  id="collasible-nav-dropdown"
                  className="more-dropdown"
                  style={{marginTop:"3px"}}
                >
                  <NavDropdown.Item href="#orderDetails">
                    Order
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#notifications">
                    Notifications
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#information">
                    Contact Us
                  </NavDropdown.Item>
                </NavDropdown>
                <div id="google_translate_element" style={{marginTop:"3px" }}></div>  
                <Nav.Link className="nav-b2b" href="#businessTobusiness">
                  <CgProfile className="profileIcon"/>
                </Nav.Link>              
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          

          <div className="large-container">
                 
                
                 {/* ---------------- single product detail --------- */}
            
            
                 <div className="small-container">
                     <div className="row product_r">
                         <div className="col-2 product_c2">
                         <Carousel >
          
          {viewdetails && viewdetails.images ? viewdetails.images.map((item)=>{
            return(
              <Carousel.Item>
              <img
            src={`http://3.129.92.172:5000/${item}`}
            alt="First slide"
          />
           </Carousel.Item>
            )
          }) : null }
 
     </Carousel>
                         </div>
                         <div className="col-2 product_c2" style={{color:"black"}}>
                             
                             <h2 style={{fontFamily:"poppins"}}>{viewdetails.name}</h2>
                             <p className="para">Brand: {viewdetails.brand } </p>
                             <h4> ₹{viewdetails.price} </h4>
     
     
                     
                     Quantity:<button onClick={this.decrement} className="qty-btn-minus">-</button><input type="number" value={quantity}  className="product-input" onChange={(event) => this.handleQuantity(event,'quantity')}/><button onClick={this.increment} className="qty-btn-plus">+</button>
                         <br></br>
                         <div style={{color:"#740623" ,fontWeight:"bold" ,fontSize:"18px", fontFamily:"poppins",marginTop:"7px"}}>
                          Buy More & Save More
                          </div>
                          <div className="main-item">
                         
                          {qty.map((qa, index) => (
                                <>
                                <div className="item"> 
                                {qty[index + 1] != undefined ? <div className="sub-item1" ><span>Qty </span> {qa.quantity} - {Number(qty[index + 1].quantity)-1}</div>:<div className="sub-item1"><span>Qty</span> {qa.quantity}+</div>}
                                    <div className="sub-item2">₹{qa.discountedPrice}</div>
                                    <div className="sub-item3">{qa.discount}{qa.discountType} OFF</div>
                                    </div>
                                 </>
                                ))}
                              
                                </div>
                      
                     
                             <button className="product_btn" onClick={() =>this.handleAddToCart()}> Add To Cart </button>
                         
                         <button className="product_btn"> Whishlist </button>
                             <h3 className="product_h3"> Product Details </h3>
                             <p className="para">{viewdetails.description}</p>
                         </div>
                     </div>
                 </div>
                    </div>   
     
                    <div className="small-container">
                    <p className="heading-TopBrand1" style={{marginTop:"15px" }}>
                    SIMILAR PRODUCTS {" "}
            </p>
                
                    <div className="wrapper">
             <div className="card">
               <div className="card__body">
                 <img className="card__image" src="http://3.129.92.172:5000/1622729671609-8.jpg"/>
                     <h2 className="card__title" style={{color:"black"}}>mobile</h2>
                     <p className="card__description" style={{color:"black"}}>description</p>
               </div>
               <button className="card__button">view details</button>
             </div>
             <div className="card">
               <div className="card__body">
                 <img className="card__image" src="http://3.129.92.172:5000/1622729671609-8.jpg"/>
                     <h2 className="card__title" style={{color:"black"}}>mobile</h2>
                     <p className="card__description" style={{color:"black"}}>description</p>
               </div>
               <button className="card__button">view details</button>
             </div>
             <div className="card">
               <div className="card__body">
                 <img className="card__image" src="http://3.129.92.172:5000/1622729671609-8.jpg"/>
                     <h2 className="card__title" style={{color:"black"}}>mobile</h2>
                     <p className="card__description" style={{color:"black"}}>description</p>
               </div>
               <button className="card__button">view details</button>
             </div>
             <div className="card">
               <div className="card__body">
                 <img className="card__image" src="http://3.129.92.172:5000/1622729671609-8.jpg"/>
                     <h2 className="card__title" style={{color:"black"}}>mobile</h2>
                     <p className="card__description" style={{color:"black"}}>description</p>
               </div>
               <button className="card__button">view details</button>
             </div>
            
             </div>
                      </div>

         
       

        </div>
      </div>
      

    </div>
      
     
      
                   
                
            
                  {/* <!---------------------Featured product--------------> */}
            
                       {/* <div className="small-container single-product">
                            
                            <h1 className="product_h1"> SIMILAR PRODUCTS</h1>
                            <br></br>
            
                                <div className="row product_r">
                                <div className="col-4 product_c4">
                                    <Link to="Productdetail">
                                    <img src="http://3.129.92.172:5000/1621841712006-experience2.jpg" />
                                    </Link>
                                    <h4 className="product_h4">Redmi 9(Sporty orange, 64 gb)</h4>
                                    <div className="rating">     
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />            
                                    </div>
                                    <p> ₹ 8799</p>
                                    </div>
            
                                    <div className="col-4 product_c4">
                                    <Link to="Productdetail1">
                                    <img src="http://3.129.92.172:5000/1621841712006-experience2.jpg" />
                                    </Link>
                                    <h4 className="product_h4"> Redmi 9(carbon black, 64 gb)</h4>
                                    <div className="rating">     
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />            
                                    </div>
                                    <p> ₹ 8799</p>
                                    </div>
                                    
            
                                    <div className="col-4 product_c4">
                                    <Link to="Productdetail2">
                                    <img src="http://3.129.92.172:5000/1621841712006-experience2.jpg" />
                                    </Link>
                                    <h4 className="product_h4">Redmi 9(blue, 64 gb)</h4>
                                    <div className="rating">     
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />            
                                    </div>
                                    <p> ₹ 7054</p>
                                    </div>
            
                                    <div className="col-4 product_c4">
                                    <Link to="Productdetail3">
                                    <img src="http://3.129.92.172:5000/1621841712006-experience2.jpg" />
                                    </Link>
                                    <h4 className="product_h4">DELL MS 116 Wired Optical Mouse (USB, Black)</h4>
                                    <div className="rating">     
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />            
                                    </div>
                                    <p>₹ 349.00</p>
                                    </div>
                                    </div>              
         </div>*/}
     
            
     </>
    )
  }
}


export default withRouter(Productdetail);
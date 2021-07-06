import React from 'react'
import {Link} from 'react-router-dom';
import {  Nav, Navbar,  NavDropdown, Form,  FormControl, Button, } from "react-bootstrap";
 import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
 import SearchIcon from "@material-ui/icons/Search";


import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import "./Productdetail.css";



  const Productdetail1 = () => {
    const closeNav = () =>{
      document.getElementById("mySidebar").style.width = "0";
      document.getElementById("main").style.marginLeft= "0";
    }
    const openNav = () =>{
      document.getElementById("mySidebar").style.width = "250px";
      document.getElementById("main").style.marginLeft = "250px";
    }

   
    return (
        <>




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
          {/* <Sb/> */}
          <div id="mySidebar" class="sidebar">
        <a href="javascript:void(0)" class="closebtn" onClick={closeNav}>×</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </div>
      
      <div id="main">
        <button class="openbtn" onClick={openNav}>☰</button>
      </div>
            
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

                {/* <*****************************************Sign-In************************************> */}

                <NavDropdown
                  title="Sign In"
                  id="collasible-nav-dropdown"
                  className="nav-dropdown"
                >
                  <NavDropdown.Item href="#action/3.1">
                    New Customer ?
                    <ul className="nav-divider">
                      <li className="divider"></li>
                    </ul>
                    <button><Link to ="/Registernew">Sign In </Link></button>
                  </NavDropdown.Item>
                </NavDropdown>

                {/* <*****************************************Cart************************************> */}

                <Nav.Link className="nav-cart" href="#">
                  <ShoppingCartIcon />
                </Nav.Link>

                {/* <*****************************************More Options************************************> */}

                <NavDropdown
                  title="More"
                  id="collasible-nav-dropdown"
                  className="more-dropdown"
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
                <div id="google_translate_element"></div>                
              </Nav>
            </Navbar.Collapse>
          </Navbar>
</div>
 </div>



        
<div className="large-container">
            
           
            {/* ---------------- single product detail --------- */}
       
       
            <div className="small-container">
                <div className="row product_r">
                    <div className="col-2 product_c2">
                    <img src="http://18.116.242.50:5000/1621841712006-experience2.jpg" width="100%" />
                    </div>
                    <div className="col-2 product_c2">
                        <p className="para">Brand: Mi </p>
                        <h2>Redmi 9(carbon black, 64 gb)</h2>
                        <h4> ₹8799.00 </h4>


                
                Quantity:<input type="number" value="1" className="product-input"/>
                    <br></br>
                <Link to ="/Cart">
                        <button className="product_btn"> Add To Cart </button>
                    </Link>
                    <button className="product_btn"> Whishlist </button>
                        <h3 className="product_h3"> Product Details </h3>
                        <p className="para">13+2MP Rear camera with AI Portrait, AI scene recognition, HDR, Pro mode | 5MP front facing camera 16.58 centimeters (6.53-inch) HD+ multi-touch capacitive touchscreen with 1600 x 720 pixels resolution, 268 ppi pixel density, 20:9 aspect ratio Memory, Storage & SIM: 4GB RAM | 64GB storage expandable up to 512GB| Dual SIM with dual standby (4G+4G) Android v10 operating system with 2.3GHz Mediatek Helio G35 octa core processor 5000mAH lithium-polymer battery with 10W wired charger in-box"
id: "60ab573256526b1caf84f164</p>
                    </div>
                </div>
            </div>
       
       
               </div>   
           
           
       
             {/* <!---------------------Featured product--------------> */}
       
                   <div className="small-container single-product">
                       
                       <h1 className="product_h1"> SIMILAR PRODUCTS</h1>
                       <br></br>
       
                           <div className="row product_r">
                           <div className="col-4 product_c4">
                               <Link to="Productdetail">
                               <img src="http://18.116.242.50:5000/1621841714375-technical-skills.jpg" />
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
                               <img src="http://18.116.242.50:5000/1621841712006-experience2.jpg" />
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
                               <img src="http://18.116.242.50:5000/1621844661079-experience1.jpg" />
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
                               <img src="http://18.116.242.50:5000/1622268295048-dell-wired-optical-mouse.jpeg" />
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
                   </div>
       
</>
    );
}

export default Productdetail1






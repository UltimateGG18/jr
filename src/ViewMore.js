import React , { useEffect, useState }  from "react";
import "./ViewMore.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "./components/Logo";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Table,
} from "react-bootstrap";
import DehazeIcon from "@material-ui/icons/Dehaze";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import Slider from "./components/Slider";
import TopBrands from "./components/TopBrands";
import Mobile from './Mobile';
import ComingOffer from './components/ComingOffer';
import Best from './Best'
import Electronics from './Electronics'
import Baby from './Baby'
import Footer from './Footer'
import Project1 from './Project1'
import ImageSlider from './components/ImageSlider';
import { SliderData } from './components/SliderData';
import axios from "axios";
import Sb from './Sb';
import { Home } from "@material-ui/icons";
import {Link,withRouter} from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { CgProfile } from "react-icons/cg";
import { IoWalletOutline } from "react-icons/io5";
import queryString from 'query-string';


class ViewMore extends React.Component{
  constructor(){
    super();
    this.state = {
      viewdata : [],
      catId : undefined
    }
  }
  componentDidMount(){
    const qs = queryString.parse(this.props.location.search);
            const categoryId = qs.category;
          axios({
            method : 'GET',
            url:`http://3.129.92.172:5000/catViseProd/${categoryId}`,
            headers:{'Content-Type':'application.json'}
          }).then(res=>{
            console.log(res.data)
          this.setState({ viewdata : res.data ,catId : categoryId })  
          })
          .catch()
  }
  

  handleProductDetails = (productId) => {
    this.props.history.push(`/productdetails?product=${productId}`);
  }
  render(){
    const {viewdata,catId} = this.state;
    return(
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

                <Nav.Link className="nav-cart" href="#goTocart">
                  <ShoppingCartIcon style={{marginTop:"3px",marginRight:"-20px",fontSize:"25px"}}/>
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
          <Slider/>


          {viewdata && viewdata.length > 0 ? 
            <p className="heading-TopBrand" style={{marginTop:"15px" }}>
            {viewdata[0].prod.categoryId.name} {" "}
       </p>
        :null}
        
     <div className="wrapper">
     {viewdata && viewdata.length > 0 ? viewdata.map(item=>{
                return(
                  <>
                  <div className="card">
          <div className="card__body">
            <img className="card__image" src={`http://3.129.92.172:5000/${item.prod.images[0]}`}/>
                <h5 className="card__title" style={{color:"black"}}>{item.prod.name}</h5>
                <p className="card__description" style={{color:"black"}}>description</p>
          </div>
          <button className="card__button" onClick={() =>this.handleProductDetails(viewdata[0].prod._id)}>view details</button> 
        </div>
                    </>
                )
              }) : null}

        </div>
       

        </div>
      </div>
      

    </div>
    )
  }
  }

export default withRouter(ViewMore);

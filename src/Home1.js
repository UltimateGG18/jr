import React , { useEffect, useState }  from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "./components/Logo";
import { BrowserRouter as Router } from "react-router-dom";
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
import {Link} from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { CgProfile } from "react-icons/cg";
import { IoWalletOutline } from "react-icons/io5";



function Home1() {
  
  const [data, setData] = useState([]);  
  useEffect(() => {
    axios.get("http://3.129.92.172/viewCart/id")
    .then((res) => {
      console.log(res)
      setData({data:res.data.result});
      console.log(res.data.result)
    });
  }, []);
  
 
  const handleLogout = () => {
    localStorage.clear();
  }
  return (
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
                <Nav.Link className="nav-b2b" href="#businessTobusiness" style={{marginRight:"15px",marginTop:"5px"}}>
                  B2B
                </Nav.Link>

                <div style={{marginLeft:"-15px",marginRight:"10px", width:"75px"}}>
                <Nav.Link className="nav-b2b" href="#businessTobusiness">
                <IoWalletOutline className="wallet"/>
                </Nav.Link>
                <div style={{fontFamily:"poppins",marginLeft:"20px"}}>Wallet</div>
                </div>
               


               

                {/* <*****************************************Cart************************************> */}

                <div style={{marginLeft:"-15px",marginRight:"10px", width:"75px"}}>
                <Nav.Link className="nav-cart" href="#goTocart" >
                  <ShoppingCartIcon style={{marginTop:"8px",marginRight:"-20px",marginLeft:"18px",fontSize:"25px"}}/>
                </Nav.Link>
                <div style={{fontFamily : "poppins" , marginLeft:"6px"}}>Add to Cart</div>
                </div>

                 {/* <*****************************************Sign-In************************************> */}

                 <NavDropdown
                  title="Sign In"
                  id="collasible-nav-dropdown"
                  className="nav-dropdown"
                  style={{marginTop:"8px"}}
                >
                  <NavDropdown.Item href="#action/3.1" style={{marginTop:"3px",marginRight:"-15px",fontFamily:"poppins"}}>
                    New Customer ?
                    <ul className="nav-divider">
                      <li class="divider"></li>
                    </ul>
                   <div> <button ><Link to ="/Login" style={{fontFamily:"poppins"}}>Sign In </Link></button></div>
                   <div> <button onClick ={handleLogout}><Link to ="/Login" style={{fontFamily:"poppins"}}>Logout </Link></button></div>
                  </NavDropdown.Item>
                </NavDropdown>

                {/* <*****************************************More Options************************************> */}

                <NavDropdown
                  title="More"
                  id="collasible-nav-dropdown"
                  className="more-dropdown"
                  style={{marginTop:"8px" ,marginLeft:"-15px"}}
                >
                  <NavDropdown.Item href="#orderDetails" style={{fontFamily:"poppins"}}>
                    Order
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#notifications" style={{fontFamily:"poppins"}}>
                    Notifications
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#information" style={{fontFamily:"poppins"}}>
                    Contact Us
                  </NavDropdown.Item>
                </NavDropdown>
                <div id="google_translate_element" style={{marginTop:"8px" ,marginLeft:"-15px"}}></div>  
                <div style={{marginLeft:"5px"}}>
                <Nav.Link className="nav-b2b" href="#businessTobusiness">
                  <CgProfile className="profileIcon"/>
                </Nav.Link>
                <div style={{fontFamily : "poppins" , marginLeft:"3px"}}>Profile</div>
                  </div>              
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Slider/>
        <ImageSlider />
        <TopBrands/>
        <Mobile/>
        <ComingOffer/>
        <Best/>
        <Baby/>
        <Electronics/>
        <Project1/>
        <Footer/>
        </div>
      </div>
      

    </div>
  );
}

export default Home1;

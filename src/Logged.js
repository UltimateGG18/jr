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
import Best from './Best'
import Electronics from './Electronics'
import Baby from './Baby'
import Footer from './Footer'
import Project1 from './Project1'
import ImageSlider from './components/ImageSlider';


import Sb from './Sb';
import { Home } from "@material-ui/icons";



import React, { Component  } from 'react'
import axios from "axios";
import {Link,withRouter } from 'react-router-dom';

export default class Logged extends Component {
    
  
  


 constructor(props) {
    super(props);
    
    this.state={
      User_id:this.props.User_id,
country : "", state:"",city : "", errors: {}, formIsValid : true, submiterr:"",    str:"",image:"",message:""
       
}
this.getUserDetails();

}


onChange=(e) =>{
    var err=this.state.errors;
    err[e.target.name]="";
    this.setState({[e.target.name] : e.target.value, err}); 
    // console.log(e.target.value) 
  }
  onblur=(e)=>{
      
    var err=this.state.errors;
    
    
    if(this.state[e.target.name] === undefined || this.state[e.target.name] === ""){
        err[e.target.name]="Please enter the value."
        this.setState({err, formIsValid:false,})
        if(this.state.str.indexOf(e.target.name)<0)
            {
            this.setState({str:this.state.str+e.target.name})    
            }
    }


    else{
        let reg, msg;
        switch(e.target.name)
        {
            case "fullName":
                reg=/^[a-zA-Z ]*$/;
                msg="*Please enter alphabet characters only.";break;
            case "address":
                reg=/^[a-zA-Z0-9,.()\- ]*$/;
                msg="*Please enter the valid address..";break;
            case "pincode":
                reg=/^[0-9]{6}$/;
                msg="*Please enter valid Pin code.";break;
           
        }
        if (!e.target.value.match(reg)) {
            err[e.target.name] = msg;
            if(this.state.str.indexOf(e.target.name)<0)
            {
            this.setState({str:this.state.str+e.target.name})    
            }
            this.setState({err, formIsValid:false,})
        }
        else{
            this.setState({str:this.state.str.replace(e.target.name,"")});
        }
    }
    this.setState({submiterr:""})


  }




getUserDetails=()=> {

  
  // var id = req.params.User_id
  var user=localStorage.getItem("user")
  // console.warn("props",props.match.params.id)

          axios.get('http://3.129.92.172:5000/editUser/'+user)
              .then(Response => {

                console.log(Response)
                //localStorage.setItem("user",Response)
                  this.setState({
                  
                    // Response.data.results.data(user => ({
      
                        fullName:Response.data.result.fullName,
                        userType:Response.data.result.userType,
                        address:Response.data.result.address,
                        pincode:Response.data.result.pincode,
                        country:Response.data.result.country,
                        state:Response.data.result.state,
                        city:Response.data.result.city,
                        




                      //   state:document.getElementById("stateval").value,
                      //  city:document.getElementById("cityval").value,
                    
                       
                   })
                   document.getElementById("countryval").value=Response.data.result.country;
                   document.getElementById("stateval").value=Response.data.result.state;
                   document.getElementById("cityval").value=Response.data.result.city
                   })
              .catch(err => console.log(err));
      }
      onFileChange = (event) => {
        this.setState({ image: event.target.files[0] });
      };





    render() {
      console.log("userid  "+this.state.fullName)
        return (
          <>
          
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

          {/* <*****************************************Sign-In************************************> */}

          <div className=" mb-3">
                        <span type="text" className="form-control" name="fullname" placeholder="Enter Your Fullname" value={this.state.fullName} onBlur={this.onblur} onKeyPress={this.keypress} onChange={this.onChange} ></span>
                        <div className="errorMsg">{this.state.errors.fullname} </div></div>

          {/* <*****************************************Cart************************************> */}

          <Nav.Link className="nav-cart" href="#goTocart">
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
    <Slider/>
    <ImageSlider/>
        <TopBrands/>
        <Mobile/>
        <Best/>
        <Baby/>
        <Electronics/>
        <Project1/>
        <Footer/>

  </div>
</div>



            </>
        )
    }
}

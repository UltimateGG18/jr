
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
import { SliderData } from './components/SliderData';

import Sb from './Sb';
import { Home } from "@material-ui/icons";

 

import React, { Component , useEffect, useState } from 'react';
import "./Login.css"
import axios from "axios";
// import jwt from 'jwt-decode'
import jwtDecode from 'jwt-decode';
import {Link,withRouter } from 'react-router-dom';
import Registernew from './Registernew'
import {connect} from 'react-redux';
import {authLogin,OtpLogin} from './components/Redux/Auth/authAction'
import firebase from "./components/Config/firebase";




 class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}, formIsValid: true, submiterr: "", store: "", str: "",

    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value});
    document.getElementById("nore").style.display = "none";
    document.getElementById("otp_err").style.display="none";
  }

  onpass=(e)=>{
    this.setState({ [e.target.name]: e.target.value});
    document.getElementById("nore").style.display = "none";
  }

  onOtp=()=>{
    if(this.state.otp.match(/^\d{6}$/))
    {
      this.state.authfn.confirm(this.state.otp)
        .then((result) => {
          document.getElementById("recaptcha-container").style.display = "none";
          var obj = {mobile: this.state.emailOrMob};
          this.props.OtpLogin(obj, this.props.history);
        })
        .catch(err=>{
          document.getElementById("otp_err").style.display = "block"; 
          document.getElementById("otp_err").innerHTML =  "The SMS verification code used to create the phone auth credential is invalid.";
        })
    }
    else{
      document.getElementById("otp_err").style.display = "block"; 
      document.getElementById("otp_err").innerHTML =  "Please enter valid 6 digit OTP";
    }
  }

  informdiv=()=>{
    document.getElementById("emOrMo").innerHTML=document.getElementById("emailOrMob").value;
    document.getElementById("emailOrMob").style.display="none";
    window.$('#iptdiv').addClass('d-none');
    window.$('#lableDiv').removeClass('d-none').addClass('d-block d-flex');
  }
  
  conti=()=>{
  if(this.state.emailOrMob=="" || this.state.emailOrMob==undefined)
  {
    document.getElementById("nore").style.display="block";
    document.getElementById("nore").innerHTML="Please fill all the details"
  }else{
    var email = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
    var numre = /^\d{10}$/;
    if(this.state.emailOrMob.match(numre) || this.state.emailOrMob.match(email)){
      if(this.state.emailOrMob.match(email)){
        this.informdiv()
        window.$('#pass').removeClass('d-none').addClass('d-block');
        window.$('#emailpass').removeClass('d-none').addClass('d-block'); 
        window.$('#conti').removeClass('d-block').addClass('d-none')
      }else{
        document.getElementById("forgot_pass").style.display="none"
        this.informdiv()
        let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha-container");       
          firebase.auth()
            .signInWithPhoneNumber("+91" + this.state.emailOrMob, recaptcha)
            .then((e) => {
              this.setState({authfn:e})
              window.$("#otpdiv").addClass("d-block").removeClass("d-none");
              document.getElementById("otp").focus();
              document.getElementById("recaptcha-container").style.display = "none";
            })
            .catch(error=>{
              this.msgdispaly(error.message)
              window.$('#tryagain').addClass('d-block')
            });
          if (recaptcha != null) {
            window.$('#conti').removeClass('d-block').addClass('d-none') 
          }
      }
    }else{
      document.getElementById("nore").style.display = "block"; 
        document.getElementById("nore").innerHTML =  "Please Enter valid email or 10 digit mobile number without any special characters";
    }
  }
  }

  changeIptVal=()=>{
    window.location.reload()
  }
  
  tryagain=()=>{
    window.location.reload()
  }

  msgdispaly=(error)=>{
    window.$("#otpdiv").addClass("d-none").removeClass("d-block");
    document.getElementById("auth_err").style.display="block"
    document.getElementById("auth_err").innerHTML =error;
    document.getElementById("recaptcha-container").style.display = "none";
  }
 
  formsubmit = () => {
    var email = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
    const { emailOrMob, password } = this.state
    if (emailOrMob !== undefined && password !== undefined ) {
      if(emailOrMob.match(email))
      {
        var obj = {
          email: this.state.emailOrMob,
          password: this.state.password,
        }
        this.props.authLogin(obj, this.props.history);
      }
      else{
        document.getElementById("nore").style.display="block";
        document.getElementById("nore").innerHTML="Please enter valid email"
      }
    }
    else{
      document.getElementById("nore").style.display="block";
      document.getElementById("nore").innerHTML="Please fill all the details"
    }
  }



      

    render() {
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

  </div>
</div>
<section id="form" style={{border:"none"}}>
		<div class="container">
			<div class="row">
<div class="col-sm-4 col-sm-offset-1">
					
<div id="main-registration-container">
        <div id="login">
          <div className="register-box">
           
            <span className="text-danger" id="faliur_msg"></span>
            <div className="card">
              <div className="card-body register-card-body">
                <p className="login-box-msg">
                  <h5>Sign in </h5>
                </p>
                <div className="row mb-3" id="iptdiv">
                  <label className="login-label">Email or mobile phone number</label>
                  <input id="emailOrMob" type="text" className="form-control" name="emailOrMob" value={this.state.emailOrMob} onChange={this.onChange} />
                </div>
                <div className="row d-none mb-2 justify-content-around" id="lableDiv">
                  <div className="col-md-8"><lable id="emOrMo"></lable></div>
                  <div className="col-md-3"><button className="btn btn-info" onClick={this.changeIptVal} style={{padding:"inherit",backgroundColor:"#740623"}}>change</button></div>
                </div>
               
                <div className="row justify-content-center">
                  <div id="recaptcha-container"></div>
                </div>
                
                  <div className="row mb-3 d-none" id="pass">
                    <input type="password" className="form-control" name="password" placeholder=" Enter Your Password" value={this.state.password} onChange={this.onpass}  />
                  </div>
                  <div className="row">
                    <span className="text-danger mb-4 err_msg" id="nore"></span>
                </div>
                <div className="row justify-content-center d-none" id="otpdiv">
                  <input type="text" className="form-control" placeholder="Enter the OTP" id="otp" name="otp" value={this.state.otp} onChange={this.onChange}></input>
                 
                  <span className="text-danger mt-1" id="otp_err"></span>
                  <div className="row justify-content-center mt-3"> 
                    <button className="btn btn-primary" onClick={this.onOtp} style={{backgroundColor:"#740623"}}>Continue</button>
                  </div>
                </div>
               
                <div className="row justify-content-center">
                  <div className="btn btn-primary" onClick={this.conti} id="conti" style={{backgroundColor:"#740623"}}>Continue</div>
                </div>
                <span className="text-danger" id="auth_err"></span>
                <div className="row justify-content-center">
                  <button className="btn btn-danger btn-block d-none" id="tryagain" onClick={this.tryagain} style={{backgroundColor:"#740623"}}>Try Again</button>
                </div>
                  <div className="row justify-content-center">
                    {/* <div className="col-8">
                      <div className="icheck-primary">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">
                          Remember Me
                   </label>
                      </div>
                    </div> */}
                    {/* <div className="col-4"> */}
                      <div className="errorMsg">{this.state.submiterr}</div>
                      <button onClick={this.formsubmit} className="btn btn-primary d-none" id="emailpass" style={{backgroundColor:"#740623"}}>Submit</button>
                      {/* </div> */}
                      </div>
                    <div className="social-auth-links text-center mb-3">
                      <p className="login-or">- OR -</p>
                      <p className="mb-1" id="forgot_pass">
                        <a href="#" style={{fontFamily:"poppins"}}>I forgot my password</a>
                      </p>
                      
                    </div>

                  
               
              </div>
            </div>
          </div>
        </div>
      </div>


            </div>
            <pre>           </pre>

            <div class="col-sm-1">
            <br/>
            <br/>
            <br/>
            <br/>
					<h2 class="or">OR</h2>
				</div>
            

        <div class="col-sm-4">
					<div class="signup-form">
            <Registernew/>
            </div>
            </div>
            </div>
            </div>
            </section>

            </>
        )
    }
}
const mapStateToProps=state=>({
  auth:state.auth
})
export default connect(mapStateToProps, {authLogin,OtpLogin})(withRouter(Login));
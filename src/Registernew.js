
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




import React, { Component ,useEffect, useState } from 'react';
import "./Registration.css"
import axios from "axios";
import './Registration.css';
import Login from './Login'
import {Link} from 'react-router-dom';


export default class Registernew extends Component {
    constructor(props) {
        super(props);
        this.state = {country: "", state: "", city: "", errors: {}, formIsValid: true, submiterr: "", str: "",
        }
    }

    componentDidMount(){
      var selectedRegion;
      var selectedCity;
      var countryCode;
      var region;
      var selectedCountry = (selectedRegion = selectedCity = "");
      // This is a demo API key for testing purposes. You should rather request your API key (free) from http://battuta.medunes.net/
      var BATTUTA_KEY = "00000000000000000000000000000000";
      // 00000000000000000000000000000000
      // Populate country select box from battuta API
     var url =
        "https://battuta.medunes.net/api/country/all/?key="+
        BATTUTA_KEY +
        "&callback=?";
    
      // EXTRACT JSON DATA.
      window.$.getJSON(url, function(data) {
        console.log(data);
        window.$.each(data, function(index, value) {
          // APPEND OR INSERT DATA TO SELECT ELEMENT.
          window.$("#country").append(
            '<option value="' + value.code + '">' + value.name + "</option>"
          );
        });
      });
      // Country selected --> update region list .
      window.$("#country").change(function() {
        selectedCountry = this.options[this.selectedIndex].text;
        countryCode = window.$("#country").val();
        // Populate country select box from battuta API
        url =
          "https://battuta.medunes.net/api/region/" +
          countryCode +
          "/all/?key=" +
          BATTUTA_KEY +
          "&callback=?";
        window.$.getJSON(url, function(data) {
          window.$("#region option").remove();
          window.$('#region').append('<option value="">Please select your region</option>');
          window.$.each(data, function(index, value) {
            // APPEND OR INSERT DATA TO SELECT ELEMENT.
            window.$("#region").append(
              '<option value="' + value.region + '">' + value.region + "</option>"
            );
          });
        });
      });
      // Region selected --> updated city list
      window.$("#region").on("change", function() {
        selectedRegion = this.options[this.selectedIndex].text;
        // Populate country select box from battuta API
        countryCode = window.$("#country").val();
        region = window.$("#region").val();
        url =
          "https://battuta.medunes.net/api/city/" +
          countryCode +
          "/search/?region=" +
          region +
          "&key=" +
          BATTUTA_KEY +
          "&callback=?";
       window.$.getJSON(url, function(data) {
          console.log(data);
          window.$("#city option").remove();
          window.$('#city').append('<option value="">Please select your city</option>');
         window.$.each(data, function(index, value) {
            // APPEND OR INSERT DATA TO SELECT ELEMENT.
            window.$("#city").append(
              '<option value="' + value.city + '">' + value.city + "</option>"
            );
          });
        });
      });
      // city selected --> update location string
      window.$("#city").on("change", function() {
        selectedCity = this.options[this.selectedIndex].text;
        window.$("#countryval").val(
              selectedCountry 
          );
          window.$("#stateval").val(
              selectedRegion
          );
          window.$("#cityval").val(
              selectedCity
          );
      });
    
    }
    onChange = (e) => {
        var err = this.state.errors;
        err[e.target.name] = "";
        this.setState({ [e.target.name]: e.target.value, err });
    }
    onblur = (e) => {
        var err = this.state.errors;
        if (this.state[e.target.name] === undefined || this.state[e.target.name] === "") {
            err[e.target.name] = "Please enter the value."
            this.setState({ err, formIsValid: false, })
            if (this.state.str.indexOf(e.target.name) < 0) {
                this.setState({ str: this.state.str + e.target.name })
            }
        }
        else {
            let reg, msg;
            switch (e.target.name) {
                case "fullname":
                    reg = /^[a-zA-Z ]*$/;
                    msg = "*Please enter alphabet characters only."; break;
                case "address":
                    reg = /^[a-zA-Z0-9,.()\- ]*$/;
                    msg = "*Please enter the valid address.."; break;
                case "emailid":
                    reg = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
                    msg = "*Please enter valid email-ID."; break;
                case "mobileno":
                    reg = /^[0-9]{10}$/;
                    msg = "*Please enter your mobile no."; break;
                case "password":
                    reg = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/;
                    msg = "*Please enter secure and strong password."; break;
                case "pin":
                    reg = /^[0-9]{6}$/;
                    msg = "*Please enter valid Pin code."; break;
            }
            if (!e.target.value.match(reg)) {
                err[e.target.name] = msg;
                if (this.state.str.indexOf(e.target.name) < 0) {
                    this.setState({ str: this.state.str + e.target.name })
                }
                this.setState({ err, formIsValid: false, })
            }
            else {
                this.setState({ str: this.state.str.replace(e.target.name, "") });
            }
        }
        this.setState({ submiterr: "" })
    }

    formsubmit = (e) => {
        e.preventDefault();
        const { fullname, address, emailid, mobileno, password, pin } = this.state
        var country = document.getElementById("countryval").value;
        var state = document.getElementById("stateval").value
        var city = document.getElementById("cityval").value
        if (fullname !== undefined && address !== undefined && emailid !== undefined && mobileno !== undefined && pin !== undefined && password !== undefined && this.state.str === "" && country !== "" && state !== "" && city !== "") {
            var obj = {
                jbpId: "JBP-" + Math.floor(Math.random() * 9999999999),
                fullName: this.state.fullname,
                mail: this.state.emailid,
                password: this.state.password,
                mobile: this.state.mobileno,
                userType: this.state.userType,
                address: this.state.address,
                pincode: this.state.pin,
                country: document.getElementById("countryval").value,
                state: document.getElementById("stateval").value,
                city: document.getElementById("cityval").value
            }
            axios.post("http://3.129.92.172:5000/register", obj)
                .then((res) => {
                    if (res.status = "200") {
                        // console.log(res.data)
                        this.props.history.push("/")
                    }
                    else {
                        console.log(res.status)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            this.setState({ submiterr: "please fill all the fields valid details" })
            return false;
        }
    }
// btn1=()=>{
//     window.$("#div1").addClass("d-block").removeClass("d-none")
//     window.$("#div2").addClass("d-none").removeClass("d-block")
//     this.setState({temp:true})
// }
// btn2=()=>{
//     window.$("#div2").addClass("d-block").removeClass("d-none")
//     window.$("#div1").addClass("d-none").removeClass("d-block")
//     this.setState({temp:true})
// }

      

    render() {
        return (
            <div id="main-registration-container">
                
            <div id="register">
                {/* <button onClick={this.btn1}>btn1</button>
                <button onClick={this.btn2}>btn2</button> */}
            {/* <div id="div1" className="d-none"><div className=" mb-3">
                                    <select id="country" name="country" class='form-control' ><option value="">-- Country --</option></select>
                                    <div className="errorMsg">{this.state.country}</div></div></div>
            <div id="div2" className="d-none">  <div className=" mb-3">
                                    <input type="text" className="form-control" name="fullname" placeholder="Enter Your Fullname" value={this.state.fullname} onBlur={this.onblur} onKeyPress={this.keypress} onChange={this.onChange} />
                                    <div className="errorMsg">{this.state.errors.fullname} </div></div>
                                <div className=" mb-3">
                                    <input type="text" className="form-control" name="emailid" placeholder=" Enter Your Email" value={this.state.emailid} onChange={this.onChange} onBlur={this.onblur} onKeyPress={this.keypress} />
                                    <div className="errorMsg">{this.state.errors.emailid}</div></div></div> */}
                <div className="register-box">
                    <div className="card">
                        <div className="card-body register-card-body">
                            <p className="login-box-msg">Register a new membership</p>
                            <form method="post" name="userRegistrationForm" onSubmit={this.formsubmit} >
                                <div className=" mb-3">
                                    <input type="text" className="form-control" name="fullname" placeholder="Enter Your Fullname" value={this.state.fullname} onBlur={this.onblur} onKeyPress={this.keypress} onChange={this.onChange} />
                                    <div className="errorMsg">{this.state.errors.fullname} </div></div>
                                <div className=" mb-3">
                                    <input type="text" className="form-control" name="emailid" placeholder=" Enter Your Email" value={this.state.emailid} onChange={this.onChange} onBlur={this.onblur} onKeyPress={this.keypress} />
                                    <div className="errorMsg">{this.state.errors.emailid}</div></div>
                                <div className=" mb-3">
                                    <input type="password" className="form-control" name="password" placeholder=" Enter Your Password" value={this.state.password} onChange={this.onChange} onBlur={this.onblur} onKeyPress={this.keypress} />
                                    <div className="errorMsg">{this.state.errors.password}</div></div>
                                <div className=" mb-3">
                                    <input type="text" className="form-control" name="mobileno" placeholder=" Enter Your Mobile No" value={this.state.mobileno} onChange={this.onChange} onBlur={this.onblur} onKeyPress={this.keypress} />
                                    <div className="errorMsg">{this.state.errors.mobileno}</div></div>
                                <div className=" mb-3">
                                    <select class="dropdown" className="form-control" id="usertype" name="userType" vlaue={this.state.userType} onChange={this.onChange}>
                                        <option value="" >--User Type--</option>
                                        <option value="Customer">Customer</option>
                                        <option value="sales">sales</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Logistic">Logistic</option>
                                        <option value="Shopkeeper">Shopkeeper</option>
                                        <div className="errorMsg">{this.state.userType}</div></select></div>
                                <div className=" mb-3">
                                    <input type="text" name="address" class="form-control" placeholder=" Enter Your Address" value={this.state.address} onChange={this.onChange} onBlur={this.onblur} onKeyPress={this.keypress} />
                                    <div className="errorMsg">{this.state.errors.address}</div></div>
                                <div className=" mb-3">
                                    <input type="text" name="pin" placeholder="Enter Pincode" class='form-control' value={this.state.pin} onChange={this.onChange} onBlur={this.onblur} />
                                    <div className="errorMsg">{this.state.errors.pin}</div></div>
                                <div className=" mb-3">
                                    <select id="country" name="country" class='form-control' ><option value="">-- Country --</option></select>
                                    <div className="errorMsg">{this.state.country}</div></div>
                                <div className=" mb-3">
                                    <select id="region" name="state" class='form-control' ><option value="">-- State --</option></select>
                                    <div className="errorMsg">{this.state.state}</div>   </div>
                                <div className=" mb-3">
                                    <select id="city" name="city" class='form-control' ><option value="">-- City --</option></select>
                                    <input type="hidden" id="countryval"></input>
                                    <input type="hidden" id="stateval"></input>
                                    <input type="hidden" id="cityval"></input></div>
                                <div className="row">
                                    <div className="col-8">
                                        <div className="icheck-primary">
                                            <input type="checkbox" id="agreeTerms" name="terms" defaultValue="agree" />
                                            <label htmlFor="agreeTerms">
                                                I agree to the <a href="#">terms</a>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="errorMsg">{this.state.submiterr}</div>
                                        <button type="submit"  onClick={this.formsubmit} className="btn btn-primary">Submit</button></div>
                                    <a href="/" className="text-center">I already have a membership</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

       

          
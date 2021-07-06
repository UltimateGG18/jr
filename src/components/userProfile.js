

import React, { Component } from 'react';
import axios from "axios";
import { Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {Table,Modal} from 'react-bootstrap'

import { shopKeeperLogin } from './Redux/Auth/authAction';

class userProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [], shopkeeper: [], prodimage: [], profileImg: 'https://www.hrzone.com/sites/all/themes/pp/img/default-user.png',
      selected: 'Home', User_id: this.props.User_id,
      country: "", state: "", city: "", errors: {}, formIsValid: true, submiterr: "", str: "", image: "", message: "",images:[],product:[],
    }
    this.getUserDetails();
    
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
        case "fullName":
          reg = /^[a-zA-Z ]*$/;
          msg = "*Please enter alphabet characters only."; break;
        case "address":
          reg = /^[a-zA-Z0-9,.()\- ]*$/;
          msg = "*Please enter the valid address.."; break;
        case "pincode":
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


  

  getUserDetails = () => {
    // console.log(this.props.auth)
    console.log(Response);
    var user=this.props.auth.user.id
    axios.get('http://3.129.92.172:5000/editUser/' + user)
      .then(Response => {

        console.log(Response)
        this.setState({
          fullName: Response.data.result.fullName,
          userType: Response.data.result.userType,
          address: Response.data.result.address,
          pincode: Response.data.result.pincode,
          country: Response.data.result.country,
          state: Response.data.result.state,
          city: Response.data.result.city,
          Image: Response.data.result.Image

         
        

      })
            })
      .catch(err => console.log(err));
      console.log(Response);
  }


  formsubmit = () => {
    //e.preventDefault();
    var user=this.props.auth.user.id

    const { fullName, address, pincode } = this.state
    var country = document.getElementById("countryval").value;
    var state = document.getElementById("stateval").value
    var city = document.getElementById("cityval").value


    if (fullName !== undefined && address !== undefined && pincode !== undefined && this.state.str === "" && country !== "" && state !== "" && city !== "") {
      const fd = new FormData();
      fd.append("id", user);
      fd.append("fullName", this.state.fullName);
      fd.append("Image", this.state.Image);
      fd.append("address", this.state.address);
      fd.append("pincode", this.state.pincode);
      fd.append("country", document.getElementById("countryval").value);
      fd.append("state", document.getElementById("stateval").value);
      fd.append("city", document.getElementById("cityval").value)
      axios.post("http://3.129.92.172:5000/updateUser", fd)

         .then((res) => {
           if (res.status = "200") {
             console.log(res.data)
             this.props.history.push("/Sidebar")
             this.setState({ message: "data update succesfully" });
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

  imageHandler = (e) => {
    console.log(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
       if (reader.readyState == 2) {
         this.setState({ profileImg: reader.result })
       }
     }
     reader.readAsDataURL(e.target.files[0]);
    this.setState({ image: e.target.files[0], profileImg: reader.readAsDataURL });


  }



  render() {
   
    return (
      <div>
        {/* <Sidebar /> */}
         <div className="content-wrapper">
           {/* Content Header (Page header) */}
           <section className="content-header">
            <div className="container-fluid">
               <div className="row mb-2">
                 <div className="col-sm-6">
                    <h1>Profile</h1>
                 </div>
                 <div className="col-sm-6">
                   <ol className="breadcrumb float-sm-right">
                     <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">User Profile</li>
                   </ol>
                 </div>
               </div>
             </div>{/* /.container-fluid */}
           </section>
           {/* Main content */}
          <section className="content">
             <div className="container-fluid">
               <div className="row"> 
                 <div className="col-md-3">
                   {/* Profile Image */}
                  <div className="card card-primary card-outline">
                    <div className="card-body box-profile">
                    <div className="text-center"> 

                         <div className="img-holder">


                           <img class="fa fa-camera fa-3x" style={{ width: 200, height: 200, borderRadius: 400 / 2 }} src={'http://3.129.92.172:5000/1623673027297-300x280h.png'} alt="please upload your photo" id="showimg" className="image" />



                         </div>



                       <div class="text-cente">

                           <input class="fa fa-camera fa-3x" type="file" id="image" name="image" style={{ width: 50, height: 50, color: "lightblue", border: "none", position: 'relative', marginLeft: 200 }} onChange={this.imageHandler} />

                         </div>
                       </div>
                       <ul className="list-group list-group-unbordered mb-3">

                         <li className="list-group-item">
                           <b>Voulets</b> <a className="float-right">543</a>
                         </li>
                         <li className="list-group-item">
                          <b>Status</b> <a className="float-right">ordered</a>
                         </li>
                      </ul>

                     </div> 

                    {/* /.card-body */}
                   </div>
                 </div>

                <div className="col-md-9">
                   <div className="card">

                    <ul class="nav nav-pills">
                       <li class="nav-item"><a class="nav-link active" href="#activity" data-toggle="tab">Setting</a></li>
                     </ul>
                    <div className="card-body">
                      <div className="tab-content">
                         <div className="active tab-pane" id="activity">
                           <div className="post">
                             <div className="user-block">

                             </div>
                             <div className=" mb-3">
                              <input type="text" className="form-control" name="fullName" placeholder="Enter Yours Fullname" value={this.state.fullName} onBlur={this.onblur} onKeyPress={this.keypress} onChange={this.onChange} />
                               <div className="errorMsg">{this.state.errors.fullname} </div></div>






                           {/* 
// <div className=" mb-3">
// <select class="dropdown" className="form-control" id="usertype" name="userType" onChange={this.onChange} value={this.state.userType} >
// <option value="" >--User Type--</option>
// <option value="Customer">Customer</option>
// <option value="sales">sales</option>
// <option value="Admin">Admin</option>
// <option value="Logistic">Logistic</option>
// <option value="Shopkeeper">Shopkeeper</option>
// <div className="errorMsg">{this.state.userType}</div></select></div>
//   */}

                            <div className=" mb-3">
                              <input type="text" name="address" class="form-control" placeholder=" Enter Your Address" value={this.state.address} onChange={this.onChange} onBlur={this.onblur} onKeyPress={this.keypress} />
                              <div className="errorMsg">{this.state.errors.address}</div></div>


                             <div className=" mb-3">
                               <input type="text" name="pincode" placeholder="Enter Pincode" class='form-control' value={this.state.pincode} onChange={this.onChange} onBlur={this.onblur} onKeyPress={this.keypress} />
                               <div className="errorMsg">{this.state.errors.pin}</div></div>



                            <div className="mb-3">
                              <input type="text" class="form-control" value={this.state.country} readonly="true" /></div>

                            <div className=" mb-3">
                               <select id="country" name="country" class='form-control' >
                                 <option value="">-- Country --</option></select>
                              <div className="errorMsg"></div></div>

                            <div className=" mb-3">
                               <input type="text" class='form-control' value={this.state.state} readonly="true" /></div>
                            <div className=" mb-3">
                               <select id="region" name="state" class='form-control' >
                                 <option value="">-- State --</option></select>
                               <div className="errorMsg"></div></div>




                             <div className=" mb-3">
                               <input type="text" className="form-control" value={this.state.city} readonly="true" />                             </div>

                             <div className=" mb-3">
                               <select id="city" name="city" class='form-control' style={{width:'100%'}}><option value="">-- City --</option></select>
                               <input type="hidden" id="countryval"></input>
                               <input type="hidden" id="stateval"></input>
                               <input type="hidden" id="cityval"></input>
                               </div>
                                <div className="errorMsg"></div>


                             {/* <div className="row">
                               <div className="col-8">
                                 <div className="icheck-primary">


                                </div>
                               </div> */}
                               <div className="text-center">
                                 <div className="errorMsg">{this.state.submiterr}</div>
                                 <button onClick={this.formsubmit} style={{width:'10%'}} className="btn btn-primary">Update</button></div>
                           
                           </div>
                         </div>
                       </div>
                     </div>


                   </div>
                 </div>
              </div>
             </div>
           </section>
        </div>



      </div>

     )
   }
  
 }

 const mapStateToProps=state=>({
  auth:state.auth
})
export default  connect(mapStateToProps, {})(withRouter(userProfile));

















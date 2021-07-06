import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import { Table } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';


 class orderlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [], shopkeeper: [], prodimage: [], profileImg: 'https://www.hrzone.com/sites/all/themes/pp/img/default-user.png',
      User_id: this.props.User_id,
      country: "", state: "", city: "", errors: {}, formIsValid: true, submiterr: "", str: "", image: "", message: "",
      handlePageChange: "", divcontainer: false,


    }

    this.getOrderData();
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

  getOrderData = () => {
    console.log(Response);
    var Shopkeeper=this.props.auth.Shopkeeper.jbpId
    // var jbpId = localStorage.getItem("jbpId");
    axios.get('http://3.129.92.172:5000/shopkeeperorder/' + Shopkeeper)

      .then(Response => {
        console.log(Response)
        
        this.setState({
          shopkeeper: Response.data.result,
          prodimage: Response.data.result,


        })
      })

      .catch(err => console.log(err));
      console.log(Response);
  }

  render() {

    console.log(this.props.auth);


    return (
      <div className="content-wrapper">
        <section class="content">
          <div class="container-fluid">

            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title">Shopkeeper Order Detail</h3>
                  </div>


                  {/* <!-- /.card-header --> */}
                  <div class="card-body">

                    {/* <table id="example1" class="table table-striped table-bordered table-sm" width="50%" cellSpacing="0"> */}
                    <Table responsive>
                      <thead>

                        <tr>

                          <th>UserId</th>
                          <th>Product Name</th>
                          <th>Product Price</th>
                          <th> Product  Image</th>
                          <th> Payment Mode</th>
                          <th>Status</th>
                          <th>Amount</th>
                          <th>Quantity</th>
                          <th> Return Status</th>
                          <th> Refund Status</th>
                          <th>Create Date</th>



                        </tr>


                      </thead>

                      <tbody>
                        {
                          this.state.shopkeeper.map((key, index) =>


                            <tr>
                              <td key={index}>
                                {key.userId._id}
                              </td>
                              <td key={index}>
                                {key.prodNm}
                              </td>


                              <td key={index}>
                                {key.prodPrice}
                              </td>

                              <td key={index}>

                                <img style={{ width: 140 }} src={`http://3.129.92.172:5000/${key.prodimage}`}></img>



                              </td>

                              <td key={index}>
                                {key.Shopkeeper.paymentMode}
                              </td>
                              <td key={index}>
                                {key.status}
                              </td>
                              <td key={index}>
                                {key.amount}
                              </td>
                              <td key={index}>
                                {key.quantity}
                              </td>
                              <td key={index}>
                                {key.returnStatus}
                              </td>

                              <td key={index}>
                                {key.refundStatus}
                              </td>


                              <td key={index}>
                                {key.createdDt}
                              </td>


                            </tr>)}
                        {
                          this.state.shopkeeper.map((key, index) =>
                            <tr>
                              <td key={index}>
                                {key.userId._id}
                              </td>
                              <td key={index}>
                                {key.prodNm}
                              </td>


                              <td key={index}>
                                {key.prodPrice}
                              </td>

                              <td key={index}>

                                <img style={{ width: 140 }} src={`http://3.129.92.172:5000/${key.prodimage}`}></img>



                              </td>

                              <td key={index}>
                                {key.paymentMode}
                              </td>
                              <td key={index}>
                                {key.status}
                              </td>
                              <td key={index}>
                                {key.amount}
                              </td>
                              <td key={index}>
                                {key.quantity}
                              </td>
                              <td key={index}>
                                {key.returnStatus}
                              </td>

                              <td key={index}>
                                {key.refundStatus}
                              </td>


                              <td key={index}>
                                {key.createdDt}
                              </td>

                            </tr>)
                        }


                        {
                          this.state.shopkeeper.map((key, index) =>
                            <tr>
                              <td key={index}>
                                {key.userId._id}
                              </td>
                              <td key={index}>
                                {key.prodNm}
                              </td>


                              <td key={index}>
                                {key.prodPrice}
                              </td>

                              <td key={index}>

                                <img style={{ width: 140 }} src={`http://3.129.92.172:5000/${key.prodimage}`}></img>


                              </td>

                              <td key={index}>
                                {key.paymentMode}
                              </td>
                              <td key={index}>
                                {key.status}
                              </td>
                              <td key={index}>
                                {key.amount}
                              </td>
                              <td key={index}>
                                {key.quantity}
                              </td>
                              <td key={index}>
                                {key.returnStatus}
                              </td>

                              <td key={index}>
                                {key.refundStatus}
                              </td>


                              <td key={index}>
                                {key.createdDt}
                              </td>

                            </tr>)
                        }




                        {
                          this.state.shopkeeper.map((key, index) =>
                            <tr>
                              <td key={index}>
                                {key.userId._id}
                              </td>
                              <td key={index}>
                                {key.prodNm}
                              </td>


                              <td key={index}>
                                {key.prodPrice}
                              </td>

                              <td key={index}>

                                <img style={{ width: 140 }} src={`http://3.129.92.172:5000/${key.prodimage}`}></img>


                              </td>

                              <td key={index}>
                                {key.paymentMode}
                              </td>
                              <td key={index}>
                                {key.status}
                              </td>
                              <td key={index}>
                                {key.amount}
                              </td>
                              <td key={index}>
                                {key.quantity}
                              </td>
                              <td key={index}>
                                {key.returnStatus}
                              </td>

                              <td key={index}>
                                {key.refundStatus}
                              </td>


                              <td key={index}>
                                {key.createdDt}
                              </td>

                            </tr>)
                        }

                        {
                          this.state.shopkeeper.map((key, index) =>
                            <tr>
                              <td key={index}>
                                {key.userId._id}
                              </td>
                              <td key={index}>
                                {key.prodNm}
                              </td>


                              <td key={index}>
                                {key.prodPrice}
                              </td>

                              <td key={index}>

                                <img style={{ width: 140 }} src={`http://3.129.92.172:5000/${key.prodimage}`}></img>


                              </td>

                              <td key={index}>
                                {key.paymentMode}
                              </td>
                              <td key={index}>
                                {key.status}
                              </td>
                              <td key={index}>
                                {key.amount}
                              </td>
                              <td key={index}>
                                {key.quantity}
                              </td>
                              <td key={index}>
                                {key.returnStatus}
                              </td>

                              <td key={index}>
                                {key.refundStatus}
                              </td>


                              <td key={index}>
                                {key.createdDt}
                              </td>

                            </tr>)
                        }

                        {
                          this.state.shopkeeper.map((key, index) =>
                            <tr>
                              <td key={index}>
                                {key.userId._id}
                              </td>
                              <td key={index}>
                                {key.prodNm}
                              </td>


                              <td key={index}>
                                {key.prodPrice}
                              </td>

                              <td key={index}>

                                <img style={{ width: 140 }} src={`http://3.129.92.172:5000/${key.prodimage}`}></img>


                              </td>

                              <td key={index}>
                                {key.paymentMode}
                              </td>
                              <td key={index}>
                                {key.status}
                              </td>
                              <td key={index}>
                                {key.amount}
                              </td>
                              <td key={index}>
                                {key.quantity}
                              </td>
                              <td key={index}>
                                {key.returnStatus}
                              </td>

                              <td key={index}>
                                {key.refundStatus}
                              </td>


                              <td key={index}>
                                {key.createdDt}
                              </td>

                            </tr>)
                        }

                      </tbody>
                      </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    )
  }
}

const mapStateToProps=state=>({
  auth:state.auth
})
export default  connect(mapStateToProps, {})(withRouter(orderlist));






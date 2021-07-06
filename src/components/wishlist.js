import React, { Component } from 'react';
import axios from "axios";
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Modal } from 'react-bootstrap'




class wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      productdetails: [],
       User_id: this.props.User_id, shopkeeper: [], images: [], name: "", categoryId: "", lvl2catId: "", lvl3catId: "", brand: "", price: "", availableStock: "", size: "", pattern: "", description: "", returnable: "", refundable: "", images: "",
    }
    // this.getUserDetails();
    this.getProductDetails();

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
  //  {*****view More*****}
  getProductDetails = () => {
    // console.log(this.props.auth)
    console.log(Response);
    var user = this.props.auth.user.id
    axios.get('http://3.129.92.172:5000/viewWishList/' + user)
      .then(Response => {

        console.log(Response)
        this.setState({
          shopkeeper: Response.data.result,
         


        })
        
      })

  }

  
 


  // {****deleteCart******}
  deleteCart = (id) => {
  
     var user = this.props.auth.user.id
    
      var obj = {
        userId: user,
        productId:id,
        
      }
      
      console.log(obj)
    axios.post("http://3.129.92.172:5000/deleteWishItem",obj)
      .then((res) => {
        if (res.status = "200") {
           console.log(res.data)
          this.props.history.push("/")
        }
        else {
         
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
 
  // {*******counter**********}
  Incriment = () => {
    this.setState({ count: this.state.count + 1 });
  }

  Decrement = () => {
    this.setState({ count: this.state.count - 1 });

  }
  // {*******addcart****}
  addCart = (abc) => {
    console.log(abc)
     var user = this.props.auth.user.id

    // const { count} = this.state
    // if ( quantity!== undefined)
      var obj = {
        userId: user,
        productId:abc,
       
      }
      console.log(obj)
    axios.post("http://3.129.92.172:5000/wishToCart",obj)
      .then((res) => {
        if (res.status = "200") {
           console.log(res.data)
          this.props.history.push("/")
        }
        else {
         // console.log(res.status)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }



  render() {
    return (
      <div className="content-wrapper">

        <div class="container-fluid">

          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title" style={{ color: 'black' }}>WishList</h3>
                </div>


                {/* <!-- /.card-header --> */}
                <div class="card-body">


                  <div class="col-md-6  text-right">

                    {/* <!-- Modal --> */}

                  </div>
                  {/* </div> */}

                  <Table responsive>
                    <thead>

                      <tr>


                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th> Product  Image</th>
                        <th> Brand</th>
                        <th>AvailableStock</th>
                        
                         <th>Action</th>



                      </tr>


                    </thead>
                    <tbody>
                      {
                        this.state.shopkeeper.map((key, index) =>
                          <tr>

                            <td key={index}>
                              {key.productId.name}
                            </td>


                            <td key={index}>
                              {key.productId.price}
                            </td>
              
                            <td >
                                 {/* <img style={{ width: 140 }} src={"http://3.129.92.172:5000/1624083177933-mobilecover2.jpeg"}></img> */}

                                              <img style={{width:140}} 
                                               src={`http://3.129.92.172:5000/${key.productId.images[0]}`}/>

                     </td>


                            <td key={index}>
                              {key.productId.brand}
                            </td>
                            <td key={index}>
                              {key.productId.availableStock}
                            </td>
                            
                             <td>
                              <button className="edtdel-btn" onClick={() => this.deleteCart(key.productId._id)}>
                                <i className="fa fa-trash-o text-danger" aria-hidden="true"></i></button>

                         
                         


                            <button className="cart-icon" style={{background:"transparent",border:'none'}}  onClick={() => this.addCart(key.productId._id)}>
                        <img src={"https://static.vecteezy.com/system/resources/previews/000/496/007/original/vector-add-to-cart-icon-design.jpg"} style={{width:40}}></img></button>| 
                              {/* <button type="submit" onClick={() => this.addCart(key.productId._id)}>cart</button>
 */}



                              <button type="button" class="btn btn-primary text-left" data-toggle="modal" data-target={`#m${key._id}`} onClick={() => { this.getProductDetails(key._id) }}>View More</button>

                              {/* <!-- Modal --> */}
                              <div class="modal fade bd-example-modal-lg" id={`m${key._id}`} role="dialog" tabindex="-1" aria-labelledby={`dy${key._id}`} aria-hidden="true">
                                <div class="modal-dialog modal-lg">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h4 class="modal-title text-left" id={`dy${key._id}`}>Product Details</h4>
                                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    </div>
                                    <div class="modal-body">
                                      <div class="modal-body text-center">
                                        <table class="table table-hover table-bordered">
                                          <tbody>
                                          <img style={{width:140}} 
                                               src={`http://3.129.92.172:5000/${key.productId.images[0]}`}/>

                     
                                               <Table responsive>

                                                  <tr>
                                                <th>Product Name:</th>

                                                <td key={index}> {key.productId.name}</td>

                                              </tr>
                                              {/* {
                 this.state.product.map((key)=>

                 
      <tr>
    <th>Image:</th> 
    <td>         
    <img  style ={{width:140}} src={"http://3.129.92.172:5000/"+key.images}></img> </td>  
  </tr>
                 )} */}

                                              <tr>
                                                <th>Brand:</th>
                                                <td key={index}> {key.productId.brand}</td>
                                              </tr>

                                              <tr>
                                                <th>Price:</th>
                                                <td key={index}> {key.productId.price}</td>
                                              </tr>
                                              <tr>
                                                <th>Available Stock:</th>
                                                <td key={index}> {key.productId.availableStock}</td>
                                              </tr>
                                              <tr>
                                                <th>Size:</th>
                                                <td key={index}> {key.productId.size}</td>
                                              </tr>
                                              <tr>
                                                <th>Pattern:</th>
                                                <td key={index}> {key.productId.pattern}</td>
                                              </tr>
                                              <tr>
                                                <th>Price:</th>
                                                <td key={index}> {key.productId.price}</td>
                                              </tr>
                                              <tr>
                                                <th>Available Stock:</th>
                                                <td key={index}> {key.productId.availableStock}</td>
                                              </tr>
                                              <tr>
                                                <th>Size:</th>
                                                <td key={index}> {key.productId.size}</td>
                                              </tr>
                                              <tr>
                                                <th>Pattern:</th>
                                                <td key={index}> {key.productId.pattern}</td>
                                              </tr>

                                              <tr>
                                                <th>Description:</th>
                                                <td key={index}> {key.productId.description}</td>
                                              </tr>

                                              <tr>
                                                <th>Sub-Category:</th>
                                                <td key={index}> {key.productId.lvl2catId}</td>
                                              </tr>
                                              <tr>
                                                <th>Sub Sub-Category:</th>
                                                <td key={index}> {key.productId.lvl3catId}</td>
                                              </tr>

                                                <tr>
                                                <th>Returnable:</th>
                                                <td key={index}> {key.productId.returnable}</td>
                                              </tr>
                                              <tr>
                                                <th>Refundable:</th>
                                                <td key={index}> {key.productId.refundable}</td>
                                              </tr>





                                            </Table>
                                          </tbody>
                                        </table>
                                      </div>


                                    </div>
                                  </div>
                                </div>
                              </div>



                            </td>

                          </tr>)}

                    </tbody>

                  </Table>

                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }

}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, {})(withRouter(wishlist));




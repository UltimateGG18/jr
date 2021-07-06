import React, { Component } from 'react';
import axios from "axios";
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Modal } from 'react-bootstrap'


 class Cart extends Component {
  constructor(props) {
    super(props);

  this.state = {
    count: 1,
    productdetails: [],total:[],
    selected: 'Home', User_id: this.props.User_id, cartdetail:[], name: "", categoryId: "", lvl2catId: "", lvl3catId: "", brand: "", price: "", availableStock: "", size: "", pattern: "", description: "", returnable: "", refundable: "", images: "",
  }
  this.getProductDetails();

}

  // {*******counter**********}
  Incriment = () => {
    this.setState({ count: this.state.count + 1 });
  }

  Decrement = () => {
    this.setState({ count: this.state.count - 1 });

  }
  getProductDetails = () => {
    // console.log(this.props.auth)
    console.log(Response);
    var user = this.props.auth.user.id
    axios.get('http://3.129.92.172:5000/viewCart/' + user)
      .then(Response => {

        console.log(Response)
        this.setState({
      cartdetail: Response.data.cartdetail,
      total:Response.data.total,
         


        })
        
      })

  }
  deleteCart = (id) => {
  
    var user = this.props.auth.user.id
   
     var obj = {
       userId: user,
       productId:id,
       
     }
     
     console.log(obj)
   axios.post("http://3.129.92.172:5000/deleteCart",obj)
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

// *****************updateCart****************

updateCart = (id) => {

  var user = this.props.auth.user.id
 
   var obj = {
     userId: user,
     productId:id,
     id:id,
     
   }
   
   console.log(obj)
 axios.post("http://3.129.92.172:5000/deleteCart",obj)
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


















 addCart = (abc) => {
    console.log(abc)
     var user = this.props.auth.user.id

     const { count} = this.state
    // if ( quantity!== undefined)
      var obj = {
        userId: user,
        productId:abc,
        quantity:this.state.count,
       
      }
      console.log(obj)
    axios.post("http://3.129.92.172:5000/addCart",obj)
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
    return ( <div className="content-wrapper">

    <div class="container-fluid">

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title" style={{ color: 'black' }}>Shopping Cart</h3>
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
          <th>Name</th>
          <th>brand</th>
          <th>Image</th>
          <th>Quantity</th>
         <th>Price</th> 
          <th>Discount</th>
          <th>DiscountedPrice</th>
          <th>DiscountTotal Price</th>
         <th>Update</th>
         <th>Action</th>
          </tr>
          </thead>
          <tbody>
        
                       { 
                        this.state.cartdetail.map((key, index) =>
                    
                          <tr>
                              <td key={index}>
                              {key.cart.productId.name}
                            </td>
                            <td key={index}>
                              {key.cart.productId.brand}
                            </td>
                            <td >
                            <img style={{width:140}} 
                                               src={`http://3.129.92.172:5000/${key.cart.productId.images[0]}`}/>

                            </td>
                            
                           <td key={index}>
                              {key.cart.quantity}
                            </td>
                            <td key={index}>
                              {key.cart.productId.price}
                            </td>
                           
                            <td key={index}>
                              {key.discount}
                            </td>
                            <td key={index}>
                              {key.discountedPrice}
                            </td>
                            <td key={index}>
                              {key.discountedTotalPrice}
                            </td>
                            
                            <td>
                            <button className="edtdel-btn" onClick={() => this.Decrement(key.cart.productId._id)}>-</button>
                          <input type="text" style={{width:30}}value={this.state.count}/>
                          <button className="edtdel-btn"  onClick={() => this.Incriment(key.cart.productId._id)}>+</button>
                             </td>
                            <td>
                            <button className="edtdel-btn" onClick={() => this.deleteCart(key.cart.productId._id)}>
                                <i className="fa fa-trash-o text-danger" aria-hidden="true"></i></button>
                                {/* <button className="cart-icon" style={{background:"transparent",border:'none'}}  onClick={() => this.addCart(key.productId._id)}>
                                <img src={"https://static.vecteezy.com/system/resources/previews/000/496/007/original/vector-add-to-cart-icon-design.jpg"} style={{width:40}}></img></button>
                        */}
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
export default connect(mapStateToProps, {})(withRouter(Cart));



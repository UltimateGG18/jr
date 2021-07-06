import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {onLogout} from '../Redux/Auth/authAction';
import {connect} from 'react-redux';
class ShopNav extends Component {
  constructor(props){
    super(props);
  }

  logOut=()=>{
     this.props.onLogout(this.props.history);
 }
  render() {
    return (
      <div>
        <div className="wrapper">
          {/* Navbar */}
          <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" data-widget="pushmenu" href="#">
                  <i className="fas fa-bars" />
                </a>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <a href="../../index3.html" className="nav-link">
                  Home
                </a>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <a href="#" className="nav-link">
                  Contact
                </a>
              </li>
            </ul>
            {/* SEARCH FORM */}
            <form className="form-inline ml-3">
              <div className="input-group input-group-sm">
                <input
                  className="form-control form-control-navbar"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <div className="input-group-append">
                  <button className="btn btn-navbar" type="submit">
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </form>
            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto">
              {/* Messages Dropdown Menu */}
              {/* ---------logout start---------- */}
             <li className="nav-item has-treeview">
                  <button className="nav-link border-0 bg-white" onClick={this.logOut}>
                  <i class="fa fa-power-off logout" aria-hidden="true"></i> 
                    </button>
                  </li>
              {/* ---------logout end---------- */}
              {/* Notifications Dropdown Menu */}
              <li className="nav-item dropdown">
                <a className="nav-link" data-toggle="dropdown" href="#">
                  <i className="far fa-bell" />
                  <span className="badge badge-warning navbar-badge">15</span>
                </a>
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                  <span className="dropdown-item dropdown-header">
                    15 Notifications
                  </span>
                  <div className="dropdown-divider" />
                  <a href="#" className="dropdown-item">
                    <i className="fas fa-envelope mr-2" /> 4 new messages
                    <span className="float-right text-muted text-sm">
                      3 mins
                    </span>
                  </a>
                  <div className="dropdown-divider" />
                  <a href="#" className="dropdown-item">
                    <i className="fas fa-users mr-2" /> 8 friend requests
                    <span className="float-right text-muted text-sm">
                      12 hours
                    </span>
                  </a>
                  <div className="dropdown-divider" />
                  <a href="#" className="dropdown-item">
                    <i className="fas fa-file mr-2" /> 3 new reports
                    <span className="float-right text-muted text-sm">
                      2 days
                    </span>
                  </a>
                  <div className="dropdown-divider" />
                  <a href="#" className="dropdown-item dropdown-footer">
                    See All Notifications
                  </a>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-widget="control-sidebar"
                  data-slide="true"
                  href="#"
                >
                  <i className="fas fa-th-large" />
                </a>
              </li>
            </ul>
          </nav>
          {/* /.navbar */}
          {/* Main Sidebar Container */}
          
          <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <a href="../../index3.html" className="brand-link">
              <span className="brand-text font-weight-light">JOKSTER</span>
            </a>
            {/* Sidebar */}
            <div className="sidebar">
              {/* Sidebar user (optional) */}
              <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <div className="image">
                  <img
                    src="../../dist/img/user2-160x160.jpg"
                    className="img-circle elevation-2"
                    alt="User Image"
                  />
                </div>
              </div>
              {/* Sidebar Menu */}
              <nav className="mt-2">
                <ul
                  className="nav nav-pills nav-sidebar flex-column"
                  data-widget="treeview"
                  role="menu"
                  data-accordion="false"
                >
                  {/* Add icons to the links using the .nav-icon class
                 with font-awesome or any other icon font library */}
                  {/*dashboard for all bt page information will change with respect to user*/}

                  {/*Note same menus for shopkepper and user(customer) 
                   such as Products , Order list , Setting ,payment Details with respect to user id 
                   rightside page details will change */}
                  <li className="nav-item has-treeview">
                  <Link to="/Home" className="nav-link">
                      <i className="nav-icon fas fa-tachometer-alt" />
                      <p>Dashboard</p>
                    </Link>
                  </li>
                 
                  
                  <li className="nav-item">
                  <Link to="/Product" className="nav-link">
                      <i className="nav-icon fas fa-shopping-cart" />
                      <p>Products</p>
                    </Link>
                  </li>
                  
                  <li className="nav-item">
                    <Link to="/orderlist" className="nav-link">
                      <i className="nav-icon fas fa-th" />
                      <p>Order List</p>
                    </Link>
                  </li>
                 
                  {/*only for user (shopkepper)*/}
                  <li className="nav-item">
                    <a href=" " className="nav-link">
                      <i className="nav-icon fas fa-th" />
                      <p>Stock Products</p>
                    </a>
                  </li>
                  {/* end only for user (shopkepper)*/}

                  <li className="nav-item has-treeview">
                  <a href="#" className="nav-link">
                      <i className="nav-icon fas fa-cogs" />
                      <p>
                        Settings
                        <i className="right fas fa-angle-left" />
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                      <Link to="/shopkeepersetting" className="nav-link">
                          <i className="far fa-circle nav-icon" />
                          <p>Profile</p>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="" className="nav-link">
                          <i className="far fa-circle nav-icon" />
                          <p>Mail Box</p>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <a href="../charts/inline.html" className="nav-link">
                          <i className="far fa-circle nav-icon" />
                          <p>Review & Rating</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="../charts/inline.html" className="nav-link">
                          <i className="far fa-circle nav-icon" />
                          <p>Currency & Language</p>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item has-treeview">
                    <a href="#" className="nav-link">
                      <i className="nav-icon fas fa-wallet" />
                      <p>
                        Payment Details
                        <i className="fas fa-angle-left right" />
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                     
                      <li className="nav-item">
                        <a href="../UI/general.html" className="nav-link">
                          <i className="far fa-circle nav-icon" />
                          <p>Return/Refund Orders</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="../UI/icons.html" className="nav-link">
                          <i className="far fa-circle nav-icon" />
                          <p>Invoices</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="../UI/buttons.html" className="nav-link">
                          <i className="far fa-circle nav-icon" />
                          <p>Payemnt Types (COD/CARD)</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="../UI/sliders.html" className="nav-link">
                          <i className="far fa-circle nav-icon" />
                          <p>Wallet</p>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
              {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
          </aside>
        
        </div>

        {/* /.content-wrapper */}

        {/* Control Sidebar */}
        <aside className="control-sidebar control-sidebar-dark">
          {/* Control sidebar content goes here */}
        </aside>
        {/* /.control-sidebar */}
      </div>
    );
  }
}
export default connect(null, {onLogout})(withRouter(ShopNav));
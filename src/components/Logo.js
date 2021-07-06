import React from "react";
import "./Logo.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

function Logo() {
  return (
    <Router>
      <div className="container-fluid">
        <div className="col-md-12">
          <Link to="/Home">
            <img
              className="jokester_logo"
              src="images/logo.jpg"
              alt="Jokester Logo"
            />
          </Link>
        </div>
      </div>
    </Router>
  );
}

export default Logo;

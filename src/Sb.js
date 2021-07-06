import React from 'react'
import './sb.css'

const Sb = () => {
  const closeNav = () =>{
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }
  const openNav = () =>{
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }

    return (
    <div>
        <div id="mySidebar" class="sidebar">
        <a href="javascript:void(0)" class="closebtn" onClick={closeNav}>×</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </div>
      
      <div id="main">
        <button class="openbtn" onClick={openNav}>☰</button>
      </div>

    </div>
    )
}

export default Sb

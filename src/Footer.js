import React from 'react'
import './Footer.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import CallIcon from '@material-ui/icons/Call';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

function Footer() {
    return (
        <>
        <div className="container-fluid">
           <div id="footer">
               <div className="footer_row row">
                <div className="col-md-3 col-6 footer_parts">
                <h3 className="about-us" style={{fontSize: 'x-large'}}>About Us</h3>
                <div>
                <p style={{fontSize: 'small'}}>Address:</p>
                </div>
                <div>
                <p style={{fontSize: 'small'}}>Register Address- F-301, LODHA Palava, DOMBIVILI(EAST), THANE, Maharashtra.<br></br>Pin Code-421 204.</p>
                </div>
                <div>
                <p style={{fontSize: 'small'}}>Corporate Address- The Corporate Park premises, 1505 15th floor, Turbhe Vashi, Sanpada, Navi Mumbai, Maharashtra.<br></br>Pin Code -400 703.</p>
                </div>
                <div>
                <p style={{fontSize: 'small'}}>Dubai Address- Yam Veau Day Cafe, Dubai, DERIA, United Arab Emirates.</p>
                </div>
                
                <div className="contact">
                    <span>
                        <i id="phone"  style={{padding:'10px'}} aria-hidden="true"><CallIcon fontSize="large"/></i>

                        <br></br>
                        &nbsp; <a style={{color: 'rgb(113, 189, 240)' , textDecoration: 'none'}}>022-4962-5254 
                            </a></span>
                </div>
                <div className="icon">
                <MailOutlineIcon fontSize="large"/><a href="mailto:info@jokester.in">info@jokester.in</a> 
                </div>
            </div>

            <div className="col-md-3 col-6 footer_parts">
                <h3 className="cont_color" style={{fontSize: 'x-large' , marginBottom: '15px'}}>CONTACT</h3>
                <a className="footer_link contact-us " href="" onclick="myfunction()">
                    Customer Care
                </a>
                <a className="footer_link contact-us " href="bank.html">
                    Banking
                </a>
                <a className="contact-us footer_link" href="career.html">
                    Careers
                </a>
                <a className="contact-us footer_link" href="" >
                    Partners
                </a>
                <a className="contact-us footer_link" href="" >
                    Press
                </a>
            </div>

            <div className="col-md-3 col-6 footer_parts">
                <h3 className="policies" style={{fontSize: 'x-large' ,marginBottom: '15px'}}>POLICIES</h3>
                <a className="footer_link" href=""  style={{color: 'white', textDecoration: 'none', fontSize: 'small'}}>
                    Refund &amp; Exchange Policy
                </a>
                <a className="footer_link" href=""  style={{color: 'white', textDecoration: 'none', fontSize: 'small'}}>
                    Terms &amp; Conditions
                </a>
                <a className="footer_link" href=""  style={{color: 'white', textDecoration: 'none', fontSize: 'small'}}>
                    Shipping Policy
                </a>
                <a className="footer_link" href=""  style={{color: 'white', textDecoration: 'none', fontSize: 'small'}}>
                    Privacy
                </a>
                <a className="footer_link" href=""  style={{color: 'white', textDecoration: 'none', fontSize: 'small'}}>
                    FAQ
                </a>

            </div>

            <div className="col-md-3 col-6 footer_parts">
                <h3 className="query" style={{fontSize: 'x-large'}}>For Query Type Here</h3>
                <form style={{fontSize: 'small'}} >
                    <div className="text">Email *</div>

                    <input type="email" maxlength="30" id="feedback_email" name="email" className="text-input contact-input" style={{padding: '10px 5px'}} placeholder="Your email address..."/>

                    <div className='text'>Message *</div>

                    <textarea type="text" maxlength="250" id="feedback_msg" name="message" className="text-input contact-input" style={{padding: '10px 5px'}} placeholder="Max Limit 250 char"></textarea><br></br>


                    <button id="send" onclick="sendMessage()" type="submit"  className="btn btn-big">
                        <i className="fa fa-paper-plane " aria-hidden="true"></i>
                        Send</button>
                </form>
            </div>
            </div>
        </div>

            <div className="row footer_row">
            <div className="col-md-12 px-0">

    <div className="footer_base">
        
            
            
                <div className="socials">
                    <a href="https://www.facebook.com/JokesterMultivendorPvtLtd"><FacebookIcon fontSize="large"/></a>
                    <a href="https://www.linkedin.com/in/jokester-business-027505205"><LinkedInIcon fontSize="large"/></a>
                    <a href="https://www.instagram.com/explore/"><InstagramIcon fontSize="large"/></a>
                    <a href="https://twitter.com/Jokester_M"> <TwitterIcon fontSize="large"/></a>
                </div>
            <div className="company">
            <span className="footer_span">
                Jokester Multivendor Pvt Ltd is a Non-Government Organization. It is run by experts.<br></br>&copy; 2021 Jokester.in | Designed by <a style={{color: 'white'}} href="#">Jokester.in</a> <br></br>
            </span>
            </div>
            </div>
            </div>
    </div>
    </div>


   

        </>
    )
}

export default Footer
                        
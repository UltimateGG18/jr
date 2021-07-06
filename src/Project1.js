import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { Card, CardGroup, CardDeck, Button } from "react-bootstrap";
import './Project.css'
function Project1() {
    return (
        <div>
            <div>  
            <p className="heading-TopBrand">
            Discover Jokester{" "}
          <Button variant="btn btn-success btn-lg float-right">VIEW ALL</Button>{" "}
        </p>{" "}
               
            </div>
           {/* </div> */}
       <div>
<Container className="pro_container">
  <Row>
    <Col xs={6} md={2} className="img1">
    <a href="#"> <Image src="Images/12.png" className="pro_img" roundedCircle /></a> 
    </Col>
    <Col xs={6} md={2}>
    <a href="#"> <Image src="Images/13.png" className="pro_img" roundedCircle /></a>
    </Col>
    <Col xs={6} md={2}>
    <a href="#"><Image src="Images/14.png" className="pro_img" roundedCircle /></a>
    </Col>
    <Col xs={6} md={2}>
    <a href="#"> <Image src="Images/15.png" className="pro_img" roundedCircle /></a>
    </Col>
    <Col xs={6} md={2}>
    <a href="#"> <Image src="Images/16.png" className="pro_img" roundedCircle /></a>
    </Col>
    <Col xs={6} md={2}>
    <a href="#"> <Image src="Images/17.png" className="pro_img" roundedCircle /></a>
    </Col>
  </Row>
</Container>
        </div>
        </div>
    )
}

export default Project1

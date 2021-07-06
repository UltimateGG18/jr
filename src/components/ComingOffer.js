import React ,{ useEffect, useState } from 'react';
import axios from 'axios';
//import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
//import { Carousel } from 'react-responsive-carousel';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';


const ComingOffer = (props) => {
  const [images,setImages]=useState([]);
  useEffect(()=>{
    axios({
      method : 'GET',
      url:'http://3.129.92.172:5000/viewOffersBanner',
      headers:{'Content-Type':'application.json'}
    }).then(res=>{
      console.log(res.data.result);
      setImages(res.data.result);
    })
    .catch()
  },[]);
  return(
      <>
    <p className="heading-TopBrand">
    Coming Offers{" "}
</p>{" "}
    <section className="slider">
      <Carousel hasThumbnails={false} hasIndexBoard={true} hasDotButtons={true} hasMediaButton={false} hasSizeButton={false} canAutoPlay={true} isAutoPlaying={true}>
      {images ?images.map((item,index)=>{
        return (<div key={index}>
          <img src={`http://3.129.92.172:5000/${item.image}`} style={{imageRendering : "pixelated"}}  alt="banners" width="1285px" height="450px" />
      </div>)
      }):null}
      </Carousel>
    </section>
    </>
)
}
export default ComingOffer;
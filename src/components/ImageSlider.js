/*import React, { useState } from 'react';
import { SliderData } from './SliderData';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';


const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className='slider'>
      <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
      <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
      {SliderData.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <img src={slide.image} alt='travel image' className='image' />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;*/

import React ,{ useEffect, useState } from 'react';
import axios from 'axios';
//import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
//import { Carousel } from 'react-responsive-carousel';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import { FormatColorResetOutlined } from '@material-ui/icons';

const ImageSlider = (props) => {
  const [images,setImages]=useState([]);
  useEffect(()=>{
    axios({
      method : 'GET',
      url:'http://3.129.92.172:5000/viewBanner',
      headers:{'Content-Type':'application.json'}
    }).then(res=>{
      console.log(res.data.result);
      setImages(res.data.result);
    })
    .catch()
  },[]);
  return(
    <section className="slider">
      <Carousel hasThumbnails={false} hasIndexBoard={true} hasDotButtons={true} hasMediaButton={false} hasSizeButton={false} canAutoPlay={true} isAutoPlaying={true}>
      {images ?images.map((item,index)=>{
        return (<div key={index}>
          <img src={`http://3.129.92.172:5000/${item.image}`} style={{imageRendering : "pixelated"}}  alt="banners" width="1285px" height="450px" />
      </div>)
      }):null}
      </Carousel>
    </section>
)
}
export default ImageSlider;
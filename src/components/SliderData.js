import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SliderData = () => {
const [category1 ,setCategory] = useState([])
useEffect(()=>{
    axios({
        method : 'GET',
        url:'http://3.129.92.172:5000/viewCategory',
        headers:{'Content-Type':'application.json'}
      }).then(res=>{
        console.log(res.data.result);
        setCategory(res.data.result);
      })
      .catch()
},[])
return(
    <>

    </>
)
}

export default SliderData;

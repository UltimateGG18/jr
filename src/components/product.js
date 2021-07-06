import React, { Component } from 'react'
import axios from "axios";
export default class product extends Component {
    constructor() {
        super();
        this.state = {imgCollection:""}

    }
    onFileChange=(e)=> {
        this.setState({ [e.target.name]: e.target.files })
    }
    formsubmit=async()=>{
       var quantity=["1-2","3-12","13+"]
    //    var price=300
       var discount=[10,20,30]
       var discountType=["%","%","%"]
    //    var discountedPrice=[190,180,170]
        const fd = new FormData();
        for (const key of Object.keys(this.state.imgCollection)) {
            fd.append('image', this.state.imgCollection[key])
        }
        fd.append("id","60bb5fa7d7034d8b60c7db23")
        fd.append("jbpId", "JBP-1249358344");
        fd.append("name", "Redmi 9(Red)");
        fd.append("categoryId", "60ab3f6ceda6fe0f19dcf104");
        fd.append("lvl2catId", "60ab3fe7c408ac0f7118c53e");
        fd.append("lvl3catId", "60ab429f5a752611c2d16d77");
        fd.append("brand", "MI");
        fd.append("availableStock", 30);
        fd.append("size", "16.59 cm(6.53 inch)");
        fd.append("pattern", "Red");
        fd.append("description", "13+2MP Rear camera with AI Portrait, AI scene recognition, HDR, Pro mode | 5MP front facing camera 16.58 centimeters (6.53-inch) HD+ multi-touch capacitive touchscreen with 1600 x 720 pixels resolution, 268 ppi pixel density, 20:9 aspect ratio Memory, Storage & SIM: 4GB RAM | 64GB storage expandable up to 512GB| Dual SIM with dual standby (4G+4G) Android v10 operating system with 2.3GHz Mediatek Helio G35 octa core processor 5000mAH lithium-polymer battery with 10W wired charger in-box");
        fd.append("returnable", "yes");
        fd.append("refundable", "yes");
        fd.append("tnc", "tnc");
        fd.append("quantity", quantity);
        fd.append("price", 20000);
        fd.append("discount", discount);
        fd.append("discountType", discountType);
        fd.append("visibility", true);

     
        // fd.append("discountedPrice", discountedPrice);
        await axios.post("http://localhost:5000/saveproduct", fd)
    }
    render() {
        return (
            <>
                <div className="wrapper">
                    <div className="content-wrapper">
                        <div className="container">
                        <div className="row">
                    
                        <div className="form-group">
                            <input type="file" name="imgCollection" onChange={this.onFileChange} multiple />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" onClick={this.formsubmit}>Upload</button>
                        </div>
                    
                </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

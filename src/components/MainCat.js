import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import Footer from "./Footer";
import SubCat from "./SubCat";
import SubSubCat from './SubSubCat';
import { Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import $ from "jquery";

class MainCat extends Component {
  constructor() {
    super();
    this.state = {name: "", image: "", category: [], msg: "", flag: [], catdata: [], editnm:"", id:"", upimage:"", visibility:"",fflag:[],catflag:"",ipaddress:"18.217.46.91"};
    this.catView();
  }
  
  catView = async () => {
    var res = await axios.get("http://"+this.state.ipaddress+":5000/viewCategory");
    this.setState({ catdata: res.data.result,  });

    res!=null ? this.setState({catflag:true}) : this.setState({catflag:false})
    
    window.$("#editmodal").modal("hide");
    window.$("#editsubcat").modal("hide");
    window.$("#editsubsubcat").modal("hide");
  };
  
  onHandleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };
 
  onFileChange = (event) => {
    this.setState({ image: event.target.files[0] });
  };

  toDo = () => {
    let SNo = this.state.category.length;
    if (this.state.name == "" || this.state.image == "") {
      alert("Please fill all the details");
    } else {
      var joined = this.state.category.concat({
        SNo: SNo + 1,
        name: this.state.name,
        image: this.state.image,
      });
      this.setState({ category: joined, name: "", image: "" });
      document.getElementById("img").value = "";
      var ele = document.getElementById("tbl-disp");
      ele.classList.add("d-block");
    }
  };

  delete = (sno) => {
    if (window.confirm("Are you sure you want to discard?")) {
      this.setState({ategory: this.state.category.filter((item, i) => i !== sno)});
      if (this.state.category.length <= 1) {
        var ele = document.getElementById("tbl-disp");
        ele.classList.remove("d-block");
      }
    }
  };
 
  delete_all = () => {
    if (window.confirm("Are you sure you want to discard all items?")) {
      this.setState({ category: [] });
      var ele = document.getElementById("tbl-disp");
      ele.classList.remove("d-block");
    }
  };
 
  formSubmit = async (e) => {
    const { category, name, image } = this.state;
    if (this.state.name != "" && this.state.image != "") {
      category.push({ name: name, image: image });
    }
    document.getElementById("img").value = "";
    this.setState({ name: "", image: "" });
    var catlength = category.length;
    if (catlength == 0) {
      alert("Please fill all the details");
    } else {
      this.setState({flag: [],fflag:[] });
      for (var i in category) {
        const fd = new FormData();  
        fd.append("name", category[i].name);
        fd.append("image", category[i].image);
        await axios.post("http://"+this.state.ipaddress+":5000/saveCategory", fd)
          .then((res) => {
            if (res.status == "200") {
              if (res.data.msg) {
                this.state.flag.push(1);
              }
            }
          })
          .catch((err) => {
            if (err.response.data)
            this.state.fflag.push(err.response.data.msg)
          });
      }
      if(this.state.fflag.length>0){
        alert("These categories already exists: "+this.state.fflag.toString());
        window.$("#category").modal("hide");
        this.catView()
     }
      else {
        alert("Category inserted successfully!!");
        window.$("#category").modal("hide");
        this.catView()
      }
      this.setState({category: [] });
      var ele = document.getElementById("tbl-disp");
      ele.classList.remove("d-block");
    }
  };
  
  onEdit=async(id)=>{
    const result=await axios.get("http://"+this.state.ipaddress+":5000/editCategory/"+id)
    this.setState({editnm: result.data.result.name,upimage:result.data.result.Image,id:result.data.result._id,visibility:result.data.result.visibility})
    window.$("#editmodal").modal("show");
  }
 
  edtFileChange = (event) => {
    document.getElementById("showimg").style.display = "none";
    this.setState({ upimage: event.target.files[0] });
  };

  onupdate=async()=>{
    if (window.confirm("Are you sure you want to update category?")) {
      const fd = new FormData();
      fd.append("id", this.state.id);
      fd.append("name", this.state.editnm);
      fd.append("image", this.state.upimage);
      fd.append("visibility",this.state.visibility)
     await axios.post("http://"+this.state.ipaddress+":5000/updateCategory", fd)
      .then((res) => {
        if (res.status == "200") {
          alert(res.data.msg)
          this.catView()
        }
      })
    }
  }

  deleteCat=(id)=>{
    if (window.confirm("Are you sure you want to change visibility?")) {
    axios.get("http://"+this.state.ipaddress+":5000/deleteCategory/"+id)
    .then((res)=>{
      if (res.status == 200) {
        alert("Changed visibility sucessufully !!")
        this.catView()
      }
    })
    }
  }
 
  onhandleCheck=(e)=>{
    this.setState({[e.target.name]:e.target.checked});
  }

  oninputChange=(e)=>{
    this.setState({editnm:e.target.value})
  }
 
  render() {
    console.log(this.props.auth)
    const columns = [
      {
        name: "Name",
        selector: "name",
        left: "true",
      },
      {
        name: "Image",
        selector: "Image",
        cell: (row) => (
          <div data-tag="allowRowEvents"><img height="80" width="80" className="my-2" src={`http://3.129.92.172:5000/${row.Image}`}/>
          </div>
        ),
        center: "true",
      },
      {
        name: "Visibility",
        selector: "visibility",
        cell: (row) => (
          <div data-tag="allowRowEvents"><input  type="checkbox" readOnly className="form-control-check visi" checked={row.visibility == true}/>  
          </div>
        ),
        center: "true",
      },
      {
        name: "Action",
        cell: (row, index) => 
          <div data-tag="allowRowEvents">
            <button className="edtdel-btn"  onClick={() => this.onEdit(row._id)}>
              <i className="fa fa-pencil-square-o text-success" aria-hidden="true"></i>
            </button>
            <button className="edtdel-btn"  onClick={() => this.deleteCat(row._id)}>
              <i className="fa fa-trash-o text-danger" aria-hidden="true"></i>
            </button>
          </div>
        ,
        right: "true",
      },
    ];
    const customStyles = {
      rows: {
        style: {},
      },
      headCells: {
        style: {fontSize: "20px",},
      },
      cells: {
        style: {
          fontSize: "15px",},
      },
    };

    const { name, image, category, catdata,upimage,visibility,catflag } = this.state;
    var data = catdata;
    const tableData = {columns,data};
    if(catflag==false){
      return (
        <div className="wrapper">
          <div className="content-wrapper">
        <div className="lodarback">
            <img  height="100px" id="lodar" src="/Assets/img/LOGO (2).png" />
        </div>
        </div>
        </div>
      )
  }else{
    return (
      <div>
        <div className="wrapper">
          <div className="content-wrapper">
            <section className="col-md-12 ">
              <div className="row">
                {/* <img height="50px" id="lodar" src="/Assets/img/LOGO (2).png"></img> */}
                <div className="col-md-12">
{/* -----------Accordian start--------- */}
                  <div className="accordion mt-5" id="accordionExample">
  {/* --------category accordian start---------- */}
                    <div className="card">
                      <button className="btn btn-light btn-block text-center py-3" type="button" data-toggle="collapse" data-target="#cat_acc" aria-expanded="true" aria-controls="collapseOne"><h4>Category</h4></button>
                      <div id="cat_acc" className="collapse show"  aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div className="card-body">
                          <div className="row justify-content-end">
                           <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#category">Add Category</button>
                        </div>
                        <DataTableExtensions
                            {...tableData}
                            print={false}
                            filterPlaceholder="Search (Enter at least 3 chars)"
                          >
                            <DataTable
                              columns={columns}
                              data={data}
                              pagination={true}
                              noHeader
                              paginationPerPage={5}
                              customStyles={customStyles}
                              striped={true}
                              highlightOnHover={true}
                              pointerOnHover={true}
                            />
                          </DataTableExtensions>
                        </div>
                      </div>
                    </div>
  {/* ---------------category accordian end-------------- */}
  {/* ---------------subcategory accordian start-------------- */}
                    <div className="card">
                      <div className="card-header" id="headingTwo">
                        <h2 className="mb-0">
                          <button className="btn btn-light btn-block text-center collapsed" type="button" data-toggle="collapse"  data-target="#sub_acc" aria-expanded="false" aria-controls="collapseTwo"><h4>Sub Category</h4></button>
                        </h2>
                      </div>
                      <div id="sub_acc" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                        <div className="card-body">
                          <div className="row justify-content-end">
                            <button type="button" className="btn btn-primary"  data-toggle="modal" data-target="#subcategory"> Add SubCategory
                            </button>
                          </div>
                          <SubCat />
                        </div>
                      </div>
                    </div>
 {/* ---------------subcategory accordian end-------------- */}
 {/* ---------------subsubcategory accordian start-------------- */}
                    <div className="card">
                      <div className="card-header" id="headingThree">
                        <h2 className="mb-0">
                          <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#subsub_acc" aria-expanded="false" aria-controls="collapseThree">
                            <div className="row justify-content-between"><div className="col-md-2 text-dark"><h5>Subsub Category</h5></div>
                            <button  type="button" className="btn btn-primary" data-toggle="modal" data-target="#subsubcategory">Add SubSubCategory</button>
                            </div>
                          </button>
                        </h2>
                      </div>
                      <div id="subsub_acc" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                        <div className="card-body">
                        {/* <div className="row justify-content-end">
                            <button  type="button" className="btn btn-primary" data-toggle="modal" data-target="#subsubcategory">Add SubSubCategory</button>
                            </div> */}
                        <SubSubCat/>
                        </div>
                      </div>
                    </div>
  {/* ---------------subsubcategory accordian end-------------- */}
                  </div>
{/* ---------------Accordian end-------------- */}
                </div>
{/* ------------Add modal start----------- */}
                <div className="modal fade" id="category" tabindex="-1" aria-labelledby="catmodal" aria-hidden="true">
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <div className="row justify-content-center">
                          <div className="col-md-12 ">
                            <h5 className="modal-title text-center" id="catmodal">
                              Add Category
                            </h5>
                          </div>
                        </div>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="row justify-content-center">
                          <div className="col-md-10">
                            <div className="card">
                              <form className="to-do-form" action="javascript:void(0)">
                                <div className="card-body">
                                  <div className="form-group">
                                    <label>Category Name</label>
                                    <input name="name" type="text" className="form-control" value={name} onChange={this.onHandleChange}/>
                                  </div>
                                  <div className="form-group">
                                    <label>Category Image</label>
                                    <input name="image"  type="file" id="img" className="form-control image-type" onChange={this.onFileChange}/>
                                  </div>
                                  <div className="row justify-content-center">
                                    <div className="col-md-6 col-6">
                                      <button name="add" className="btn btn-info btn-block text-white" onClick={this.toDo}>Add More</button>
                                    </div>
                                  </div>
                                  <div className="row justify-content-center">
                                    <div className="d-none" id="tbl-disp">
                                      <table className="table mt-4">
                                        <thead>
                                          <tr>
                                            <th>S.No</th>
                                            <th>Name</th>
                                            <th>Image</th>
                                            <th>
                                              <button  className="dlt_all" onClick={this.delete_all}>Delete All</button>
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {category.map((d, i) => (
                                            <tr>
                                              <td className="text-center">{i + 1}</td>
                                              <td>{d.name}</td>
                                              <td>{d.image.name}</td>
                                              <td className="text-center">
                                                <button name="del"  className="delete" onClick={() => {this.delete(i)}}>
                                                  <i className="fa fa-trash" aria-hidden="true"></i>
                                                </button>
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                <div className="row justify-content-center my-4">
                                  <div className="col-md-6 col-6">
                                    <button className="btn btn-info  btn-block text-white" onClick={this.formSubmit}>Add Category</button>
                                  </div>
                                </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button  type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
{/* -------------Add modal end----------- */}
              </div>
            </section>
{/* --------Edit modal start--------- */}
           <div class="modal fade" id="editmodal" tabindex="-1" aria-labelledby="editcat" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="editcat">Edit Category</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div className="form-group">
                        <label>Category Name</label>
                        <input name="editnm" className="form-control" value={this.state.editnm} onChange={this.oninputChange}/>
                      </div>
                      <div className="form-group">
                        <img id="showimg" height="80" width="80" src={`http://18.116.242.50:5000/${upimage}`}></img>
                      </div>
                      <div className="form-group">
                        <label>Change Category Image</label>
                        <input name="upimage" type="file" id="img" className="form-control image-type" onChange={this.edtFileChange}/>
                      </div>
                      <div className="form-group">
                        <label>Visibility</label>
                        <input type="checkbox"  name="visibility" value={(visibility == true)} className="form-control-check ml-5  visi" checked={(visibility == true)} onChange={this.onhandleCheck}/>
                      </div>
                      <button className="btn btn-info" onClick={this.onupdate}>Update</button>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
{/* -----------Edit modal end--------- */}
          </div>
        </div>
        <Footer />                        
      </div>
    );
                                          }
  }
}
const mapStateToProps=state=>({
  auth:state.auth
})
export default  connect(mapStateToProps, {})(withRouter(MainCat));
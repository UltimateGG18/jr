import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import $ from 'jquery'

export default class SubSubCat extends Component {
  constructor() {
    super();
    this.state = {name: "",  categoryId:"", subcategoryId:"", subcategories: [], categories:[], subsubcat:[], data:[], flag3:[], lvl1catId:"", lvl2catId:"", lvl3catnm:"", visibility:"", lvl3catId:"",catWiseL2cat:[],subsubcatflag:"", subsubcatfflag:[], ipaddress:"18.217.46.91" 
    };
    this.subsubview();
  }
  
  subsubview=async()=>{
    var cat = await axios.get("http://"+this.state.ipaddress+":5000/viewCategory");
    var lvl3 = await axios.get("http://"+this.state.ipaddress+":5000/viewLvl3Category");
    this.setState({ categories: cat.data.result, data: lvl3.data.result });
    lvl3!=null? this.setState({subsubcatflag:true}):this.setState({subsubcatflag:false})
    window.$("#editsubsubcat").modal("hide");
  }
 
  onHandleChange = (e) => {
    document.getElementById("msg").style.display = "none";
    this.setState({[e.target.name]: e.target.value,});
  };

  onSelectChange=(e)=>{
    document.getElementById("msg").style.display = "none";
    this.setState({[e.target.name]: e.target.value,categoryName:e.target.selectedOptions[0].dataset.catnm});
    axios.get("http://"+this.state.ipaddress+":5000/catWiseL2cat/"+e.target.value)
      .then((res)=>{
          this.setState({subcategories:res.data.result})
      })
      .catch((err)=>{
          console.log(err)
      })
  }
  
  onsubcat=(e)=>{
    this.setState({[e.target.name]: e.target.value,subcategoryName:e.target.selectedOptions[0].dataset.subcatnm});    
  }
 
  onedtSubCategory=(e)=>{
    this.setState({[e.target.name]:e.target.value})
  }
 
  toDo = (e) => {
    e.preventDefault();
    let SNo = this.state.subsubcat.length;
    if(this.state.name=="" || this.state.categoryId=="" || this.state.categoryName=="" || this.state. subcategoryId==""||this.state.subcategoryName==""){
      alert("Please fill all the details")
    }else{
    var joined = this.state.subsubcat.concat({
      SNo: SNo + 1,
      name: this.state.name,
      categoryId: this.state.categoryId,
      categoryName:this.state.categoryName,
      subcategoryId:this.state.subcategoryId,
      subcategoryName:this.state.subcategoryName
    });
    this.setState({ subsubcat: joined });
    this.setState({ name: "" });
    document.getElementById("CatId").selectedIndex = 0;
    document.getElementById("subcatId").selectedIndex = 0;
    var ele= document.getElementById("subsubtbl-disp")
    ele.classList.add("d-block")
    }
  };
 
  delete = (sno) => {
    if (window.confirm("Are you sure you want to discard?")) {
      this.setState({subsubcat: this.state.subsubcat.filter((item, i) => i !== sno)});
    }
  };
  
  delete_all=()=>{
    if (window.confirm("Are you sure you want to discard all items?")) {
      this.setState({subcategory:[]})
      var ele= document.getElementById("subsubtbl-disp")
      ele.classList.remove("d-block")
    }
  }

  formSubmit = async() => {
    const { subsubcat,name,categoryId,subcategoryId} = this.state; 
    if(this.state.name!="" && this.state.categoryId!="" && this.state.categoryName!="" && this.state.subcategoryId!="" && this.state.subcategoryName!="")
    {
    subsubcat.push({name:name,categoryId:categoryId,subcategoryId:subcategoryId})
    }
    this.setState({name:"",categoryId:"",categoryName:"",subcategoryId:"",subcategoryName:""})
    document.getElementById("CatId").selectedIndex = 0;
    document.getElementById("subcatId").selectedIndex = 0;
    var subsubcatlength = subsubcat.length;
    if (subsubcatlength == 0) {
      alert("Please fill all the details");
    } else {
      this.setState({subsubcatfflag:[],flag3:[]})
    for (var i in subsubcat) {
     var obj={
      name: subsubcat[i].name,
      categoryId:subsubcat[i].categoryId,
      lvl2catId:subsubcat[i].subcategoryId
     }
     await axios.post("http://"+this.state.ipaddress+":5000/saveLvl3Category", obj)
        .then((res) => {
          if ((res.status == 200)) {
            if (res.data.msg) {
              this.state.flag3.push(1);
            }  
          }
        })
        .catch((err) => {
          if (err.response.data){
          this.state.subsubcatfflag.push(err.response.data.msg)
          }
        });
      }
    
      if(this.state.subsubcatfflag.length>0){
        alert("These subsub-categories already exists: "+this.state.subsubcatfflag.toString());
        window.$("#subsubcategory").modal("hide");
        this.subsubview()
       }
      else{
        alert("SubSubCategory Inserted successfully !!");
        window.$("#subsubcategory").modal("hide");
        this.subsubview()
      }
      this.setState({subcategory: [] });
            var ele= document.getElementById("subsubtbl-disp")
            ele.classList.remove("d-block")
    }
  };
  
  subsubcatDelete=(id)=>{
    if (window.confirm("Are you sure you want to change visibility?")) {
    axios.get("http://"+this.state.ipaddress+":5000/deleteLvl3Category/"+id)
      .then((res)=>{
        if (res.status == 200) {
          alert("Changed visibility sucessufully !!")
          this.subsubview()
        }
      })
    }
  }
  
  subsubcatvisi=(e)=>{
    this.setState({[e.target.name]:e.target.checked});
  }
 
  subsubEdit=async(id)=>{
    const result=await axios.get("http://"+this.state.ipaddress+":5000/editLvl3Category/"+id)
    const res=await axios.get("http://"+this.state.ipaddress+":5000/catWiseL2cat/"+result.data.result.categoryId._id) 
    this.setState({subcategories:res.data.result, lvl1catId:result.data.result.categoryId._id, lvl2catId:result.data.result.lvl2catId._id, lvl3catnm:result.data.result.name, visibility:result.data.result.visibility, lvl3catId:result.data.result._id})
    window.$("#editsubsubcat").modal("show");
  }

  onupdatesubsubcat=async()=>{
    if (window.confirm("Are you sure you want to update SubSubcategory?")) {
      var obj = {
        id: this.state.lvl3catId,
        name: this.state.lvl3catnm,
        categoryId: this.state.lvl1catId,
        lvl2catId:this.state.lvl2catId,
        visibility: this.state.visibility,
      };
     await axios.post("http://"+this.state.ipaddress+":5000/updateLvl3Category", obj)
      .then((res) => {
        if (res.status == "200") {
          alert(res.data.msg)
          this.subsubview()
        }
      })
    }
  }
 
  render() {
    const columns = [
      {
        name: "Category Name",
        left: "true",
        cell: (row) => (
          <div data-tag="allowRowEvents">{row.categoryId.name}</div>
        ),
      },
      {
        name: "SubCategory Name",
        // selector: "name",
        left: "true",
        cell: (row) => (
          <div data-tag="allowRowEvents">{row.lvl2catId.name}</div>
        ),
      },
      {
        name: "SubSubCat Name",
        selector: 'name',
        left: "true",
      },
      {
        name: "Visibility",
        selector: "visibility",
        cell: (row) => (
          <div data-tag="allowRowEvents">
            <input type="checkbox" readOnly className="form-control-check visi" checked={row.visibility == true}/>
          </div>
        ),
        center: "true",
      },
      {
      name: "Action",
      cell: (row) => (
        <div data-tag="allowRowEvents">
          <button className="edtdel-btn"  onClick={() => this.subsubEdit(row._id)}><i className="fa fa-pencil-square-o text-success" aria-hidden="true"></i></button>
          <button className="edtdel-btn"  onClick={() => this.subsubcatDelete(row._id)}>
            <i className="fa fa-trash-o text-danger" aria-hidden="true"></i>
          </button>
        </div>
      ),
      right: "true",
    },
    ];
    const customStyles = {
      rows: {
        style: {},
      },
      headCells: {
        style: {
          fontSize: "20px",
        },
      },
      cells: {
        style: {
          fontSize: "15px",
        },
      },
    };

    const { name, categories,subcategories,subsubcat, data,lvl1catId, lvl2catId, lvl3catnm,
      visibility,subsubcatflag } = this.state;
    const tableData = {
      columns,
      data,
    };
    if(subsubcatflag==false){
      return (
        <div className="lodarback">
            <img  height="100px" id="lodar" src="/Assets/img/LOGO (2).png" />
        </div>
      )
    }else{
    return (
      <>
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
            paginationPerPage={8}
            customStyles={customStyles}
            striped={true}
            highlightOnHover={true}
            pointerOnHover={true}
          />
        </DataTableExtensions>

        <div className="modal fade" id="subsubcategory" tabindex="-1" aria-labelledby="subsubmodal" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <div className="row justify-content-center">
                  <div className="col-md-12 ">
                    <h5 className="modal-title text-center" id="subsubmodal">
                      Add SubSub-Category
                    </h5>
                  </div>
                </div>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row  justify-content-center">
                  <div className="col-md-10">
                    <div className="card">
                      <form className="to-do-form" action="javascript:void(0)">
                        <div className="card-body">
                          <div className="form-group">
                            <label>Category Name</label>
                            <select className="form-control pl-3 f-17" id="CatId" name="categoryId" onChange={this.onSelectChange}>
                            <option selected>--Select Category--</option>
                               {categories.map((cat,index)=>(
                                 <>
                                 {<option key={index} value={cat._id} data-catnm={cat.name}>{cat.name}</option>}
                                 </>
                                ))}
                            </select>
                          </div>
                          <div className="form-group">
                            <label>SubCategory Name</label>
                            <select className="form-control pl-3 f-17" id="subcatId" name="subcategoryId" onChange={this.onsubcat}>
                            <option selected>--Select SubCategory--</option>
                               {subcategories.map((subcat,index)=>(
                                 <>
                                 {<option key={index} value={subcat._id} data-subcatnm={subcat.name}>{subcat.name}</option>}
                                 </>
                                ))}
                            </select>
                          </div>
                          <div className="form-group">
                            <label>SubSubCategory Name</label>
                            <input  className="form-control" type="text" name="name" value={name} onChange={this.onHandleChange}/>
                          </div>
                          <div className="row justify-content-center">
                            <div className="col-md-6 col-6">
                              <button name="add" className="btn btn-info btn-block text-white" onClick={this.toDo}>
                                Add More
                              </button>
                            </div>
                          </div>
                          <div className="row justify-content-center">
                          <div className="d-none" id="subsubtbl-disp">
                            <table className="table mt-4">
                              <thead>
                                <tr>
                                  <th>S.No</th>
                                  <th>Category Name</th>
                                  <th>Subcategory Name</th>
                                  <th>Name</th>
                                  <th><button className="dlt_all" onClick={this.delete_all}>Delete All</button></th>
                                </tr>
                              </thead>
                              <tbody>
                                {subsubcat.map((d, i) => (
                                  <tr>
                                    <td>{i + 1}</td>
                                    <td>{d.categoryName}</td>
                                    <td>{d.subcategoryName}</td>
                                    <td>{d.name}</td>
                                    <td>
                                      <button name="del" className="delete" onClick={() => {this.delete(i);}}><i class="fa fa-trash" aria-hidden="true"></i>
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="row justify-content-center mb-5 my-4">
                          <div className="col-md-6 col-6">
                            <button className="btn btn-info  btn-block text-white" onClick={this.formSubmit}>Add SubSub-Category</button>
                          </div>
                        </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                >Close</button>
              </div>
            </div>
          </div>
          </div>
          {/* -------------edit subsubcat modal start-------------  */}
          <div class="modal fade" id="editsubsubcat" tabindex="-1" aria-labelledby="edtsubsubcat" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="edtsubsubcat">Edit subCategory</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                    <div className="form-group">
                      <label>Category Name</label>
                      <select className="form-control pl-3 f-17" id="catId" name="lvl1catId" onChange={this.onSelectChange}>
                        {categories.map((cat, index) => (
                          <>
                            {cat._id==lvl1catId ? <option selected  key={index} value={cat._id} style={{backgroundColor:"gray"}}>{cat.name}</option>: <option key={index} value={cat._id}>{cat.name}</option>        
                            }
                          </>
                        ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>SubCategory Name</label>
                        <select className="form-control pl-3 f-17" id="catId" name="lvl2catId" onChange={this.onedtSubCategory}>
                          {subcategories.map((subcat, index) => (
                            <>
                              {
                                subcat._id==lvl2catId? <option selected  key={index} value={subcat._id} style={{backgroundColor:"grey"}}>{subcat.name}</option>: <option key={index} value={subcat._id}>{subcat.name}</option>
                              }
                            </>
                          ))}
                        </select>
                      </div>    
                      <div className="form-group">
                        <label>SubSub-Category Name</label>
                        <input name="lvl3catnm" className="form-control" value={this.state.lvl3catnm} onChange={this.onHandleChange}/>
                      </div>
                      <div className="form-group">
                        <label>Visibility</label>
                        <input type="checkbox"  name="visibility" value={(visibility == true)} className="form-control-check ml-5  visi" checked={(visibility == true)} onChange={this.subsubcatvisi}/>
                      </div>
                      <button className="btn btn-info" onClick={this.onupdatesubsubcat}>Update</button>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
  {/* -------------edit subsubcat modal end-------------  */}
      </>
  );
    }
  }
}

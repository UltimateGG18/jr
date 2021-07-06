import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

export default class SubCat extends Component {
  constructor() {
    super();
    this.state = {name: "",subcategory: [],msg: "",flag2: [],categories: [],categoryId: "",categoryName: "", data: [], editcatnm:"", editcatId:"", visibility:"", editsubcatnm:"",subcatflag:"",subcatfflag:[],ipaddress:"18.217.46.91"
    };
    this.subview();
  }
 
  subview = async () => {
    var cat = await axios.get("http://"+this.state.ipaddress+":5000/viewCategory");
    var lvl2 = await axios.get("http://"+this.state.ipaddress+":5000/viewLvl2Category");
    this.setState({ categories: cat.data.result, data: lvl2.data.result });
    window.$("#editsubcat").modal("hide");
    lvl2!=null? this.setState({subcatflag:true}): this.setState({subcatflag:false})
  }

  onHandleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  onSelectChange = (e) => {
    this.setState({[e.target.name]: e.target.value,
      categoryName: e.target.selectedOptions[0].dataset.catnm,
    });
  }

  toDo = (e) => {
    e.preventDefault();
    let SNo = this.state.subcategory.length;
    if (this.state.name == "" || this.state.categoryId == "" || this.state.categoryName == "") {
      alert("Please fill all the details");
    } else {
      var joined = this.state.subcategory.concat({
        SNo: SNo + 1,
        name: this.state.name,
        categoryId: this.state.categoryId,
        categoryName: this.state.categoryName,
      });
      this.setState({subcategory: joined,name: "",categoryId: "",categoryName: "",
      });
      document.getElementById("catId").selectedIndex = 0;
      var ele = document.getElementById("subtbl-disp");
      ele.classList.add("d-block");
    }
  }

  delete = (sno) => {
    if (window.confirm("Are you sure you want to remove?")) {
      this.setState({subcategory: this.state.subcategory.filter((item, i) => i !== sno),
      });
      if (this.state.subcategory.length <= 1) {
        var ele = document.getElementById("subtbl-disp");
        ele.classList.remove("d-block");
      }
    }
  }

  delete_all = () => {
    if (window.confirm("Are you sure you want to discard all items?")) {
      this.setState({ subcategory: [] });
      var ele = document.getElementById("subtbl-disp");
      ele.classList.remove("d-block");
    }
  }

  formSubmit = async () => {
    let SNo = this.state.subcategory.length;
    const { subcategory, name, categoryId } = this.state;
    if (this.state.name != "" && this.state.categoryId != "") {
      subcategory.push({ SNo: SNo + 1, name: name, categoryId: categoryId });
    }
    this.setState({ name: "", categoryId: "", categoryName: "" });
    document.getElementById("catId").selectedIndex = 0;
    var subcatlength = subcategory.length;
    if (subcatlength == 0) {
      alert("Please fill all the details");
    } else {
      this.setState({subcatfflag:[],flag2:[]})
      for (var i in subcategory) {
        var obj = {
          name: subcategory[i].name,
          categoryId: subcategory[i].categoryId,
        };
        await axios.post("http://"+this.state.ipaddress+":5000/saveLvl2Category", obj)
          .then((res) => {
            if (res.status == 200) {
              if (res.data.msg) {
                this.state.flag2.push(1);
              } 
            }
          })
          .catch((err) => {
            if (err.response.data)
            this.state.subcatfflag.push(err.response.data.msg)
          });
      }

      if(this.state.subcatfflag.length>0){
        alert("These subcategories already exists: "+this.state.subcatfflag.toString());
        window.$("#subcategory").modal("hide");
        this.subview()
       }
      else {
        alert("SubCategory Inserted successfully !!");
        window.$("#subcategory").modal("hide");
        this.subview()
      }
      this.setState({subcategory: [] });
      var ele = document.getElementById("subtbl-disp");
      ele.classList.remove("d-block");
    }
  }

  editsubcatnm=(e)=>{
    this.setState({[e.target.name]:e.target.value})
  }

  subcatvisi=(e)=>{
    this.setState({[e.target.name]:e.target.checked});
  }

  subcatDelete=(id)=>{
    if (window.confirm("Are you sure you want to change visibility??")) {
    axios.get("http://"+this.state.ipaddress+":5000/deleteLvl2Category/"+id)
    .then((res)=>{
      if (res.status == 200) {
        alert("Changed visibility sucessufully !!")
        this.subview()
      }
    })
  }
  }

  Editsubcat=async(id)=>{
    const result=await axios.get("http://"+this.state.ipaddress+":5000/editLvl2Category/"+id)
    this.setState({editcatnm: result.data.result.categoryId.name,editcatId:result.data.result.categoryId._id,id:result.data.result._id,visibility:result.data.result.visibility,editsubcatnm:result.data.result.name})
    window.$("#editsubcat").modal("show");
  }

  onupdatesubcat=async()=>{
    if (window.confirm("Are you sure you want to update subcategory?")) {
      var obj = {
        id: this.state.id,
        name: this.state.editsubcatnm,
        categoryId: this.state.editcatnm,
        visibility: this.state.visibility,
      };
     await axios.post("http://"+this.state.ipaddress+":5000/updateLvl2Category", obj)
      .then((res) => {
        if (res.status == "200") {
          alert(res.data.msg)
          this.subview()
        }
      })
    }
  }

  render() {
    const columns = [
      {
        name: "Category Name",
        left: "true",
        cell: (row) => (<div data-tag="allowRowEvents">{row.categoryId.name}</div>
        ),
      },
      {
        name: "SubCategory Name",
        selector: "name",
        left: "true",
      },

      {
        name: "Visibility",
        selector: "visibility",
        cell: (row) => (
          <div data-tag="allowRowEvents"><input type="checkbox" readOnly className="form-control-check visi" checked={row.visibility == true}/>
          </div>
        ),
        center: "true",
      },
      {
        name: "Action",
        cell: (row) => (
          <div data-tag="allowRowEvents">
           <button className="edtdel-btn"  onClick={() => this.Editsubcat(row._id)}>
              <i className="fa fa-pencil-square-o text-success" aria-hidden="true"
              ></i>
            </button>
            <button className="edtdel-btn"  onClick={() => this.subcatDelete(row._id)}>
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
        style: {fontSize: "15px"},
      },
    };

    const { name, categories, subcategory, data,visibility,editcatnm,editcatId,subcatflag} = this.state;
    const tableData = {
      columns,
      data,
    };
    if(subcatflag==false){
      return (
        <div className="lodarback">
            <img  height="100px" id="lodar" src="/Assets/img/LOGO (2).png" />
        </div>
      )
  }else{
    return (
      <div>
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
{/* -----------subcategory modal start------------- */}
        <div className="modal fade" id="subcategory" tabindex="-1" aria-labelledby="subcat" aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <div className="row justify-content-center">
                  <div className="col-md-12 ">
                    <h5 className="modal-title text-center" id="subcat">Add SubCategory</h5>
                  </div>
                </div>
                <button type="button" className="close" data-dismiss="modal"
                  aria-label="Close">
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
                            <select className="form-control pl-3 f-17" id="catId" name="categoryId" onChange={this.onSelectChange}>
                              <option selected>--Select Category--</option>
                              {categories.map((cat, index) => (
                                <>
                                  {
                                    <option key={index} value={cat._id} data-catnm={cat.name}>{cat.name}</option>
                                  }
                                </>
                              ))}
                            </select>
                          </div>
                          <div className="form-group">
                            <label>SubCategory Name</label>
                            <input className="form-control"  type="text"  name="name" value={name} onChange={this.onHandleChange}/>
                          </div>
                          <div className="row justify-content-center">
                            <div className="col-md-6 col-6">
                              <button name="add" className="btn btn-info btn-block text-white" onClick={this.toDo}>Add More</button>
                            </div>
                          </div>
                          <div className="row justify-content-center">
                            <div className="d-none" id="subtbl-disp">
                              <table className="table mt-4">
                                <thead>
                                  <tr>
                                    <th>S.No</th>
                                    <th>Category Name</th>
                                    <th>SubCategory Name</th>
                                    <th>
                                      <button className="dlt_all" onClick={this.delete_all}>Delete All</button>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {subcategory.map((d, i) => (
                                    <tr>
                                      <td>{i + 1}</td>
                                      <td>{d.categoryName}</td>
                                      <td>{d.name}</td>
                                      <td>
                                        <button name="del"  className="delete" onClick={() => {this.delete(i)}}>
                                          <i class="fa fa-trash" aria-hidden="true"></i>
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
                            <button
                              className="btn btn-info  btn-block text-white"
                              onClick={this.formSubmit}
                            >
                              Add SubCategory
                            </button>
                          </div>
                        </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
 {/* --------------subcategory modal end----------- */}
   {/* -------edit modal start--------- */}
        <div class="modal fade" id="editsubcat" tabindex="-1" aria-labelledby="edtsubcat" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="edtsubcat">Edit Category</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                    <div className="form-group">
                            <label>Category Name</label>
                            <select className="form-control pl-3 f-17" id="catId" name="editcatnm" onChange={this.onSelectChange}>
                              {categories.map((cat, index) => (
                                <>
                                  {
                                     cat._id==editcatId?
                                      <option selected  key={index} value={cat._id} style={{backgroundColor:"gray"}}>{cat.name}</option>:
                                      <option key={index} value={cat._id}>{cat.name}</option>
                                    
                                  }
                                </>
                              ))}
                            </select>
                          </div>
                      <div className="form-group">
                        <label>Sub-Category Name</label>
                        <input name="editsubcatnm" className="form-control" value={this.state.editsubcatnm} onChange={this.editsubcatnm}/>
                      </div>
                      <div className="form-group">
                      </div>
                      <div className="form-group">
                        <label>Visibility</label>
                        <input type="checkbox"  name="visibility" value={(visibility == true)} className="form-control-check ml-5  visi" checked={(visibility == true)} onChange={this.subcatvisi}/>
                      </div>
                      <button className="btn btn-info" onClick={this.onupdatesubcat}>Update</button>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* --------------edit modal end---------- */}
      </div>
    );
                                }
  }
}

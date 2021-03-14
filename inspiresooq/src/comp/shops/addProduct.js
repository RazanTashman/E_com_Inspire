import React from "react"
import $ from "jquery"
import "./shops.css"
import Products from "./products"
import {base64ToBlob} from "base64toblob"
// import { base64ToBlob, blobToBase64 } from 'base64-blob'
class addProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            productName: "",
            price: "",
            description: "",
            categories: "",
            image: "",
            redirect: false,
            productNameEr: "",
            priceEr: "",
            categoriesEr: "",
            formType: true,
        }
    }
    getTheInfo(event) {
        var that = this
        if (event.target.name !== "image") {
            this.setState({ [event.target.name]: event.target.value });
            console.log([event.target.name], event.target.value)
        }
        else {
            // this.setState({ [event.target.name]: event.target.files[0].name });
            console.log("image::::::::", event.target.files[0].name)
            var blob= event.target.files[0]
            var reader = new FileReader(); 
                              reader.readAsDataURL(blob); 
                              reader.onloadend = function () { 
                               
                                var base64String = reader.result;
                                var n = base64String.indexOf("base64,")+7;
                                base64String = reader.result.substr(n); 
                              that.setState({ [event.target.name]: base64String });

                                
                              }
        }
    }

    submit() {
       
        var data = {
            productName: this.state.productName,
            price: this.state.price,
            categories: this.state.categories,
            description: this.state.description,
            image: this.state.image,
            userId: localStorage.getItem("id")
        }
        console.log("image:::", this.state.image)
        var that = this
        $.ajax({
            method: 'POST',
            data: JSON.stringify(data),
            url: `http://localhost:5000/shop/addproduct`,
            contentType: "application/json",
            success: function (data) {
                console.log("dataaaa:", data)
                that.setState({ products: data })
                // that.setState({ formType: false })
            },
            error: function (err) {
                console.log("err", err)
                that.setState({ emailError: err.responseText })
            }
        })


    }

    render() {
        return (
            <div>
                {this.state.formType ?
                    <form action="/items" style={{ marginTop: "8%", marginLeft: "30%", width: "40%" }} className="FORM">

                        <div className="form-group">
                            <input  style={{ height: "35px"}} type="text" className="form-control" placeholder="Item Name" name="productName" required="required" onChange={(e) => this.getTheInfo(e)} />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.productNameEr}
                            </div>
                        </div>

                        <br />

                        <div className="form-group">
                            <input style={{ height: "35px"}} type="number" className="form-control" placeholder="Item Price" name="price" required="required" onChange={(e) => this.getTheInfo(e)} />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.productPriceEr}
                            </div>
                        </div>

                        <br />

                        <div className="form-group">
                            <input style={{ height: "35px"}} type="text" className="form-control" placeholder="Description" name="description" required="required" onChange={(e) => this.getTheInfo(e)} />
                        </div>
                        <br />

                        <select  style={{ height: "35px"}}  name="categories" id="inputState" className="form-control" required="required"
                            onChange={(e) => this.getTheInfo(e)}  >
                            <option name="" disabled>Choose option</option>
                            <option value="electronics" >Electronics</option>
                            <option value="gaming" >Gaming</option>
                            <option value="women" >Women's Fashion</option>
                            <option value="men" >Men's Fashion</option>
                            <option value="kids" >Kids</option>
                            <option value="Pets" >Pets</option>

                        </select>
                        <br />

                        <div className="custom-file">
                            <input style={{ height: "50px"}} type="file" className="custom-file-input" id="customFile" required="required" name="image" onChange={(e) => this.getTheInfo(e)} />
                           {/*  key={Math.random().toString(36) || ''} */}
                            <label className="custom-file-label" for="customFile">Pick Image</label>
                        </div>

                        <br /><br />
                        <div>
                            {/* {this.renderRedirect()} */}
                            <button type="button" onClick={this.submit.bind(this)} style={{ fontWeight: 'bold', fontSize: "22px" }} className=" butt btn-lg  "> Add</button>
                        </div>
                    </form>
                    :
                    <Products products={this.state.products} />
                }


            </div>
        )
    }
}

export default addProduct




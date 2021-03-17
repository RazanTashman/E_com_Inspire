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
            url:""
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
                            //   that.setState({ [event.target.name]: base64String });
                              
                                // console.log(base64String)
                                const data = window.atob(base64String)
                                const buf = new Array(data.length);
                                for (let i = 0; i < data.length; i++) {
                                    buf[i] = data.charCodeAt(i);
                                }
                              
                                // const byteArray = new Uint8Array(buf);
                                // const blob = new Blob([byteArray], {type: "image/png"});
                                // var url =URL.createObjectURL(blob);
                                console.log("Blob",new Uint8Array(buf))
                                var url = URL.createObjectURL(new Blob( [  new Uint8Array(buf) ], {type: "image/png"}) )
                             console.log("url:::",url)
                             that.setState({url: url})

                             var myCanvas = document.getElementById('canvas');
                                var ctx = myCanvas.getContext('2d');
                                var img = new Image;
                                img.src = that.state.url
                                img.onload = function(){
                                ctx.drawImage(img,100,0,80, 80); 
                                };
                            //    var width = img.width
                            //    var height = img.height
                            //     myCanvas.width = width
                                myCanvas.height = "100"
                              
                               
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
                that.setState({ formType: false })
            },
            error: function (err) {
                console.log("err", err)
                that.setState({ emailError: err.responseText })
            }
        })


    }


    //    renderRedirect = () => {
    //     if (this.state.redirect) {
    //       return <Redirect to={`/store/${this.state.shopId}`} />
    //     }
    //   }

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
                        
                        {/* <img style={{width:"13%" }} src = { URL.createObjectURL(new Blob( [  new Uint8Array(this.state.buf) ], {type: "image"}) )} />  */}
                        {/* <img style={{width:"13%", marginTop:"2%" }} src = { this.state.url} />  */}
                        {/* { console.log("canvasss::::",document.getElementById('canvas').toDataURL(' image/jpeg '))} */}
                        <canvas style={{ marginTop:"2%" ,height:"80px" }} id ="canvas"></canvas>
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




import React from "react"
import $ from "jquery"
import "./shops.css"
import Products from "./products"
import { storage } from './firebase.';
class editProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            productName: "",
            price: "",
            description: "",
            categories: "",
            image: null,
            redirect: false,
            productNameEr: "",
            priceEr: "",
            categoriesEr: "",
            formType: true,
            rendering: this.props.rendering
        }

        console.log("this.props.rendering::", this.state.rendering)
    }

    componentDidMount() {
        let that = this
        $.ajax({
            method: 'GET',
            url: `http://localhost:5000/shop/product/${localStorage.getItem("productId")}`,
            contentType: "application/json",
            success: function (data) {
                console.log("dataaaa:", data)
                that.setState({
                    productName: data[0].productName,
                    price: data[0].price,
                    description: data[0].description,
                    categories: data[0].categories,
                    image: null
                })
            },
            error: function (err) {
                console.log("err", err)
                that.setState({ emailError: err.responseText })
            }
        })

    }

    getTheInfo(event) {
        var that = this
        if (event.target.name !== "image") {
            this.setState({ [event.target.name]: event.target.value });
            console.log([event.target.name], event.target.value)
        }
        else {
            console.log("image::::::::", event.target.files[0].name)
            var blob = event.target.files[0]
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
                var base64String = reader.result;
                var n = base64String.indexOf("base64,") + 7;
                base64String = reader.result.substr(n);
                console.log("base64String", base64String)
                
                const data = window.atob(base64String)
                console.log("atob", data)
                
                const buf = new Uint8Array(data.length);
               
                for (let i = 0; i < data.length; i++) {
                    buf[i] = data.charCodeAt(i);
                }
               
                console.log("buf", buf)
                that.uploadBytes(buf, event.target.files[0].name)

            }
        }
    }

    uploadBytes(bytes, name) {
        const uploadTask = storage.ref(`images/${name}`).put(bytes).then((data) => {
            console.log("data", data);
            data.ref.getDownloadURL().then(url => {
                console.log("url", url)
                this.setState({ image: url })
            })
        })
    }


    edit() {
        // this.setState({ formType: false }) 
        this.setState({ rendering: 2 })

        var data = {
            productName: this.state.productName,
            price: this.state.price,
            categories: this.state.categories,
            description: this.state.description,
            image: this.state.image,
            userId: localStorage.getItem("id")
        }
        console.log(data)
        var that = this
        $.ajax({
            method: 'PUT',
            url: `http://localhost:5000/shop/product/${localStorage.getItem('productId')}`,
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function (data) {
                console.log("data:", data)
                //    that.setState({products: data})
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
                { console.log("edit:", this.state.rendering)}
                {this.state.rendering === 4 ?
                    <form action="/items" style={{ marginTop: "8%", marginLeft: "30%", width: "40%" }} className="FORM">

                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Item Name" value={this.state.productName} name="productName" required="required" onChange={(e) => this.getTheInfo(e)} />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.productNameEr}
                            </div>
                        </div>

                        <br />

                        <div className="form-group">
                            <input type="number" className="form-control" placeholder="Item Price" value={this.state.price} name="price" required="required" onChange={(e) => this.getTheInfo(e)} />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.productPriceEr}
                            </div>
                        </div>

                        <br />

                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Description" value={this.state.description} name="description" required="required" onChange={(e) => this.getTheInfo(e)} />
                        </div>
                        <br />

                        <select name="categories" id="inputState" value={this.state.categories} className="form-control" required="required"
                            onChange={(e) => this.getTheInfo(e)}  >
                            <option name="" disabled>Choose option</option>
                            <option value="electronics" >Electronics</option>
                            <option value="gaming" >Gaming</option>
                            <option value="food" >Food</option>
                            <option value="women" >Women's Fashion</option>
                            <option value="men" >Men's Fashion</option>
                            <option value="kids" >Kids</option>
                            <option value="Pets" >Pets</option>

                        </select>
                        <br />

                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="customFile" required="required"  name="image" onChange={(e) => this.getTheInfo(e)} />
                            <label className="custom-file-label" for="customFile">Pick Image</label>
                        </div>

                        <br /><br />
                        <div>
                            {/* {this.renderRedirect()} */}
                            <button type="button" onClick={this.edit.bind(this)} style={{ fontWeight: 'bold', fontSize: "22px" }} className=" butt btn-lg "> Edit </button>
                        </div>
                    </form>
                    :
                    <Products rendering={this.state.rendering} />
                }
            </div>
        )
    }
}

export default editProduct
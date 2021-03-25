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
            subcat: "",
            catId: "",
            image: "",
            redirect: false,
            productNameEr: "",
            priceEr: "",
            categoriesEr: "",
            rendering: this.props.rendering,
            allCategories: [],
            subcats: []
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
                    categories: data[0].category,
                    catId: data[0].catId,
                    subcat: data[0].subCatId,
                    image: data[0].image
                })

                that.getSubcat(that.state.catId)
            },
            error: function (err) {
                console.log("err", err)
                that.setState({ emailError: err.responseText })
            }
        })


        $.ajax({
            method: 'GET',
            url: `http://localhost:5000/categories`,
            contentType: "application/json",
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            success: function (data) {
                console.log("allCategories:", data)
                that.setState({
                    allCategories: data
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
            if (event.target.name === "categories") {
                console.log("name::", event.target.name)
                console.log("value::", event.target.value)
                var catID = that.state.allCategories.filter(cat => cat.category === event.target.value)
                this.setState({ categories: event.target.value });
                // console.log("this.state.categories",this.state.categories)
                // this.setState({ [event.target.name]: event.target.value });
                // this.setState({ [event.target.value]: catID[0].catId });
                console.log([event.target.value], catID[0].catId )
                that.getSubcat(catID[0].catId)
            }
            else{
                 this.setState({ [event.target.name]: event.target.value });
            console.log([event.target.name], event.target.value)
            }



            //////////////////
            // if (event.target.name === "categories") {
            //     console.log("name::", event.target.name)
            //     console.log("value::", event.target.value)
            //     var catID = that.state.allCategories.filter(cat => cat.category === event.target.value)
            //     that.getSubcat(catID[0].catId)
            //     // this.setState({ [event.target.name]: catID[0].catId });
            //     // console.log([event.target.name], catID[0].catId)
            // }
            // else{
            //     this.setState({ [event.target.name]: event.target.value });
            //     console.log([event.target.name], event.target.value)
            // }
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
        // var catID =
        this.setState({ rendering: 2 })

       
        console.log("categories EDIT",this.state.categories, "subcat EDIT",this.state.subcat,)
        var data = {
            productName: this.state.productName,
            price: this.state.price,
            categories:  this.state.allCategories.filter(cat => cat.category === this.state.categories)[0].catId,
            subcat: JSON.parse(this.state.subcat) ,
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


    getSubcat(catId) {
        console.log("get Subcat")
        var that = this
        $.ajax({
            method: 'GET',
            url: `http://localhost:5000/subcategories/${catId}`,
            contentType: "application/json",
            success: function (data) {
                console.log("subbbb:", data)
                that.setState({
                    subcats: data
                })
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
                {/* { console.log("edit:", this.state.rendering)} */}
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
                        <div>
                            {this.state.categories}
                            <select style={{ height: "35px" }} name="categories" value={this.state.categories} className="form-control" required="required"
                                onChange={(e) => this.getTheInfo(e)}    >
                                <option name="" selected disabled>Choose Option</option>
                                {this.state.allCategories.map((category) => {
                                    return (
                                        <option value={category.category} >{category.category}</option>
                                    )
                                })
                                }

                            </select>
                        </div>
                        <br />


                        <select style={{ height: "35px" }} name="subcat" value={this.state.subcat} className="form-control" required="required"
                            onChange={(e) => this.getTheInfo(e)}    >
                            <option name="" selected disabled>Choose Option</option>
                            {this.state.subcats.map((subcat) => {
                                return (
                                    <option value={subcat.subCatId} >{subcat.subCat}</option>
                                )
                            })
                            }
                        </select>
                        <br />
                        <br />

                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="customFile" required="required" name="image" onChange={(e) => this.getTheInfo(e)} />
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
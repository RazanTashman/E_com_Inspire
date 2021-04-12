import React from "react"
import $ from "jquery"
import Nav from '../navBar/navBar'
import HorizontalGallery from 'react-dynamic-carousel'
import image1 from "../../images/productss.jpg"


class User extends React.Component {
    constructor() {
        super()
        this.state = {
            categories: [],
            products: [],
            cart: [],
            subcats: []
        }
    }

    componentDidMount() {
        let that = this

        $.ajax({
            method: 'GET',
            url: `http://localhost:5000/cart/${localStorage.getItem("id")}`,
            contentType: "application/json",
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            success: function (data) {
                data.map(singleCart => that.state.cart.push(singleCart.productId))

                that.setState({ cart: that.state.cart })
                console.log("cart::",data.map(singleCart => that.state.cart.push(singleCart.productId ) ))
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
            success: function (data) {
                console.log("categories:", data)
                that.setState({
                    categories: data
                })
            },
            error: function (err) {
                console.log("err", err)
                that.setState({ emailError: err.responseText })
            }
        })

        $.ajax({
            method: 'GET',
            url: `http://localhost:5000/user/products`,
            contentType: "application/json",
            success: function (data) {
                console.log("dataaaa:", data)
                that.setState({
                    products: data
                })
            },
            error: function (err) {
                console.log("err", err)
                that.setState({ emailError: err.responseText })
            }
        })


    }

    filtration(catId) {

        let that = this
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


        $.ajax({
            method: 'GET',
            url: `http://localhost:5000/user/products/${catId}`,
            contentType: "application/json",
            success: function (data) {
                console.log("dataaaa:", data)
                that.setState({
                    products: data
                })
            },
            error: function (err) {
                console.log("err", err)
                that.setState({ emailError: err.responseText })
            }
        })
    }



    subFiltration(catId){
        console.log("catId|||||||||", catId)
        var that = this
        $.ajax({
            method: 'GET',
            url: `http://localhost:5000/user/subcat/products/${catId}`,
            contentType: "application/json",
            success: function (data) {
                console.log("subbbbbbbprrrrrroooo:", data)
                that.setState({
                    products: data
                })
            },
            error: function (err) {
                console.log("err", err)
                that.setState({ emailError: err.responseText })
            }
        })

    }
    cart(id, index) {
        var but = document.getElementById(index)
        console.log("but", but)
        but.style.color = "gray"
        but.style.cursor = "auto"
        var data = {
            userId: localStorage.getItem("id"),
            productId: id,
            price: this.state.products[index].price
        }
        var that = this
        $.ajax({
            method: 'POST',
            data: JSON.stringify(data),
            url: `http://localhost:5000/cart`,
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            contentType: "application/json",
            success: function (data) {
                console.log("dataaaa:", data)

            },
            error: function (err) {
                console.log("err", err)
                that.setState({ emailError: err.responseText })
            }
        })
    }


    getProduct(id) {
        localStorage.setItem("productId", id)
        window.location = ` /product/${id}`

    }


    render() {
        return (
            <div>
                <Nav />
                <div className="container" >
                    <div className="container" >
                        <div style={{
                            marginTop: "10%",
                        }}>
                            <HorizontalGallery
                                tiles={this.state.categories.map((category) => (
                                    <div
                                        style={{
                                            alignItems: 'center',
                                            width: "130%",
                                        }}
                                    >
                                        <div id="gallery">
                                            <img className="  card-img-top" style={{ width: "100%", opacity: "0.8" }} src={category.catImage} style={{ width: "100%" }} onClick={() => this.filtration(category.catId)} />
                                            <div id="gallery" className="card-body" style={{ marginTop: "0%", color: "black", fontWeight: "bold", opacity: 0.8, background: "#d7d7d7", padding: "3px" }}>
                                                <h1 className="card-text" >{category.category}</h1>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                elementWidth={250}
                                fadeDistance={100}
                                minPadding={20}
                            />
                        </div>

                        {/* <div className="row">
                        {this.state.categories.map((category) => {

                            return (
                                <div className="col-sm-4" >
                                    <div className="card categories" style={{ marginTop: "24%" }} onClick={() => this.filtration(category.category)} >
                                        <img className="card-img-top" style={{ opacity: "0.8" }} src={category.image} alt="Category" />
                                        <div className="card-body" style={{ marginTop: "-40%", color: "black", fontWeight: "bold", opacity: 0.8, background: "#d7d7d7", padding: "3px" }}>
                                            <h1 className="card-text" >{category.category}</h1>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }

                    </div> */}
                        <br /> <br />

                        <div  className="row">
                            {this.state.subcats.map((subcat) => {

                                return (
                                    <div className="col-sm-2" >
                                        <div  style={{ marginTop: "24%"}}  >
                                            <img style={{ opacity: "0.8",  width:"40%",  cursor: "pointer"}} src={subcat.subcatImage } alt="Category" onClick={() => this.subFiltration(subcat.subCatId)} />
                                            {/* <div className="card-body" style={{  marginTop: "-40%",  width:"100%", color: "black", fontWeight: "bold", opacity: 0.8, background: "#d7d7d7", padding: "3px" }}>
                                                <h1 className="card-text" >{subcat.subCat}</h1>
                                            </div> */}
                                        </div>
                                    </div>
                                )
                         

                            })}
                        </div>

                        <div className="row" style={{ marginTop: "10%" }}>
                            {this.state.products.map((product, index) => {
                                //  {console.log("product",product)}
                                return (
                                    <div className="col-sm-3" >
                                        <div className="card categories" style={{ marginBottom: "4%" }} >
                                            <div className="card-body" style={{ height: "470px" }} className="categories" onClick={() => this.getProduct(product.productId)}>
                                                {/* <img src={URL.createObjectURL(new Blob( [  new Uint8Array(product.image.data) ], {type: "image"}) )}  alt="Product" style={{width:"100%"}}/> */}
                                                <img src={product.image} alt="Product" style={{ width: "100%" }} />
                                                <div >
                                                    <h1>{product.productName}</h1>
                                                    <p className="price">{product.price}</p>
                                                    <p>{product.description}</p>
                                                </div>
                                            </div>
                                            {/* {console.log("listed", this.state.cart)} */}
                                            {!(this.state.cart.includes(product.productId)) ?
                                                <p><button type="button" id={index} style={{ marginBottom: "-4%", backgroundColor: "rgb(241, 237, 237)", color: "#645deb" }} onClick={() => this.cart(product.productId, index)} >Add to Cart</button></p>
                                                :
                                                <p><button type="button" disabled style={{ marginBottom: "-4%", backgroundColor: "rgb(241, 237, 237)", color: "gray", cursor: "auto" }}  >Add to Cart</button></p>

                                            }
                                        </div>
                                    </div>
                                )
                            })
                            }

                        </div>
                    </div >
                </div >
            </div >
        )
    }
}

export default User
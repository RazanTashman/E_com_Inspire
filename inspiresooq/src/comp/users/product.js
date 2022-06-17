import React from "react"
import $ from "jquery"
// import ProductImg from '../../images/pexels-oleg-magni-1005638.jpg'
import Nav from '../navBar/navBar'
import { Redirect } from 'react-router-dom'

class Product extends React.Component {
    constructor() {
        super()
        this.state = {
            productName: "",
            price: "",
            description: "",
            categories: "",
            productId:"",
            image: null,
            redirect: false,
            shopId:"",
            cart:[]
            

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
                console.log("datadata", data)
                // data.map(singleCart => that.state.cart.push(singleCart.productId))
                console.log("cart::",data.map(singleCart => that.state.cart.push(singleCart.productId ) ))
                that.setState({ cart: that.state.cart })
            },
            error: function (err) {
                console.log("err", err)
                that.setState({ emailError: err.responseText })
            }
        })
        $.ajax({
            method: 'GET',
            url: `http://localhost:5000/product/${localStorage.getItem("productId")}`,
            contentType: "application/json",
            success: function (data) {
                console.log("dataaaa:", data)
                that.setState({
                    productName: data[0].productName,
                    price: data[0].price,
                    description: data[0].description,
                    categories: data[0].categories,
                    productId:  data[0].productId, 
                    image: data[0].image,
                    shopeName: data[0].shopeName,
                    shopId: data[0].shopId
                })
            },
            error: function (err) {
                console.log("err", err)
                that.setState({ emailError: err.responseText })
            }
        })

    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to={`/store/${this.state.shopId}`} />
        }
      }

    cart(){
        var but = document.getElementById("BUTT")
        but.style.color = "gray"
        // but.style.background="rgb(241, 237, 237)"
        but.style.cursor = "auto"
        var data ={
            userId: localStorage.getItem("id"),
            productId:this.state.productId,
            price: this.state.price
        }
        var that = this
        $.ajax({
            method: 'POST',
            data: JSON.stringify(data),
            url: `http://localhost:5000/cart`,
            contentType: "application/json",
            headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`},
            success: function (data) {
                console.log("dataavvvvvvvvvvvvvvvvaa:", data)
                that.setState({ products: data })
                that.setState({ formType: false })
            },
            error: function (err) {
                console.log("err", err)
                that.setState({ emailError: err.responseText })
            }
        })
      }
      
    store(){
        this.setState({
            redirect: true
          })
        
    }
    render() {
        const header = {
            color: "#5c7f3f",
            marginTop: "20%"
        }
       
       const buttons={
            border: "none",
            outline: "0",
            padding: "12px",
            color:" white",
            background: "#6A1B4D",
            marginLeft: "2px",
            marginTop: "15%",
            // text-align: "center",
            // padding:"5px",
            cursor: "pointer",
            width: "120px",
            fontSize: "18px",
        }
        return (
            <div>
                <Nav />
                <div className="container" >
                    <div className="row">
                        <div className="col-sm-6" >
                            <div style={{ float: "right", marginTop: "20%" }}>
                                {/* <div className="card" style={{ width: "50%" }}  style={{ marginTop: "15%" }}> */}
                                {/* <img src= { URL.createObjectURL(new Blob( [  new Uint8Array(this.state.image) ], {type: "image"}) )}style={{ marginTop: "20%", width: "50%" }} alt="Image" /> */}
                                <img src= {this.state.image }style={{ marginTop: "20%", width: "50%" }} alt="product" />

                                <h6 style={{ color: "gray", fontSize: "22px" }}> <b style={{ color: "rgb(92, 91, 91)" }} ></b>{this.state.description}</h6>
                            </div>
                        </div >
                        <div className="col-sm-6" >
                            <div style={{ float: "left", marginTop: "27%" }}>
                                <h1 style={header}>{this.state.shopeName}</h1>
                                <br />
                                <h2 style={{ color: "gray", fontSize: "22px" }}> <b style={{ color: "rgb(92, 91, 91)" }}></b> {this.state.productName}</h2>
                                <br />
                                <h2 style={{ color: "gray", fontSize: "22px" }}> <b style={{ color: "rgb(92, 91, 91)" }} ></b>{this.state.price} $</h2>
                               <div>
                               {console.log("this.state.productId", this.state.productId)}
                                     {console.log("listed", this.state.cart)}
                                     {console.log(this.state.cart.includes(this.state.productId))}
                               {(!this.state.cart.includes(this.state.productId)) ?
                                                <p><button  type="button" id="BUTT" className ="cartButt" onClick={() => this.cart(this.state.productId)} >Add to Cart</button></p>
                                                :
                                                <p><button  type="button" disabled style={{ marginBottom: "-4%", backgroundColor: "rgb(241, 237, 237)", color: "gray", cursor: "auto" }} className ="cartButt" >Add to Cart</button></p>

                                            }
                                {/* <button style ={buttons} onClick={() => this.cart()}>Add To Cart</button> */}
                                {this.renderRedirect()}
                                <button style ={buttons} onClick = { () => this.store()}>Visit Store</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="card" style={{ width: "50%" }}  style={{ marginTop: "15%" }}>
                            <img className="border border-success card-img-top rounded-circle" src={ProductImg} style={{ marginTop:"-30%",marginLeft:"15%", width:"200px", height:"200px"}} alt="Image" />
                            <div className="card-body">
                                <h1 className="card-text" style={header}>{this.state.shopeName}</h1>
                                <br/>
                                <h2 style ={{color:"gray", fontSize :"22px"}}> <b style ={{color:"rgb(92, 91, 91)"}}>Product Name:</b> {this.state.productName}</h2>
                                <br/>
                                <h2 style ={{color:"gray", fontSize :"22px"}}> <b style ={{color:"rgb(92, 91, 91)"}} >Price:</b>{this.state.price}</h2>
                            </div>
                        </div> */}
            </div>
            // </div>
        )
    }
}

export default Product
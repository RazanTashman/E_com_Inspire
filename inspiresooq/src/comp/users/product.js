import React from "react"
import $ from "jquery"
import ProductImg from '../../images/pexels-oleg-magni-1005638.jpg'
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
            image: null,
            redirect: false,
            shopId:""
            

        }
    }

    componentDidMount() {
        let that = this
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
                    image: null,
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
            background: "#000",
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
                                <img src={ProductImg} style={{ marginTop: "20%", width: "300px", height: "300px" }} alt="Card image cap" />
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
                                <button style ={buttons}>Add To Cart</button>
                                {this.renderRedirect()}
                                <button style ={buttons} onClick = { () => this.store()}>Visit Store</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="card" style={{ width: "50%" }}  style={{ marginTop: "15%" }}>
                            <img className="border border-success card-img-top rounded-circle" src={ProductImg} style={{ marginTop:"-30%",marginLeft:"15%", width:"200px", height:"200px"}} alt="Card image cap" />
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
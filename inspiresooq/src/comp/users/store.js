import React from "react"
import $ from "jquery"
// import ProductImg from '../../images/pexels-oleg-magni-1005638.jpg'
import Nav from '../navBar/navBar'
import call from "../../images/call.png"

class Store extends React.Component {
    constructor() {
        super()
        this.state = {
            products: [],
            shopName: "",
            phoneNo:"",
            
        }
    }

    componentDidMount() {


        let that = this

        $.ajax({
            method: 'GET',
            url: `http://localhost:5000${window.location.pathname}`,
            contentType: "application/json",
            success: function (data) {
                console.log("dataaaa:", data)
                that.setState({
                    products: data
                    // productName: data[0].productName,
                    // price: data[0].price,
                    // description: data[0].description,
                    // categories: data[0].categories,
                    // image: null,
                    // shopeName: data[0].shopeName,
                })
            },
            error: function (err) {
                console.log("err", err)
                that.setState({ emailError: err.responseText })
            }
        })

        $.ajax({
            method: 'GET',
            url: `http://localhost:5000/storeInfo/${localStorage.getItem("productId")}`,
            contentType: "application/json",
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            success: function (data) {
                console.log("shooop:", data)
                that.setState({
                    shopName: data[0].shopeName,
                    phoneNo:  data[0].phoneNo

                })
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
                <div>
                    <h1 style={{ width: "100%", zIndex: "1", position: 'fixed', marginTop: "4.7%", padding: "0.6%", fontFamily: 'Lobster', color: "#645deb", textAlign: "center", backgroundColor: "#ccc" }} onClick={() => this.storeInfo()} >Welcom to {this.state.shopName} </h1>
                </div>
                <div className="container" >
                <div className="row" style={{ marginTop: "14%" }}>
                {this.state.products.map((product) => {
                    { console.log("product", product) }
                    return (

                        <div className="col-sm-3"  >
                            <div class="card categories" style={{ marginBottom: "4%" }} onClick={() => this.getProduct(product.productId)}>
                                <div className="card-body" style={{height: "470px" }} >
                                    <img src={product.image} alt="Product" style={{ width: "100%" }} />
                                    <h1>{product.productName}</h1>
                                    <p class="price">{product.price}</p>
                                    <p>{product.description}</p>
                                </div>
                                <p><button style={{ marginBottom: "-4%", backgroundColor: "rgb(241, 237, 237)", color: "#645deb" }}>Add to Cart</button></p>
                            </div>
                        </div>
                    )
                })
                }
	</div>
    </div>
    <a href= {`tel:0${this.state.phoneNo}`}>
    {/* <a href= "tel:799460706"> */}
<img src={call} className ="fixed-bottom" style ={{border: "1px solid #ccc", borderRadius: "40px",color:"white",padding:"10px", marginLeft:"93%", width:"4%", background:"#817ce9"}}/> 
</a>
            </div>
        )
    }
}

export default Store
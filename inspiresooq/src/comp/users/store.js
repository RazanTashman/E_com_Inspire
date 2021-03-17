import React from "react"
import $ from "jquery"
// import ProductImg from '../../images/pexels-oleg-magni-1005638.jpg'
import Nav from '../navBar/navBar'
import Product from '../../images/pexels-oleg-magni-1005638.jpg'

class Store extends React.Component {
    constructor() {
        super()
        this.state = {
            products:[]
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

    }

    getProduct(id){
        localStorage.setItem("productId",id)
        window.location = ` /product/${id}`

    }
   
render(){
    return(
        <div>
                <Nav/>
                {this.state.products.map((product) => {
                             {console.log("product",product)}
                        return (
                            <div className="col-sm-3" >
                            <div class="card categories" style={{ marginBottom: "4%"}} onClick={() => this.getProduct(product.productId)}>
                                <img src={Product}  alt="Denim Jeans" style={{width:"100%"}}/>
                                <h1>{product.productName}</h1>
                                <p class="price">{product.price}</p>
                                <p>{product.description}</p>
                                <p><button style={{ marginBottom: "-4%", backgroundColor: "rgb(241, 237, 237)" , color: "#645deb"  }}>Add to Cart</button></p>
                                </div>
                        </div>
                        )
                        })
                        }
        </div>
    )
}
}

export default Store
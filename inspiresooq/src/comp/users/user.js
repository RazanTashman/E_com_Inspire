import React from "react"
import $ from "jquery"
import Nav from '../navBar/navBar'
import Category from '../../images/pexels-vedanti-237718.jpg'
import Product from '../../images/pexels-oleg-magni-1005638.jpg'


class User extends React.Component {
    constructor() {
        super()
        this.state = {
            categories:[],
            products:[],
        }
    }

    componentDidMount(){
        let that = this
        $.ajax({
          method: 'GET',
          url: `http://localhost:5000/categories`,
          contentType: "application/json",
          success: function (data) {
            console.log("dataaaa:", data)
            that.setState({
                categories:data
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
                  products:data
              })
            },
            error: function (err) {
              console.log("err", err)
              that.setState({ emailError: err.responseText })
            }
          })
    }

    filtration(catId){
        let that = this
        $.ajax({
            method: 'GET',
            url: `http://localhost:5000/user/products/${catId}`,
            contentType: "application/json",
            success: function (data) {
              console.log("dataaaa:", data)
              that.setState({
                  products:data
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
   

    render() {
        return (
            <div>
                <Nav />
                <div className="container" >
                    <div className="row">
                        {this.state.categories.map((category) => {
                           
                        return (
                            <div className="col-sm-4" >
                            <div className="card categories"    style ={{marginTop:"24%"}}onClick={() => this.filtration(category.category)} >
                                <img className="card-img-top" style ={{opacity: "0.8"}}src = {Category}alt="Card image cap" />
                                <div className="card-body" style ={{marginTop:"-40%", color:"white", fontWeight: "bold",  zIndex:"1", background :"black", padding:"3px"}}>
                                    <h1 className="card-text" >{category.category}</h1>
                                </div>
                            </div>
                        </div>
                        )
                        })
                        }
                        
                    </div>
                        <br/> <br/>

                    <div className="row" style ={{marginTop:"10%"}}>
                        {this.state.products.map((product) => {
                             {console.log("product",product)}
                        return (
                            <div className="col-sm-3" >
                            <div class="card categories" onClick={() => this.getProduct(product.productId)}>
                                <img src={Product}  alt="Denim Jeans" style={{width:"100%"}}/>
                                <h1>{product.productName}</h1>
                                <p class="price">{product.price}</p>
                                <p>{product.description}</p>
                                <p><button>Add to Cart</button></p>
                                </div>
                        </div>
                        )
                        })
                        }
                        
                    </div>
                </div>

            </div>
        )
    }
}

export default User
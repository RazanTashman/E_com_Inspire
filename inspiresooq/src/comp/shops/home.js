import React from "react"
import shop from "../../images/shop (1).png"
import add from "../../images/add-file (1).png"
import products from "../../images/shopping-cart (1).png"
import Profile from "./profile"
import MyProducts from './products'
import AddProduct from './addProduct'
import "./shops.css"
import $ from "jquery"
import Nav from "../navBar/navBar"
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shopeName: "",
      phoneNo: "",
      address: "",
      products: [],
      // shop:[],
      rendering: undefined
    }
  }
  // shop?shop=s&id=74
  getShop(id) {
    this.setState({ rendering: id })
    let that = this
    $.ajax({
      method: 'GET',
      url: `http://localhost:5000/shop/${localStorage.getItem("id")}`,
      contentType: "application/json",
      success: function (data) {
        console.log("dataaaa:", data)
        that.setState({
          shopeName: data[0].shopeName,
          phoneNo: data[0].phoneNo,
          address: data[0].address
        })
      },
      error: function (err) {
        console.log("err", err)
        that.setState({ emailError: err.responseText })
      }
    })

  }

  getProducts(id) {
    this.setState({ rendering: id })

    

  }



  render() {
    const header = {
      color: "#5c7f3f"
    }
    return (
      <div>
        {console.log("home:", this.state.rendering)}
        <Nav />
        <div className="container" style={{ margin: "8%" }}>
          <div className="row">
            <div className="col-sm-4" >
              <div className="flip-card" onClick ={() => this.getShop(1)}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img  src={shop} alt="Avatar" style={{width:"100px", height:"100px"}} />
                  </div>
                  <div className="flip-card-back">
                  <h1 className="card-text" style={header}>My Shop</h1>
                  </div>
                </div>
              </div>

              {/* <div className="card" onClick ={() => this.getShop(1)} >
                <img className="card-img-top" style ={{height:  "200px" , width:  "200px" }} src={shop} alt="Card image cap" />
                <div className="card-body">
                  <h1 className="card-text" style={header}>My Shop</h1>
                </div>
              </div> */}
            </div>

            <div className="col-sm-4">
            <div className="flip-card" onClick={() => this.setState({ rendering: 3 })}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img  src={add} alt="Avatar" style={{width:"100px", height:"100px"}} />
                  </div>
                  <div className="flip-card-back">
                  <h1 className="card-text" style={header}>Add New Product</h1>
                  </div>
                </div>
              </div>
              {/* <div className="card" onClick={() => this.setState({ rendering: 3 })}   >
                <img className="card-img-top" src={add} style={{ height: "200px", width: "200px" }} alt="Card image cap" />
                <div className="card-body">
                  <h1 className="card-text" style={header}>Add product</h1>
                </div>
              </div> */}
            </div>

            
            <div className="col-sm-4">
            <div className="flip-card"  onClick={() => this.getProducts(2)}>
                <div className="flip-card-inner" >
                  <div className="flip-card-front">
                    <img  src={products} alt="Avatar" style={{width:"100px", height:"100px"}} />
                  </div>
                  <div className="flip-card-back">
                  <h1 className="card-text" style={header}>My Products</h1>
                  </div>
                </div>
              </div>
              {/* <div className="card" onClick={() => this.getProducts(2)} >
                <img className="card-img-top" src={products} style={{ height: "200px", width: "200px" }} alt="Card image cap" />
                <div className="card-body">
                  <h1 className="card-text" style={header}>My Products</h1>
                </div>
              </div> */}
            </div>

          
          </div>
        </div>
        {this.state.rendering === 1 && <Profile shopeName={this.state.shopeName} phoneNo={this.state.phoneNo} address={this.state.address} />}
        {/* {this.state.rendering === 1 && <Profile shop ={this.state.shop} />} */}
        {this.state.rendering === 2 && <MyProducts rendering ={this.state.rendering} />}
        {this.state.rendering === 3 && <AddProduct />}
        {/* <MyProducts products={this.state.products}/> */}
        {/* <AddProduct/> */}
        {/* <Profile /> */}
      </div>


    )
  }
}

export default Home;

{/* <div>c
<div className= "border border-success rounded" style={{ width: "18rem"}}>
  <img  src={shop} alt="Card image cap" />
  <div >
    <h1 >MY Shop</h1>
  </div>
</div>
</div> */}
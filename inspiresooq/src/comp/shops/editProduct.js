import React from "react"
import $ from "jquery"
import "./shops.css"
class editProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            productName: "",
            price: "",
            description: "",
            categories: "",
            image: null,
            redirect: false,
            productNameEr: "",
            priceEr: "",
            categoriesEr: "",
          }
    }
    
    componentDidMount(){
        let that = this
        $.ajax({
            method: 'GET',
            url: `http://localhost:5000/shop/${localStorage.getItem("productId")}`,
            contentType: "application/json",
            success: function (data) {
             console.log("dataaaa:",data)
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

        this.setState({ [event.target.name]: event.target.value });
        console.log(event.target.value)
      }

      submit(){
        var data= {
            productName:this.state.productName, 
            price:this.state.price, 
            categories:this.state.categories,
            description:this.state.description, 
            image:this.state.image,
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
           console.log("data:",data)
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
                <form action="/items" style={{ marginTop :"12%" , marginLeft:"30%" ,width: "40%"}}  className="FORM">

                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Item Name" value= {this.state.productName} name="productName" required="required" onChange={(e) => this.getTheInfo(e)} />
                        <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.productNameEr}
                        </div>
                    </div>

                    <br />

                    <div class="form-group">
                        <input type="number" class="form-control" placeholder="Item Price" value= {this.state.price} name="price" required="required" onChange={(e) => this.getTheInfo(e)} />
                        <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.productPriceEr}
                        </div>
                    </div>

                    <br />

                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Description" value= {this.state.description} name="description" required="required" onChange={(e) => this.getTheInfo(e)} />
                    </div>
                    <br />

                    <select name="categories" id="inputState" value= {this.state.categories} class="form-control" required="required"
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

                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="customFile" required="required"  />
                        <label class="custom-file-label" for="customFile">Pick Image</label>
                    </div>

                    <br /><br />
                    <div>
                        {/* {this.renderRedirect()} */}
                        <button type="button" onClick={this.submit.bind(this)} style={{ fontWeight: 'bold', fontSize: "22px" }} className=" butt btn-lg text-white "> Add</button>
                    </div>
                </form>


            </div>
        )
    }
}

export default editProduct
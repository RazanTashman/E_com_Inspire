import React from "react"
import $ from "jquery"
import "./shops.css"
class addProduct extends React.Component {
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
          method: 'POST',
          data: JSON.stringify(data),
          url: `http://localhost:5000/shop/addproduct`,
          contentType: "application/json",
          success: function (data) {
           console.log("dataaaa:",data)
          //  that.setState({products: data})
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
                <form action="/items" style={{ marginTop :"12%" , marginLeft:"30%" ,width: "40%"}} className="FORM">

                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Item Name" name="productName" required="required" onChange={(e) => this.getTheInfo(e)} />
                        <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.productNameEr}
                        </div>
                    </div>

                    <br />

                    <div class="form-group">
                        <input type="number" class="form-control" placeholder="Item Price" name="price" required="required" onChange={(e) => this.getTheInfo(e)} />
                        <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.productPriceEr}
                        </div>
                    </div>

                    <br />

                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Description" name="description" required="required" onChange={(e) => this.getTheInfo(e)} />
                    </div>
                    <br />

                    <select name="categories" id="inputState" class="form-control" required="required"
                        onChange={(e) => this.getTheInfo(e)}  >
                        <option name="" disabled>Choose option</option>
                        <option value="electronics" >Electronics</option>
                        <option value="gaming" >Gaming</option>
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

export default addProduct
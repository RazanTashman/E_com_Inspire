import React from "react"
import $ from "jquery"
import EditProduct from "./editProduct"
import axios from 'axios';
class Products extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rendering: 2, 
      products:  [],
      
    }
    // if(this.props.products)
   this.fromAdd= this.props
   console.log( this.fromAdd)
  

  }

  componentDidMount(props) {

  
    var that = this
    $.ajax({
      method: 'GET',
      url: `http://localhost:5000/shop/products/${localStorage.getItem("id")}`,
      contentType: "application/json",
      success: function (data) {
        console.log("daaaaata:", data)
        that.setState({ products: data })
        console.log( "Ajax",that.fromAdd.hasOwnProperty("products"))
        if (that.fromAdd.hasOwnProperty("products")){
          console.log("I'm ")
          that.setState({
            products: that.props.products
          });
        }
      },
      error: function (err) {
        console.log("err", err)
        that.setState({ emailError: err.responseText })
      }
    })
  }

  edit(productId) {
    localStorage.setItem("productId", productId)

    this.setState({ rendering: 4 })
   
  }

  delete(id) {
    var that = this
    $.ajax({
      method: 'DELETE',
      url: `http://localhost:5000/shop/product/${id}/${localStorage.getItem('id')}`,
      //   url: 'http://localhost:5000/shop/product'+ '?' + + $.param({id: id, user: localStorage.getItem('id')}),
      contentType: "application/json",

      success: function (data) {
        console.log("daaaaatssa:", data)
        that.setState({
          products: data
        });
      },

      error: function (err) {
        console.log('error:', err)
      }
    })
  }




  render(props) {
    console.log("product:", this.state.rendering)
    this.count = 1
    this.that =this
    return (

      <div>
      
        {/* {if(this.state.rendering === 1 ) */}

        {this.state.rendering === 2 ?
          <table className="table" style={{ marginTop: "8%", width: "90%", marginLeft: "5%" }}>
            <thead style={{ background: "#304f30", color: "white" }}>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Item</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                <th scope="col">Categories</th>
                <th scope="col">Image</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {console.log("JSX:",this.state.products)}

              {this.state.products.map((product) => {
                return (
                  <tr key={Math.random().toString(36) || ''}>
                    <th scope="row">{this.count++}</th>
                    <td>{product.productName}</td>
                    <td>{product.price}</td>
                    <td>{product.description}</td>
                    <td>{product.categories}</td>
                   {console.log("Image:::", product.image.data)}
                    {/* <td>{product.price}</td> */}
                    {/* ["image/png", "image/jpeg", "image/gif"] */}
                    <td>  <img style={{width:"8%" }} src = { URL.createObjectURL(new Blob( [  new Uint8Array(product.image.data) ], {type: "image"}) )} /> </td>

                    {/* data-toggle="popover" title="Popover title" data-content="And here's some amazing content. It's very engaging. Right?" */}
                    <td>
                      <button style={{ width: "30%", height: "10%", margin: "5%" }} className={product.productId} className=" butt btn-lg text-white " onClick={() => { this.edit(product.productId) }}>Edit</button>
                      <button style={{ width: "30%", height: "10%" }} className={product.productId} className=" butt btn-lg text-white" onClick={() => { this.delete(product.productId) }}>Delete</button>
                    </td>
                  </tr>
                )

              }
              )

              }

            </tbody>
          </table>
          :
          <EditProduct  rendering ={this.state.rendering} />
        }
        {/* {this.setState({rendering: true})  } */}
      </div>
    )
  }
}

export default Products




// fetch( `http://localhost:5000/shop/products/image/${localStorage.getItem("id")}` )
// .then( r => r.arrayBuffer() )
// .then( buffer => { // note this is already an ArrayBuffer
//   // there is no buffer.data here
//   console.log("buffer::",buffer)
//   const blob = new Blob( [ buffer ], {type: "image/png"} );
//   const url = URL.createObjectURL( blob );
//   console.log("URL::",url)

// } )
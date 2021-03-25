import React from "react"
import $ from "jquery"
import EditProduct from "./editProduct"
import axios from 'axios';
import Edit from '../../images/edit.png'
import Delete from '../../images/delete.png'
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
      headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`},
      success: function (data) {
        console.log("daaaaata:", data)
        that.setState({ products: data })
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
          <table className="table" style={{ marginTop: "10%", width: "90%", marginLeft: "3%" }}>
            <thead style={{ background: "#rgb(241, 241, 241)", color: "#817ce9" }}>
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
              {/* {console.log("JSX:",this.state.products)} */}

              {this.state.products.map((product) => {
                return (
                  <tr key={Math.random().toString(36) || ''}>
                    <th style={{ color: "#817ce9" }}scope="row">{this.count++}</th>
                    <td>{product.productName}</td>
                    <td>{product.price}</td>
                    <td>{product.description}</td>
                    <td>{product.category}</td>
                   {console.log("Image:::", product.image)}
                    {/* <td>{product.price}</td> */}
                    {/* ["image/png", "image/jpeg", "image/gif"] */}
                    {console.log( "Uint8Array::",URL.createObjectURL(new Blob( [  new Uint8Array(product.image.data) ], {type: "image"}) ))}
                    {/* <td>  <img style={{width:"13%" }} src = { URL.createObjectURL(new Blob( [  new Uint8Array(product.image.data) ], {type: "image"}) )} /> </td> */}
                    <td>  <img style={{width:"20%" }} src = {product.image} /> </td>

                    {/* data-toggle="popover" title="Popover title" data-content="And here's some amazing content. It's very engaging. Right?" */}
                    <td>
                      <img src= {Edit} data-placement="bottom" title="Edit" style={{ cursor: "pointer", width: "10%", margin: "1%" }}className={product.productId} onClick={() => { this.edit(product.productId) }} />
                      <img src={Delete} data-placement="bottom" title="Delete" style={{ cursor: "pointer", width: "10%", margin: "1%" }} className={product.productId} onClick={() => { this.delete(product.productId) }} />
                      {/* <button style={{ width: "30%", height: "10%", margin: "5%" }} className={product.productId} className=" butt btn-lg text-white " onClick={() => { this.edit(product.productId) }}>Edit</button> */}
                      {/* <button style={{ width: "30%", height: "10%" }} className={product.productId} className=" butt btn-lg text-white" onClick={() => { this.delete(product.productId) }}>Delete</button> */}
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
import React from "react"
import $ from "jquery"
import EditProduct from "./editProduct"
class Products extends React.Component {
    constructor(props){
        super(props)
            this.state ={
                rendering: true, 
                products:[]
            }
            
        }

        componentDidMount(){
            var that = this
            $.ajax({
              method: 'GET',
              url: `http://localhost:5000/shop/products/${localStorage.getItem("id")}`,
              contentType: "application/json",
              success: function (data) {
                console.log("daaaaata:", data[0].image)
                that.setState({ products: data })
              },
              error: function (err) {
                console.log("err", err)
                that.setState({ emailError: err.responseText })
              }
            })
            // this.setState({rendering: this.props.rendering})
            // console.log("rendering:::", this.state.rendering)
        }

        edit(productId){
            localStorage.setItem("productId",productId)
            this.setState({rendering: false})          
        }

        delete(id){
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

     
    render(props){
         this.count =1
         
        return(
            
            <div>
               {/* {if(this.state.rendering === 1 ) */}

               {this.state.rendering ?
                <table class="table" style={{ marginTop :"12%", width:"90%" ,marginLeft:"5%"}}>
  <thead  style= {{background :"#304f30", color:"white"}}>
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
      
      {this.state.products.map((product) =>{
          return (
            <tr>
            <th scope="row">{this.count++}</th>
            <td>{product.productName}</td>
            <td>{product.price}</td>
            <td>{product.description}</td>
            <td>{product.categories}</td>
          
            <td>  <img src= {URL.createObjectURL(new Blob([product.image], {type: "image/png"})) }/> </td>
            {console.log("IMG::", URL.createObjectURL(new Blob([product.image], {type: "image/png"})))}
            {/* new File([blob], "filename.json", {type: "text/json;charset=utf-8"}); */}
     {/* <td>{product.image}</td> */}
            <td>
                <button style={{width:"30%", height: "10%" ,margin: "5%"}} className ={product.productId} className= " butt btn-lg text-white "onClick = {()=>{this.edit(product.productId)}}>Edit</button>
                <button style={{width:"30%", height: "10%"}}  className ={product.productId} className= " butt btn-lg text-white" onClick = {()=>{this.delete(product.productId)}}>Delete</button>
            </td>
          </tr>
          )
         
      })
              
      }

    </tbody>
</table>
:
<EditProduct/>
       }
       {/* {this.setState({rendering: true})  } */}
          </div>
        )
    }
}

export default Products
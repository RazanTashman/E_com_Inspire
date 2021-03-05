import React from "react"
import $ from "jquery"
import EditProduct from "./editProduct"
class Products extends React.Component {
    constructor(props){
        super(props)
            this.state ={
                rendering: true, 
            }
            
        }

        componentDidMount(){
          
            this.setState({rendering: this.props.rendering})
            console.log("rendering:::", this.state.rendering)
        }

        edit(productId){
            localStorage.setItem("productId",productId)
            this.setState({rendering: false})          
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
      
      {this.props.products.map((product) =>{
          return (
            <tr>
            <th scope="row">{this.count++}</th>
            <td>{product.productName}</td>
            <td>{product.price}</td>
            <td>{product.description}</td>
            <td>{product.categories}</td>
          
            <td>  <img onClick ={()=>URL.revokeObjectURL(new Blob([104, 116, 116, 112, 115, 58, 47, 47, 119, 97, 108, 108, 112, 97, 112, 101, 114, 99, 97, 118, 101, 46, 99, 111, 109, 47, 119, 112, 47, 119, 112, 51, 49, 57, 52, 53, 52, 57, 46, 112, 110, 103]))} src= {URL.createObjectURL(new Blob([104, 116, 116, 112, 115, 58, 47, 47, 119, 97, 108, 108, 112, 97, 112, 101, 114, 99, 97, 118, 101, 46, 99, 111, 109, 47, 119, 112, 47, 119, 112, 51, 49, 57, 52, 53, 52, 57, 46, 112, 110, 103] , {type: "image/png"})) }/> </td>
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
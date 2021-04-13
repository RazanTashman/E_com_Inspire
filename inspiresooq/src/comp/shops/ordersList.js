import React from "react"
import $ from "jquery"
import Nav from "../navBar/navBar"

class OrdersList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fName:[],
      lName:[],
      orders: [],

    }

  }

  componentDidMount(props) {


    var that = this
    $.ajax({
      method: 'GET',
      url: `http://localhost:5000/shop/orders/${localStorage.getItem("id")}`,
      contentType: "application/json",
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      success: function (data) {
        console.log("orders:", data)
        that.setState({ orders: data })

        $.ajax({
          method: 'GET',
          url: `http://localhost:5000/buyer/${data[0].shopId}`,
          contentType: "application/json",
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
          success: function (data) {
            const array1 =[]
            const array2 =[]
            console.log("buyers:", data)
            data.map((buyer) => {
              array1.push(buyer.firstName)
              array2.push(buyer.lastName)
            })
            that.setState({ fName: array1 })
            that.setState({ lName: array2 })
          },
          error: function (err) {
            console.log("err", err)
            that.setState({ emailError: err.responseText })
          }
        })


      },
      error: function (err) {
        console.log("err", err)
        that.setState({ emailError: err.responseText })
      }
    })

  }



  render(props) {
    return (

      <div>
        <Nav/>
        <table className="table" style={{ marginTop:"7%", width: "90%", marginLeft: "1%" }}>
        {/* 817ce9 */}
          <thead style={{ background: "#rgb(241, 241, 241)", color: "#6A1B4D" }}>
            <tr>
              <th scope="col" style={{ width: "2%" }}>#</th>
              <th scope="col">Buyer Name</th>
              <th scope="col">Item</th>
              <th scope="col">qty</th>
              <th scope="col">Total</th>
            
              {/* <th scope="col">Actions</th> */}
            </tr>
          </thead>
          <tbody>

            {this.state.orders.map((order,index) => {
              return (
                <tr >
                  {/* 817ce9 */}
                  <th style={{ color: "#6A1B4D" }} scope="row">{index+1}</th>
                 { console.log("this.state.buyers[index].firstName",this.state.fName)}
                  {/* <td>{this.state.buyers[index].firstName} {this.state.buyers[index].lastName}</td> */}
                  <td>{this.state.fName[index]} {this.state.lName[index]}</td>
                  <td>{order.productName}</td>
                  <td>{order.qty}</td>
                  <td>{order.total}</td>
                  <td>  <img style={{ width: "20%" }} src={order.image} /> </td>
                  {/* <td>
                    <img src={Edit} data-placement="bottom" title="Edit" style={{ cursor: "pointer", width: "10%", margin: "1%" }} className={order.productId} onClick={() => { this.edit(product.productId) }} />
                    <img src={Delete} data-placement="bottom" title="Delete" style={{ cursor: "pointer", width: "10%", margin: "1%" }} className={product.productId} onClick={() => { this.delete(product.productId) }} />
                  </td> */}
                </tr>
              )
            }
            )
            }

          </tbody>
        </table>

      </div>
    )
  }
}

export default OrdersList

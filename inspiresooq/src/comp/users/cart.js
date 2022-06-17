import React from "react"
import $ from "jquery"
import close from '../../images/close.png'
import Nav from '../navBar/navBar'
import plus from "../../images/plus.png"
import minus from "../../images/minus.png"
// import GooglePayButton from '@google-pay/button-react'
import CheckoutForm from './stripe';
// import { CardElement } from '@stripe/react-stripe-js';

class Cart extends React.Component {
    constructor() {
        super()
        this.state = {
            products: [],
            count: 1,
            checked: false,
            order: [],
            checkedStatus: [],
            shop: [],
            total: 0,
            productIds: [],
        }
    }

    componentDidMount() {
        let that = this
        $.ajax({
            method: 'GET',
            url: `http://localhost:5000/cart/${localStorage.getItem("id")}`,
            contentType: "application/json",
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            success: function (data) {
                that.setState({ products: data })
            },
            error: function (err) {
                console.log("err", err)
                that.setState({ emailError: err.responseText })
            }
        })
        // this.googlePay()
    }
    counter(count, id, type) {
        var that = this
        function qty() {
  
            if (type === "plus") {
                var q = that.state.products[count].qty + 1
                return [q, q * that.state.products[count].price]
            }

            else
                if (that.state.products[count].qty !== 0) {
                    var q = that.state.products[count].qty - 1
                    return [q, q * that.state.products[count].price]
                }
                else
                    that.state.products[count].qty = 0



        }
        var data = {
            userId: localStorage.getItem("id"),
            cartId: id,
            qty: qty()
        }
        var pre = this.state.products[count].total


        $.ajax({
            method: 'POST',
            data: JSON.stringify(data),
            url: `http://localhost:5000/qty`,
            contentType: "application/json",
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            success: function (data) {
                var cheackBox = document.getElementById(count);
                if (cheackBox.checked)
                    that.setState({ total: that.state.total -= pre })
                that.setState({ products: data })
                if (cheackBox.checked)
                    that.checkedStatusFunc(count)


                that.setState({ products: data })


            },
            error: function (err) {
                console.log("err", err)
                that.setState({ emailError: err.responseText })

            }
        })



    }

    delete(id) {
        var that = this
        $.ajax({
            method: 'DELETE',
            url: `http://localhost:5000/cart/${id}/${localStorage.getItem('id')}`,
            contentType: "application/json",
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            success: function (data) {
                that.setState({
                    products: data
                });
            },

            error: function (err) {
                console.log('error:', err)
            }
        })
    }

    getTheInfo(event, index) {

        this.setState({ [event.target.name]: event.target.checked });
        this.state.checkedStatus[index] = event.target.checked
        console.log("productsss:", this.state.products)
        this.checkedStatusFunc(index)
        var cheackBox = document.getElementById(index);
        if (cheackBox.checked) {
            this.state.order.push(this.state.products[index].cartId)
            this.state.shop.push(this.state.products[index].shopId)
            this.state.productIds.push(this.state.products[index].productId)
        }

        else {

            const ele = this.state.order.indexOf(this.state.products[index].cartId);
            if (ele > -1) {
                this.state.order.splice(ele, 1)
                this.state.shop.splice(ele, 1)
            }
        }
    }
    checkedStatusFunc(index) {

        var cheackBox = document.getElementById(index);

        if (cheackBox.checked)
            this.setState({ total: this.state.total += this.state.products[index].total })

        else
            this.setState({ total: this.state.total -= this.state.products[index].total })
    }



    purchase() {
        var that = this
        var data = {
            userId: localStorage.getItem("id"),
            cartId: this.state.order,
            shopId: this.state.shop,
        }
        console.log("purchase", data)

        $.ajax({
            method: 'POST',
            data: JSON.stringify(data),
            url: `http://localhost:5000/addorder`,
            contentType: "application/json",
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            success: function (data) {
                for (var i = 0; i < that.state.order.length; i++) {
                    // that.delete(that.state.order[i])
                }

            },
            error: function (err) {
                console.log("err", err)
                that.setState({ emailError: err.responseText })

            }
        })

    }
    render() {
        const closeStyling = {

            width: "1%",
            marginRight: "-5%",
            cursor: "pointer",
        }

        const header = {
            color: "#5c7f3f",
            marginTop: "20%"
        }

        const border = {
            border: "1px solid #ccc",
            borderRadius: "15px",
            margin: "3%",
            marginTop: "-1%",
        }

        const buttons = {
            padding: "5px",
            cursor: "pointer",
            width: "15%",
            height: "9%",
        }
        return (
            <div>
                {/* <div className ="fixed-top"> */}
                <Nav />
                {/* </div> */}
                <div style={{ marginTop: "8%" }}></div>
                {this.state.products.map((product, index) => {
                    return (<div className="container" >
                        <div className="row " style={border}>

                            <div style={{ marginTop: "-18%" }}>
                                <div style={{ marginTop: "19%" }}>

                                    <input type="checkbox" id={index} style={{ marginRight: "90%" }} onChange={(e) => this.getTheInfo(e, index)} />

                                    <img src={close} onClick={() => this.delete(product.cartId)} style={closeStyling} />
                                </div>
                                <div className="col-sm-4"   >
                                    <div style={{ marginTop: "13%" }}>


                                        {/* <img src={URL.createObjectURL(new Blob([new Uint8Array(product.image.data)], { type: "image" }))} style={{ marginTop: "2%", marginLeft: "2%", width: "30%" }} alt="Image" /> */}
                                        <img src={product.image} style={{ marginTop: "2%", width: "30%" }} alt="Image" />
                                        <div >
                                            <br />
                                            <h6 style={{ color: "gray", fontSize: "15px" }}> <b style={{ color: "rgb(92, 91, 91)" }} ></b>{product.description}</h6>
                                        </div>
                                    </div>
                                </div >
                                <div className="col-sm-4" >
                                    <div >
                                        <h1 style={header}>{product.shopeName}</h1>
                                        <br />
                                        <h2 style={{ color: "black", fontSize: "22px" }}> <b style={{ color: "rgb(92, 91, 91)" }}></b> {product.productName}</h2>
                                        <br />
                                        <h2 style={{ color: "gray", fontSize: "22px" }}> <b style={{ color: "rgb(92, 91, 91)" }} ></b>{product.price} $</h2>

                                        <div className='row' style={{ marginTop: "5%", marginLeft: "42%" }}>

                                            <img onClick={() => this.counter(index, product.cartId, "minus")} style={buttons} src={minus} />
                                            <p style={{ paddingLeft: "12px", paddingRight: "12px", fontSize: "18px", border: "1px solid #ccc" }} >{product.qty}</p>
                                            <img onClick={() => this.counter(index, product.cartId, "plus")} style={buttons} src={plus} />
                                        </div>
                                        <p style={{ fontSize: "16px" }}>Total: {product.total}</p>
                                        {/* <CheckoutForm
                                            productIds={product.productId}
                                            price={product.total}
                                            qty={product.qty}
                                        /> */}

                                    </div>
                             
                                </div>
                                <div className="col-sm-4"  >
                                        <div style={{ marginTop: "110px" }}>
                                            <CheckoutForm
                                                // onClick ={() => this.purchase}
                                                cartId= {this.state.order}
                                                shopId= {this.state.shop}
                                                productIds={product.productId}
                                                shopId={product.shopId}
                                                price={product.total}
                                                qty={product.qty}
                                            />
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    )
                })
                }
                {/* <div className ="fixed-bottom" style ={{color:"white",padding:"10px" ,marginRight:"10%", background:"gray"}} > */}
            
             {/* 817ce9 */}
                <h1 className="fixed-bottom" style={{ border: "1px solid #ccc", borderRadius: "15px", color: "white", padding: "10px", marginLeft: "86%", width: "9%", background: "#8f1e65" }}>{this.state.total}</h1>
                {/* </div> */}



                <div>

                    {/* <CheckoutForm
                        productIds={this.state.productIds}
                        price={this.state.total}
                        qty={1}
                    /> */}

                </div>
            </div>)
    }
}

export default Cart
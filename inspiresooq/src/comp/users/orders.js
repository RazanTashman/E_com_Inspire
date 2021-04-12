import React from "react"
import $ from "jquery"
import close from '../../images/close.png'
import Nav from '../navBar/navBar'


class Orders extends React.Component {
    constructor() {
        super()
        this.state = {
            products: [],
            count: 1,
            checked: false,
            order: [],
            checkedStatus: [],
            total: 0,
        }
    }

    componentDidMount() {
        let that = this
        $.ajax({
            method: 'GET',
            url: `http://localhost:5000/orders/${localStorage.getItem("id")}`,
            contentType: "application/json",
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            success: function (data) {
                console.log("orders:",data)
                that.setState({ products: data })
            },
            error: function (err) {
                console.log("err", err)
                that.setState({ emailError: err.responseText })
            }
        })
    }
   
    getTheInfo(event, index) {

        this.setState({ [event.target.name]: event.target.checked });
        this.state.checkedStatus[index] = event.target.checked
        this.checkedStatusFunc(index)
    }
  
    render() {
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

        return (
            <div>
                <Nav />
                {/* <br /><br />  <br /><br />  <br /><br /> */}
                {/* <h1>{this.state.total}</h1> */}

                <div style={{ marginTop: "8%" }}></div>
                {this.state.products.map((product, index) => {
                    return (<div className="container" >
                        <div className="row " style={border}>

                            {/* <div style={{ marginTop: "-18%" }}> */}
                                <div className="col-sm-6" style={{ marginLeft: "10%" }}  >
                                    <div style={{ marginTop: "13%" }}>
                                        <img src={product.image} style={{ marginTop: "2%", marginLeft: "2%", width: "30%" }} alt="Image" />
                                        <div style={{ width: "70%", marginLeft: "13%" }}>
                                            <br />
                                            <h6 style={{ color: "gray", fontSize: "15px" }}> <b style={{ color: "rgb(92, 91, 91)" }} ></b>{product.description}</h6>
                                        </div>
                                    </div>
                                </div >
                                <div className="col-sm-6" style={{ marginLeft: "-30%" }} >
                                    <div style={{ marginTop: "15%" }}>
                                        <h1 style={header}>{product.shopeName}</h1>
                                        <br />
                                        <h2 style={{ color: "black", fontSize: "22px" }}> <b style={{ color: "rgb(92, 91, 91)" }}></b> {product.productName}</h2>
                                        <br />
                                        <h2 style={{ color: "gray", fontSize: "22px" }}> <b style={{ color: "rgb(92, 91, 91)" }} ></b>{product.price} $   </h2>
                                        <p style={{ fontSize: "16px" }}>Qty: {product.qty}</p>
                                        <div className='row' style={{ marginTop: "5%", marginLeft: "42%" }}>
                                        </div>
                                        <p style={{ fontSize: "16px" }}>Total: {product.total}</p>

                                    </div>
                                </div>
                            {/* </div> */}
                        </div>
                    </div>
                    )
                })
                }

                <div>
               
                </div>
            </div>)
    }
}

export default Orders
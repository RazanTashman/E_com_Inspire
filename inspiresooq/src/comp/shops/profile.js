import React from "react"
import shop from "../../images/ShopProfile.png"
import "./shops.css"
import $ from "jquery"
class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shopeName: "",
            phoneNo: "",
            address: ""
        }
    }

    componentDidMount(){
        console.log("connected...")
        let that = this
        $.ajax({
          method: 'GET',
          url: `http://localhost:5000/shop/${localStorage.getItem("id")}`,
          contentType: "application/json",
          headers: {'Authorization':`Bearer ${localStorage.getItem('token')}`},
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




    render() {
        const header = {
            color: "#383530"
        }
return(
    <div>
       
                    <div style={{ marginTop :"15%"}}>
                        <div className="card" style={{ width: "50%" }}>
                            <img className="border border-secondary card-img-top rounded-circle" src={shop} style={{ marginTop:"-30%",marginLeft:"15%", width:"200px", borderColor:"red"}} alt="Profile" />
                            <div className="card-body">
                                <h1 className="card-text" style={header}>{this.state.shopeName}</h1>
                                <br/>
                                <h2 style ={{color:"gray", fontSize :"22px"}}> <b style ={{color:"rgb(92, 91, 91)"}}>Tel:</b> {this.state.phoneNo}</h2>
                                <br/>
                                <h2 style ={{color:"gray", fontSize :"22px"}}> <b style ={{color:"rgb(92, 91, 91)"}} >Address:</b> {this.state.address}</h2>
                               
                            </div>
                        </div>
                    </div>
                
     
        </div>
        )
    }
}

export default Profile
import React from "react"
import shop from "../../images/ShopProfile.png"
import "./shops.css"
import $ from "jquery"
class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }




    render() {
        const header = {
            color: "#383530"
        }
return(
    <div>
       
                    <div style={{ marginTop :"15%"}}>
                        <div className="card" style={{ width: "50%" }}>
                            <img className="border border-secondary card-img-top rounded-circle" src={shop} style={{ marginTop:"-30%",marginLeft:"15%", width:"200px", borderColor:"red"}} alt="Card image cap" />
                            <div className="card-body">
                                <h1 className="card-text" style={header}>{this.props.shopeName}</h1>
                                <br/>
                                <h2 style ={{color:"gray", fontSize :"22px"}}> <b style ={{color:"rgb(92, 91, 91)"}}>Tel:</b> {this.props.phoneNo}</h2>
                                <br/>
                                <h2 style ={{color:"gray", fontSize :"22px"}}> <b style ={{color:"rgb(92, 91, 91)"}} >Email:</b> {this.props.email}</h2>
                                <br/>
                                <h2 style ={{color:"gray", fontSize :"22px"}}> <b style ={{color:"rgb(92, 91, 91)"}} >Address:</b> {this.props.address}</h2>
                               
                            </div>
                        </div>
                    </div>
                
     
        </div>
        )
    }
}

export default Profile
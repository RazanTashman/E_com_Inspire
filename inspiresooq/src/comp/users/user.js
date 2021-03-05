// import React from "react"
// import $ from "jquery"

// class User extends React.Component {
//     constructor() {
//         super()
//         this.state = {}
//     }

//     componentDidMount(){
//         let that = this
//         $.ajax({
//           method: 'GET',
//           url: `http://localhost:5000/categories`,
//           contentType: "application/json",
//           success: function (data) {
//             console.log("dataaaa:", data)

//           },
//           error: function (err) {
//             console.log("err", err)
//             that.setState({ emailError: err.responseText })
//           }
//         })
//     }
   

//     render() {
//         return (
//             <div>
//                 <Nav />
//                 <div className="container" style={{ margin: "8%" }}>
//                     <div className="row">
//                         <div className="col-sm-4" >
//                             <div className="card" onClick={() => this.getShop(1)} >
//                                 <img className="card-img-top" style={{ height: "200px", width: "200px" }} src={shop} alt="Card image cap" />
//                                 <div className="card-body">
//                                     <h1 className="card-text" style={header}>My Shop</h1>
//                                 </div>
//                             </div>
//                         </div>

//                     </div>
//                 </div>

//             </div>
//         )
//     }
// }

// export default User
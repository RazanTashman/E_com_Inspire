import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import $ from "jquery"
import cart from "../../images/cart.png"
// import logo from "./logo.jpg"
function Nav() {

  const [role, setRole] = useState("")
  const [name, sename] = useState("")
  const mystyle = {
    background: "#afacec",
    // position: 'fixed',
    height: '10%',
    width: '100%',

  };

  var pathname = window.location.pathname === "/home" ? true : false

  useEffect(() => {
    $.ajax({
      method: 'GET',
      url: `http://localhost:5000/usertype/${localStorage.getItem("id")}`,
      contentType: "application/json",
      success: function (data) {
        console.log("naaaaaavvvv:", data[0].firstName)
        setRole(data[0].type)
        sename(data[0].firstName)


      },
      error: function (err) {
        console.log("err", err)

      }
    })
  }
  )

  return (



    <div  >
      <nav style={mystyle} className=" navbar  fixed-top ">
        {/* <nav  className="navbar navbar-inverse  "> */}
        <div className="container-fluid">
          <div className="navbar-header">
            <a style={{ marginLeft: "0px", marginTop: "18%", fontWeight: 'bold', color: "white", fontSize: "15px" }} className="active navbar-brand" href={!pathname ? "/user" : "/home"}>Home <span className="sr-only"></span></a>
          </div>


          {role === "shop" &&
            <div className="nav navbar-nav">
              {/* <li className="active"><a href="#">Home</a></li> */}

              {/* <Link to="/user" className="navbar-brand text-white" > <b>Home </b> <span className="sr-only"></span></Link> */}

              <li style={{ marginTop: "-0.3%", fontWeight: 'bold', fontSize: "15px" }} className=" dropdown "><a className="dropdown-toggle text-white" data-toggle="dropdown" href="/home"> Swich account to</a>
                <ul className="dropdown-menu">
                  <li><a href="/user">User</a></li>
                  <li><a href="/home">Shop</a></li>
                </ul>
              </li>
            </div>
          }
          <a className="active navbar-brand" href="/cart" >
            <img style={{ width: "5%" }} src={cart} />
          </a>

          <a style={{ color: "white", fontWeight: 'bold', fontSize: "15px" }} className="active navbar-brand" href="/login" >Welcome {name},</a>
          {/* style={{color:"white", marginLeft:"300px", marginTop:"1%", fontWeight: 'bold', fontSize:"15px"}} */}
          <a style={{ color: "white", marginRight: "1%", fontWeight: 'bold', fontSize: "15px" }} className="active navbar-brand" href="/login" onClick={() => { localStorage.removeItem('token') }}>Sign Out</a>
        </div>
      </nav>
    </div>

  );
}

export default Nav

// pos-f-t

































// import { Link } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import $ from "jquery"
// // import logo from "./logo.jpg"
// function Nav() {

//   const [role,setRole] = useState("")
//     // const mystyle = {
//     //     background: "#5c7f3f",
//     //     position: 'fixed',
//     //     width: '100%',

//     // };

//     var pathname = window.location.pathname === "/home" ? true :false

//     useEffect(()=>{
//       $.ajax({
//         method: 'GET',
//         url: `http://localhost:5000/usertype/${localStorage.getItem("id")}`,
//         contentType: "application/json",
//         success: function (data) {
//           console.log("naaaaaavvvv:", data[0].type)
//           setRole(data[0].type)


//         },
//         error: function (err) {
//           console.log("err", err)

//         }
//       })
//     }
//     )

//     return (



//         <div >

// <nav  className=" navbar navbar-inverse navbar-expand-lg  fixed-top navbar-dark  ">
// {/* <nav  className="navbar navbar-expand-lg  fixed-top navbar-dark  "> */}
    // {/* <Link to="/home" className="navbar-brand" ><img src={logo}  style={{marginTop:"-20px",width:"90px" , height:"60px"}} /></Link> */}

// 		<Link to="/user" className="navbar-brand text-white" > <b>Home </b> <span className="sr-only"></span></Link>
//   	<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
// 		  <span className="navbar-toggler-icon"></span>
// 		</button>
//     {console.log("search",pathname)}
// 		<div className="collapse navbar-collapse" id="navbarText">
// 		  <ul className="navbar-nav mr-auto">
//         	  {role === "shop" &&     

//             <li class="nav-item dropdown">
//             <Link class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//               Dropdown link
//             </Link>
//             <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
//             <Link to="/user" class="dropdown-item" >Action</Link>
//             <Link to="/home" class="dropdown-item" >Another action</Link>
//             </div>
//           </li>
//     }

//      {/* <Link to={pathname ? "/user" : "/home"} className="nav-link" style={{marginLeft:"800px",fontWeight: 'bold', fontSize:"15px"}}> Swich Account</Link> */}

//         <Link to="/login" className="nav-link" style={{marginLeft:"100px",fontWeight: 'bold', fontSize:"15px"}} onClick={() => { localStorage.removeItem('id') }}>Sign Out</Link>

//       </ul>

// 		</div>
// 	  </nav>
//         </div> 

//     );
// }

// export default Nav

// // pos-f-t
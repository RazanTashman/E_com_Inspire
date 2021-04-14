import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import $ from "jquery"
import cart from "../../images/shopping-cart.png"
// import logo from "./logo.jpg"
function Nav() {

  const [role, setRole] = useState("")
  const [name, sename] = useState("")
  const mystyle = {
    // background: "#afacec",
    background: "#6A1B4D",
    // 383CC1
    // position: 'fixed',
    height: '10%',
    width: '100%',

  };

  var pathname = window.location.pathname === "/peofile" ? true : false

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



    <div  className ="fixed-top" >
      <nav style={mystyle} class="navbar navbar-expand-md navbar-dark" >
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <ul class=" navbar-nav">
            <li class="nav-item">
              <a style={{ color: "white",  paddingLeft: "40px", fontWeight: 'bold', fontSize: "15px" }} className="nav-link" >Welcome {name},</a>
            </li>

            <li class="nav-item">
              <a  style={{ color: "white", paddingLeft: "25px", fontSize: "15px" }} className="nav-link" href={!pathname ? "/user" : "/peofile"}>Home <span className="sr-only"></span></a>
            </li>
         
            {/* {localStorage.getItem("type") === "shop" &&    */}
            {role === "shop" &&            
              <li class="nav-item">
                <li style={{ color: "white", paddingLeft: "25px", fontSize: "15px" }} className=" dropdown "><a className="dropdown-toggle text-white nav-link" data-toggle="dropdown" href="/peofile"> Swich account to</a>
                  <ul className="dropdown-menu">
                    <li><a   style={{ fontSize: "15px" }}   href="/user">User</a></li>
                    <li><a   style={{ fontSize: "15px" }}   href="/peofile">Shop</a></li>
                  </ul>
                </li>
              </li>
            }
         
           
            <li class="nav-item">
              <a  style={{ color: "white", paddingLeft: "25px", fontSize: "15px" }} className="nav-link" href={!pathname ? `/orders/${localStorage.getItem("id")}` : `/shop/orders/${localStorage.getItem("id")}`}  >Orders</a>
            </li>

            <li class="nav-item">
              <a  style={{ paddingLeft: "25px" }} className="nav-link" href="/cart" >
                <img  src={cart} />
              </a>
            </li>
          
            {/* <li class="nav-item">
              <a  style={{ color: "white", paddingLeft: "25px", fontSize: "15px" }} className="nav-link" href="/login" onClick={() => { localStorage.removeItem('token') }}>Sign Out</a>
            </li> */}
          </ul>
          
          <ul class="nav navbar-nav navbar-right">
          
            <li >
            {/* style={{ border: "1px solid #ccc", borderRadius: "15px",  background: "white", padding: "10px", marginLeft: "86%", width: "90%", color : "#817ce9" }} */}
            {/* <button  className="butt" style={{ border: "none",  borderRadius: "80px",  textDecoration: "none",   padding: "15px",width: "100%",marginLeft: "800px",  background: "white", color : "#817ce9" }} className="nav-link " href="/login" onClick={() => { localStorage.removeItem('token') }}> <span style={{ paddingRight: "5px" }} class="glyphicon glyphicon-user"></span>Sign Out</button> */}
       
              <a  style={{ color: "white", fontSize: "15px" }} style={{ color: "white", paddingLeft: "25px", fontSize: "15px" }} className="nav-link  text-white" href="/login" onClick={() => { localStorage.removeItem('token') }}> <span style={{ paddingRight: "5px" }} class="glyphicon glyphicon-user"></span>Sign Out</a>
            </li>
            
           
          </ul>
        </div>
      </nav>


      {/* <nav class="navbar fixed-top navbar-expand navbar-light bg-light">
    <ul class="navbar-nav">
        <li class="nav-item-active">
            <a class="nav-link" href="#/">Home<span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#/product">Products</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#/services">Services</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#/career">Career</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#/contact">Contact Us</a>
        </li>
    </ul>
</nav> */}
{/* 

      <nav style={mystyle} class="navbar navbar-expand-md navbar-dark">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a style={{ color: "white", paddingLeft: "25px", fontSize: "15px" }} className="nav-link  text-white" href="/admin/categories" > Categories  </a>
            </li>
            <li class="nav-item">
              <a style={{ color: "white", paddingLeft: "25px", fontSize: "15px" }} className="nav-link  text-white" href="/admin/addcategories" > Add Category   </a>
            </li>
            <li class="nav-item">
              <a style={{ color: "white", paddingLeft: "25px", fontSize: "15px" }} className="nav-link  text-white" href="/admin/addsubcategories" > Add Subcategory   </a>
            </li>
          </ul>
          <ul class="navbar-right">
            <li >
              <a style={{ color: "white", paddingLeft: "25px", fontSize: "15px" }} className="nav-link  text-white" href="/login" onClick={() => { localStorage.removeItem('token') }}> <span style={{ paddingRight: "5px" }} class="glyphicon glyphicon-user"></span>Sign Out</a>
            </li>
          </ul>
        </div>
      </nav> */}






    </div>

  );
}

export default Nav

// pos-f-t












// <nav style={mystyle} className=" navbar  fixed-top ">
// {/* <nav  className="navbar navbar-inverse  "> */}
// <div className="container-fluid">
// <a style={{ color: "white", fontWeight: 'bold', fontSize: "15px" }} className="active navbar-brand" >Welcome {name},</a>
//   <div className="navbar-header">
//     <a style={{ marginLeft: "0px", marginTop: "18%", fontWeight: 'bold', color: "white", fontSize: "15px" }} className="active navbar-brand" href={!pathname ? "/user" : "/home"}>Home <span className="sr-only"></span></a>
//   </div>


//   {role === "shop" &&
//     <div className="nav navbar-nav">
//       {/* <li className="active"><a href="#">Home</a></li> */}

//       {/* <Link to="/user" className="navbar-brand text-white" > <b>Home </b> <span className="sr-only"></span></Link> */}

//       <li style={{ marginTop: "-0.3%", fontWeight: 'bold', fontSize: "15px" }} className=" dropdown "><a className="dropdown-toggle text-white" data-toggle="dropdown" href="/home"> Swich account to</a>
//         <ul className="dropdown-menu">
//           <li><a href="/user">User</a></li>
//           <li><a href="/home">Shop</a></li>
//         </ul>
//       </li>
//     </div>
//   }

//   <a  className="active navbar-brand" style={{ marginTop: "1.3%", fontWeight: 'bold', fontSize: "15px", color:"white" }} href={!pathname ? `/orders/${localStorage.getItem("id")}` :`/shop/orders/${localStorage.getItem("id")}`}  >Orders</a>

//   <a className="active navbar-brand" href="/cart" >
//     <img style={{ width: "5%" }} src={cart} />
//   </a>
//   {/* style={{color:"white", marginLeft:"300px", marginTop:"1%", fontWeight: 'bold', fontSize:"15px"}} */}
//   <a style={{ color: "white", marginRight: "1%", fontWeight: 'bold', fontSize: "15px" }} className="active navbar-brand" href="/login" onClick={() => { localStorage.removeItem('token') }}>Sign Out</a>
// </div>
// </nav>





















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
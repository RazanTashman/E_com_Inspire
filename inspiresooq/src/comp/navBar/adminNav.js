import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import $ from "jquery"
import cart from "../../images/cart.png"
// import logo from "./logo.jpg"
function AdminNav() {

  const [role, setRole] = useState("")
  const [name, sename] = useState("")
  const mystyle = {
    background: "#6A1B4D",
    // position: 'fixed',
    height: '8%',
    width: '100%',
  };

  var pathname = window.location.pathname === "/peofile" ? true : false
  function clicked(target) {
    console.log("target:",target)
  //  var x = $("#"+target+"")
  //  console.log("x:",x)
  //  x.style.background ="blue"
   
    var but = document.getElementById(target+"")
    console.log("but:",but)
        but.style.color = "gray"
        but.style.background="rgb(241, 237, 237)"
  }

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
      <nav style={mystyle} className ="navbar navbar-expand-md navbar-dark fixed-top">
        <button className ="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
          <span className ="navbar-toggler-icon"></span>
        </button>
        <div className ="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className ="navbar-nav">
            <li className ="nav-item">
              <a id ="Categories" onClick={()=>clicked} style={{ color: "white", paddingLeft: "25px", fontSize: "15px" }} className ="nav-link  text-white" href="/admin/categories" > Categories  </a>
            </li>
            <li className ="nav-item">
              <a id ="Category" onClick={()=>clicked} style={{ color: "white", paddingLeft: "25px", fontSize: "15px" }} className ="nav-link  text-white" href="/admin/addcategories" > Add Category   </a>
            </li>
            <li className ="nav-item">
              <a id ="Subcategory" onClick={()=>clicked} style={{ color: "white", paddingLeft: "25px", fontSize: "15px" }} className ="nav-link  text-white" href="/admin/addsubcategories" > Add Subcategory   </a>
            </li>
          </ul>
          <ul className ="navbar-right">
            <li >
              <a style={{ color: "white", paddingLeft: "25px", fontSize: "15px" }} className ="nav-link  text-white" href="/login" onClick={() => { localStorage.removeItem('token') }}> <span style={{ paddingRight: "5px" }} className ="glyphicon glyphicon-user"></span>Sign Out</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* 

      <nav className ="navbar navbar-expand-md bg-dark navbar-dark">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="collapsibleNavbar">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>    
    </ul>
  </div>  
</nav> */}



      {/* <nav>
        <a class="navbar-brand" href="#home">Home</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#about">About <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#history"> History</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#experience">Experience</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#project">My Work</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#footer">Contact</a>
            </li>
          </ul>

		</div>
      </nav> */}



    </div >

  );
}

export default AdminNav

// pos-f-t



















// <nav style={mystyle} className=" navbar  fixed-top ">
// {/* <nav  className="navbar navbar-inverse  "> */}
// <div className="container-fluid">
//   <div className="navbar-header">
//     <a style={{ marginLeft: "0px", marginTop: "18%", fontWeight: 'bold', color: "white", fontSize: "15px" }} className="active navbar-brand" href={!pathname ? "/user" : "/home"}>Home <span className="sr-only"></span></a>
//   </div>
//   {/* <a style={{ color: "white", fontWeight: 'bold', fontSize: "15px" }} className="active navbar-brand" >Welcome to admin panel</a> */}
//   <a style={{ color: "white", fontWeight: 'bold', fontSize: "15px" }} className="active navbar-brand" href="/admin/categories" > Categories  </a>
//   <a style={{ color: "white", fontWeight: 'bold', fontSize: "15px" }} className="active navbar-brand" href="/admin/addcategories" > Add Category   </a>
//   <a style={{ color: "white", fontWeight: 'bold', fontSize: "15px" }} className="active navbar-brand" href="/admin/addsubcategories" > Add Subcategory   </a>
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
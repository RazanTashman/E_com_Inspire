import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import $ from "jquery"
// import logo from "./logo.jpg"
function Nav() {

  const [role,setRole] = useState("")
    const mystyle = {
        background: "#5c7f3f",
        position: 'fixed',
        width: '100%',

    };

    var pathname = window.location.pathname === "/home" ? true :false

    useEffect(()=>{

  
      var that = this
      $.ajax({
        method: 'GET',
        url: `http://localhost:5000/usertype/${localStorage.getItem("id")}`,
        contentType: "application/json",
        success: function (data) {
          console.log("naaaaaavvvv:", data[0].type)
          setRole(data[0].type)
          // that.setState({ products: data })
   
        },
        error: function (err) {
          console.log("err", err)
          // that.setState({ emailError: err.responseText })
        }
      })
    }
    )

    return (



        <div >

<nav  style ={mystyle} className="navbar navbar-expand-lg pos-f-t  navbar-dark  navbar fixed-top ">
    {/* <Link to="/home" className="navbar-brand" ><img src={logo}  style={{marginTop:"-20px",width:"90px" , height:"60px"}} /></Link> */}
    
		<Link to="/user" className="navbar-brand text-white" > <b>Home </b> <span className="sr-only"></span></Link>
  	<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
		  <span className="navbar-toggler-icon"></span>
		</button>
    {console.log("search",pathname)}
		<div className="collapse navbar-collapse" id="navbarText">
		  <ul className="navbar-nav mr-auto">
        	  {role === "shop" &&     
            
      <Link to={pathname ? "/user" : "/home"} className="nav-link" style={{marginLeft:"100px",fontWeight: 'bold', fontSize:"15px"}}> Swich Account</Link>
    }
  
              
    


        <Link to="/login" className="nav-link" style={{marginLeft:"1000px",fontWeight: 'bold', fontSize:"15px"}} onClick={() => { localStorage.removeItem('id') }}>Sign Out</Link>
	
      </ul>
		  
		</div>
	  </nav>
        </div> 

    );
}

export default Nav;
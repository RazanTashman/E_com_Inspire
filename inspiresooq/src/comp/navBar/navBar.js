import { Link } from 'react-router-dom';
// import logo from "./logo.jpg"
function Nav() {
    const mystyle = {
        background: "#5c7f3f",
        position: 'fixed',
        width: '100%',

    };
   

    return (



        <div >

<nav  style ={mystyle} class="navbar navbar-expand-lg pos-f-t  navbar-dark  navbar fixed-top ">
    {/* <Link to="/home" className="navbar-brand" ><img src={logo}  style={{marginTop:"-20px",width:"90px" , height:"60px"}} /></Link> */}
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
		  <span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarText">
		  <ul class="navbar-nav mr-auto">
			<li class="nav-item active">
                <Link to="/" className="nav-link" style={{marginLeft:"1000px",fontWeight: 'bold', fontSize:"15px"}} onClick={() => { localStorage.removeItem('token') }}>Sign Out</Link>
			</li>
		  </ul>
		  
		</div>
	  </nav>
        </div> 

    );
}

export default Nav;
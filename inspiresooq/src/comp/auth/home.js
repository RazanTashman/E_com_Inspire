import Nav from "../navBar/unauthNavbar"
function HomeAuth() {
  return (
    <div  >
    <Nav/>
	<div className="text-box" style ={{marginTop:"13%" , marginLeft:"-8%" , display: "flex",  justifyContent: "center" }}>
		<h1 style= {{fontSize:" 8vw","fontWeight": 900,	backgroundColor: "#000", color: "#fff"}}> Inspire</h1>
		<h1 style ={{fontSize:" 8vw","fontWeight": 900,position: "absolute",backgroundColor: "#fff",color:" #000",clipPath: "inset(-1% -1% 49% -1%)"}}> Inspire</h1>
        <p style ={{position: "absolute", color:"white",fontSize:" 1vw", marginTop: "8em",  marginLeft: "20.5em"	}} > Sooq </p>

	</div>
		<p style ={{fontSize:" 2vw",fontWeight: "900", marginLeft:"21.5%",fontFamily: 'Lobster', color: "#6A1B4D",	textAlign: "center"}} > One-Stop-Shop Website</p>
        {/* <p style ={{fontSize:" 2vw",fontWeight: "900", color:"white", background:"#6A1B4D ", marginLeft:"41.5%",width:"30%",fontFamily: 'Lobster',	textAlign: "center"}} > Yone-stop-shop website  </p> */}
    </div>

  );
}

export default HomeAuth
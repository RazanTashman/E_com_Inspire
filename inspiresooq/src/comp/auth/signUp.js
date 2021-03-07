import React from "react"
import $ from "jquery"
import { Redirect } from 'react-router-dom'
class signUp extends React.Component {
  constructor() {
    super()
    this.state = {
      fName: "",
      lName: "",
      shopName: "",
      phoneNo: "",
      address: "",
      email: "",
      password: "",
      emailShop: "",
      passwordShop: "",
      formType: true,

      fNameError: "",
      lNameError: "",
      shopNameError: "",
      phoneNoError: "",
      addressError: "",
      emailError: "",
      passwordError: "",
      emailErrorShop: "",
      passwordErrorShop: "",

      redirect: false,
    }
  }

  validationShops(e) {

    if (this.state.shopName === "")
      this.state.shopNameError = "Shop Name Is Required"
    if (this.state.phoneNo === "")
      this.state.phoneNoError = "Phone Number Is Required"
    if (this.state.address === "")
      this.state.addressError = "Address Number Is Required"
    if (this.state.emailShop === "")
      this.state.emailErrorShop = "Email Is Required"
    if (this.state.passwordShop === "")
      this.state.passwordErrorShop = "Password Is Required"
    if (!this.state.emailShop.includes("@") && this.state.emailShop !== "")
      this.state.emailErrorShop = "invalid email"
    if (this.state.passwordShop.length < 8 && this.state.passwordShop !== "")
      this.state.passwordErrorShop = "Password must be longer than 8 characters"
    if (this.state.shopNameError || this.state.phoneNoError || this.state.addressError || this.state.emailErrorShop || this.state.passwordErrorShop)
      this.setState({ shopNameError: this.state.shopNameError, phoneNoError: this.state.phoneNoError, addressError: this.state.addressError, emailErrorShop: this.state.emailErrorShop, passwordErrorShop: this.state.passwordErrorShop })
    else {
      e.preventDefault();
      this.signUp("shop", this.state.emailShop, this.state.passwordShop)
      // this.signUpShop(e)
    }

  }

  validation(e) {
    //  if(this.state.fName === "")

    if (this.state.fName === "")
      this.state.fNameError = "First Name Is Required"
    if (this.state.lName === "")
      this.state.lNameError = "Last Name Is Required"
    if (this.state.email === "")
      this.state.emailError = "Email Is Required"
    if (this.state.password === "")
      this.state.passwordError = "Password Is Required"
    if (!this.state.email.includes("@") && this.state.email !== "")
      this.state.emailError = "invalid email"
    if (this.state.password.length < 8 && this.state.password !== "")
      this.state.passwordError = "Password must be longer than 8 characters"
    if (this.state.fNameError || this.state.lNameError || this.state.emailError || this.state.passwordError)
      this.setState({ fNameError: this.state.fNameError, lNameError: this.state.lNameError, emailError: this.state.emailError, passwordError: this.state.passwordError })
    else {
      e.preventDefault();
      this.signUp("user", this.state.email, this.state.password)
    }
  }


  signUpShop() {
    let data = {
      shopName: this.state.shopName,
      phoneNo: this.state.phoneNo,
      address: this.state.address,
      email: this.state.emailShop,
      password: this.state.passwordShop
    }
    var that = this
    $.ajax({
      method: 'POST',
      url: 'http://localhost:5000/shop/signup',
      data: JSON.stringify(data),
      contentType: "application/json",
      success: function (data) {

        if (data.length !== 0)
          that.setState({ emailErrorShop: "Email already in use " })
        else
          that.setState({
            redirect: true
          })
      },
      error: function (err) {
        console.log("err", err)
        that.setState({ emailError: err.responseText })
      }
    })

  }

  signUp(type, email, password) {
    let data = {
      shopName: this.state.shopName,
      phoneNo: this.state.phoneNo,
      address: this.state.address,
      fName: this.state.fName,
      lName: this.state.lName,
      password: password,
      email: email,
      type: type,
    }
    var that = this
    $.ajax({
      method: 'POST',
      url: 'http://localhost:5000/registration',
      data: JSON.stringify(data),
      contentType: "application/json",
      success: function (data) {

        if (data.length !== 0)
          that.setState({ emailError: "Email already in use " })
        else
          that.setState({
            redirect: true
          })


      },
      error: function (err) {
        console.log("err", err)
        that.setState({ emailError: err.responseText })
      }
    })

  }
  getTheInfo(event) {
    this.setState({ [event.target.name]: event.target.value })
    console.log(event.target.name, this.state.email)
    if (event.target.name === "fName")
      this.state.fNameError = ""
    if (event.target.name === "lName")
      this.state.lNameError = ""
    if (event.target.name === "email")
      this.state.emailError = ""
    if (event.target.name === "password")
      this.state.passwordError = ""
    if (event.target.name === "emailShop")
      this.state.emailErrorShop = ""
    if (event.target.name === "passwordShop")
      this.state.passwordErrorShop = ""
    if (event.target.name === "shopName")
      this.state.shopNameError = ""
    if (event.target.name === "phoneNo")
      this.state.phoneNoError = ""
    if (event.target.name === "address")
      this.state.addressError = ""

  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/login' />
    }
  }
  render() {
    return (
      <div>
        <div className="container" >
          <div className="row">
            <div className="col-sm-6" style={{ marginTop: "20%", fontSize: "15px", color: "#304f30" }}>

              <input type="radio" id="user" name="gender" value="user" onChange={() => { this.setState({ formType: true }) }} />
              <label for="user">Register as a user</label><br />
              <input type="radio" id="shop" name="gender" value="shop" onChange={() => { this.setState({ formType: false }) }} />
              <label for="shop">Register as a shop</label>
            </div>



            <div className="col-sm-6">
              {this.state.formType ?
                <form className="FORM">
                  <div className="form-group">
                    <input type="fName" className="form-control" placeholder="First Name" name="fName" required="required" onChange={(e) => this.getTheInfo(e)} />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.fNameError}
                    </div>
                  </div>

                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Last Name" name="lName" required="required" onChange={(e) => this.getTheInfo(e)} />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.lNameError}
                    </div>
                  </div>

                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Email" name="email" required="required" onChange={(e) => this.getTheInfo(e)} />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.emailError}
                    </div>
                  </div>


                  <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" name="password" required="required" onChange={(e) => this.getTheInfo(e)} />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.passwordError}
                    </div>
                  </div>
                  <br />

                  <div className="form-group">
                    {this.renderRedirect()}
                    <button type="button" style={{ fontWeight: 'bold', fontSize: "22px" }} className="butt   btn-lg text-white " onClick={(e) => this.validation(e)}>Sign Up</button>
                  </div>

                </form>


                :

                <form className="FORM">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Shop Name" name="shopName" required="required" onChange={(e) => this.getTheInfo(e)} />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.shopNameError}
                    </div>
                  </div>

                  <div className="form-group">
                    <input type="email" className="form-control" placeholder="Email" name="emailShop" required="required" onChange={(e) => this.getTheInfo(e)} />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.emailErrorShop}
                    </div>
                  </div>

                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Phone Number" name="phoneNo" required="required" onChange={(e) => this.getTheInfo(e)} />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.phoneNoError}
                    </div>
                  </div>

                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Shope Address" name="address" required="required" onChange={(e) => this.getTheInfo(e)} />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.addressError}
                    </div>
                  </div>

                  <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" name="passwordShop" required="required" onChange={(e) => this.getTheInfo(e)} />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.passwordErrorShop}
                    </div>
                  </div>
                  <br />

                  <div className="form-group">
                    {this.renderRedirect()}
                    <button type="button" style={{ fontWeight: 'bold', fontSize: "22px" }} className="butt   btn-lg text-white " onClick={(e) => this.validationShops(e)}>Sign Up</button>
                  </div>

                </form>
              }
            </div>


          </div>
        </div>
      </div>
    )
  }
}

export default signUp
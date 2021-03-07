import React from "react"
import $ from "jquery"
class login extends React.Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
      emailError: "",
      error: "",
      passwordError: "",
      redirect: false

    }
  }

  getTheInfo(event) {

    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name === "email")
      this.state.emailError = ""
    if (event.target.name === "password")
      this.state.passwordError = ""
  }

  submit() {

    // e.preventDefault();
    if (!this.state.email) {
      this.setState({ emailError: "Email required " });

    }
    if (!this.state.password) {
      this.setState({ passwordError: "Password required " });
    }
    else {

      var data = {
        email: this.state.email,
        password: this.state.password,

      }
      var that = this
      $.ajax({
        method: 'POST',
        url: 'http://localhost:5000/signin',
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function (data) {
          console.log("data", data)

          if (data.length === 0)
            that.setState({ error: "Inavlid Registration " });
          // localStorage.setItem('token', data.token)
          else {
            localStorage.setItem('id', data[0].userId)
            if(data[0].type === "shop")
              window.location = '/home';
            else
             window.location = '/user';
          }


        },
        error: function (err) {
          console.log("err", err)
        }
      })
    }
  }

  render() {
    return (
      <div>
        <form className="FORM">
          <div class="form-group">
            <br /><br />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.error}
            </div>
            <input type="email" class="form-control" placeholder="Email" name="email" required="required" onChange={(e) => this.getTheInfo(e)} />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.emailError}
            </div>
          </div>
          <br />

          <div class="form-group">
            <input type="password" class="form-control" placeholder="Password" name="password" required="required" onChange={(e) => this.getTheInfo(e)} />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.passwordError}
            </div>
          </div>
          <br />

          <div class="form-group">
            <button type="button" style={{ fontWeight: 'bold', fontSize: "22px", width: "500px" }} className="butt btn-lg text-white " onClick={() => this.submit()}>Log In</button>
          </div>

        </form>

      </div>
    )
  }
}

export default login
import React from "react"
import $ from "jquery"
import { Redirect } from 'react-router-dom'
import Nav from '../navBar/unauthNavbar'
class OTP extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            otp: "",
            password: "",
            confirmPassword: "",
            realOtp: "",

            otpError: "",
            passwordError: "",
            confirmPasswordError: "",

            redirect: false
        }
    }

    componentDidMount() { //, password
        console.log("localStorage",localStorage.getItem("id"))
        var that = this
        $.ajax({
            method: 'POST',
            data: JSON.stringify({id:localStorage.getItem("id")}),
            url: 'http://localhost:5000/pwdverification',
            contentType: "application/json",
            success: function (data) {
                console.log("datadatadata", data)
                that.setState({ realOtp: data})
            },
            error: function (err) {
                console.log("err", err)
                that.setState({ emailError: err.responseText })
            }
        })

    }

    
    Confirm() { //, password
        let data = {
           
            password: this.state.password,
            userId: localStorage.getItem("id")
            
        }

        console.log("realOtp:",this.state.realOtp[0].password,"otp:",this.state.otp)
        if (this.state.realOtp[0].password == this.state.otp ){

        var that = this
        $.ajax({
            method: 'POST',
            url: 'http://localhost:5000/confirmation',
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function () {
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
    else
        this.setState({otpError:"invalid verification code"})
    }





    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/login' />
        }
    }
    validation(e) {
        //  if(this.state.fName === "")

        if (this.state.otp === "")
            this.state.otpError = "Required Field"
        if (this.state.password === "")
            this.state.passwordError = "Required Field"
        if (this.state.confirmPassword === "")
            this.state.confirmPasswordError = "Required Field"
        if (this.state.password.length < 8 && this.state.password !== "")
            this.state.passwordError = "Password must be longer than 8 characters"
        if (this.state.confirmPassword !== this.state.password)
            this.state.confirmPasswordError = "confirm password doesn't match "
        if (this.state.otpError || this.state.passwordError || this.state.confirmPasswordError)
            this.setState({ otpError: this.state.otpError, passwordError: this.state.passwordError, confirmPasswordError: this.state.confirmPasswordError })
        else {
            e.preventDefault();
            this.Confirm()
        }
    }


    getTheInfo(event) {
        this.setState({ [event.target.name]: event.target.value })
        console.log(event.target.name, this.state.email)
        if (event.target.name === "otp")
            this.state.otpError = ""
        if (event.target.name === "password")
            this.state.passwordError = ""
        if (event.target.name === "confirmPassword")
            this.state.confirmPasswordError = ""
    }
    render() {
        return (
            <div>
                 <Nav/>
                <form className="FORM">
                    <h5> please check yor email for OTP</h5>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Verification Password" name="otp" required="required" onChange={(e) => this.getTheInfo(e)} />
                        <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.otpError}
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" name="password" required="required" onChange={(e) => this.getTheInfo(e)} />
                        <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.passwordError}
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Confirm Password " name="confirmPassword" required="required" onChange={(e) => this.getTheInfo(e)} />
                        <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.confirmPasswordError}
                        </div>
                    </div>
                    <br />

                    <div className="form-group">
                        {this.renderRedirect()}
                        <button type="button" style={{ fontWeight: 'bold', fontSize: "22px" }} className="butt   btn-lg  " onClick={(e) => this.validation(e)}>Confirm</button>
                    </div>
                    <a href='/login'> </a>
                </form>

            </div>
        )
    }
}

export default OTP
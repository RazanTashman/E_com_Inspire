import React from "react"
import $ from "jquery"
import Nav from '../navBar/adminNav'
import { storage } from '../shops/firebase.';

class EditCat extends React.Component {
    constructor() {
        super()
        this.state = {
            category: "",
            image: "",


        }
    }
    componentDidMount(){
        let that = this
        $.ajax({
            method: 'GET',
            url: `http://localhost:5000/categories/${localStorage.getItem("cat")}`,
            contentType: "application/json",
            success: function (data) {
                console.log("dataaacca:", data)
                that.setState({
                    category: data[0].category,
                    image: data[0].catImage
                })
                // that.getSubcat(that.state.catId)
            },
            error: function (err) {
                console.log("err", err)
                that.setState({ emailError: err.responseText })
            }
        })
    }

    getTheInfo(event) {
        var that = this
        if (event.target.name !== "image") {
            this.setState({ [event.target.name]: event.target.value });
            console.log([event.target.name], event.target.value)
        }
        else {

            console.log("image::::::::", event.target.files[0].name)
            var blob = event.target.files[0]
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {

                var base64String = reader.result;
                var n = base64String.indexOf("base64,") + 7;
                base64String = reader.result.substr(n);
                console.log("base64String", base64String)
                const data = window.atob(base64String)
                console.log("atob", data)
                const buf = new Uint8Array(data.length);
                for (let i = 0; i < data.length; i++) {
                    buf[i] = data.charCodeAt(i);
                }
                console.log("buf", buf)
                that.uploadBytes(buf, event.target.files[0].name)
            }
        }
    }

    uploadBytes(bytes, name) {
        const uploadTask = storage.ref(`images/${name}`).put(bytes).then((data) => {
            console.log("data", data);
            data.ref.getDownloadURL().then(url => {
                console.log("url", url)
                this.setState({ image: url })
            })
        })
    }

    edit() {
        var data = {
            category: this.state.category,
            image: this.state.image,
        }
        console.log("image:::", this.state.image)
        var that = this
        $.ajax({
            method: 'PUT',
            data: JSON.stringify(data),
            url: `http://localhost:5000/categories/${localStorage.getItem('cat')}`,
            contentType: "application/json",
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            success: function (data) {
                console.log("dataaaa:", data)
                window.location ='/admin/categories'
            },
            error: function (err) {
                console.log("err", err)
                that.setState({ emailError: err.responseText })
            }
        })



    }

    render() {
        return (
            <div>
                <Nav/>
                {/* 645deb */}
                <h1 style={{ width: "100%", marginTop: "3.75%", padding: "0.6%", fontFamily: 'Lobster', color: "#6A1B4D", textAlign: "center", backgroundColor: "#ccc" }} > Welcome to admin panel </h1>

                <form style={{ marginTop: "8%", marginLeft: "30%", width: "40%" }} className="FORM">
                    <div className="form-group">
                        <input style={{ height: "35px" }} value ={this.state.category} type="text" className="form-control" placeholder="Category Name" name="category" required="required" onChange={(e) => this.getTheInfo(e)} />
                    </div>
                    <br />

                    <div className="custom-file">
                        <input style={{ height: "50px" }} type="file"   className="custom-file-input" id="customFile" required="required" name="image" onChange={(e) => this.getTheInfo(e)} />
                        <label className="custom-file-label" for="customFile">Pick Image</label>
                    </div>
                    <br />  <br />

                    <button type="button" onClick={this.edit.bind(this)} style={{ fontWeight: 'bold', fontSize: "22px" }} className=" butt btn-lg  "> Edit </button>
                </form>
            </div>
        )
    }
}

export default EditCat
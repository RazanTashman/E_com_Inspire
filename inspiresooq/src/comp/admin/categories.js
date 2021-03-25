import React from "react"
import $ from "jquery"
import Nav from '../navBar/adminNav'
import Edit from '../../images/edit.png'
import Delete from '../../images/delete.png'
class AddCat extends React.Component {
    constructor() {
        super()
        this.state = {
            categories: [],
            allSubcats: [],

        }
    }




    componentDidMount() {
        let that = this


        $.ajax({
            method: 'GET',
            url: `http://localhost:5000/categories`,
            contentType: "application/json",
            success: function (data) {
                console.log("categories:", data)
                that.setState({
                    categories: data
                })

            },
            error: function (err) {
                console.log("err", err)
                that.setState({ emailError: err.responseText })
            }
        })


        $.ajax({
            method: 'GET',
            url: `http://localhost:5000/subcategories`,
            contentType: "application/json",
            success: function (data) {
                console.log("allSubcats:", data)
                that.setState({
                    allSubcats: data
                })

            },
            error: function (err) {
                console.log("err", err)
                that.setState({ emailError: err.responseText })
            }
        })


    }

    // getSubcats(catId){
    //     let that = this
    //     $.ajax({
    //         method: 'GET',
    //         url: `http://localhost:5000/subcategories/${catId}`,
    //         contentType: "application/json",
    //         success: function (data) {
    //             console.log("subbbb:", data)
    //             that.setState({
    //                 subcats: data
    //             })
    //         },
    //         error: function (err) {
    //             console.log("err", err)
    //             that.setState({ emailError: err.responseText })
    //         }
    //     })

    // }
    render() {
        this.count = 1
        return (
            <div>
                <Nav />
                <h1 style={{ width: "100%", marginTop: "3.75%", padding: "0.6%", fontFamily: 'Lobster', color: "#645deb", textAlign: "center", backgroundColor: "#ccc" }} onClick={() => this.storeInfo()} > Welcome to admin panel </h1>
                <table style={{ marginTop: "5%" }} class="table table-striped">
                    {/* <table className="table" style={{ marginTop: "10%", width: "90%", marginLeft: "3%" }}> */}
                    <thead style={{ background: "#rgb(241, 241, 241)", color: "#817ce9" }}>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" style={{ width: "15%" ,alignItems: 'center' }}>Category</th>
                            <th scope="col"  style={{  width: "15%" ,marginLeft:"14%", float: "left" }} >Subcategories</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {console.log("JSX:",this.state.products)} */}

                        {this.state.categories.map((category) => {
                            // { this.getSubcats(category.catId)}
                            return (
                                <tr>
                                    <th style={{ color: "#817ce9", width: "3%" }} scope="row">{this.count++}</th>
                                    
                                    <td  style={{ width: "3%", textAlign: "center"}}>
                                    <div style={{marginLeft:"30%"}}>
                                        {category.category}
                                        <img src={Edit} data-placement="bottom" title="Edit" style={{ cursor: "pointer", width: "3.7%", marginRight:"50%",marginLeft:"3%", float: "right" }} className={category.catId} onClick={() => { this.edit(category.catId) }} />
                                        <img src={Delete} data-placement="bottom" title="Delete" style={{ cursor: "pointer", width: "3.7%", float: "right" }} className={category.catId} onClick={() => { this.delete(category.catId) }} />
                                        </div>
                                    </td>
                                    
                                    <td>
                                        <ul>

                                            {this.state.allSubcats.filter(subcats => category.catId === subcats.catId).map(subcat => {
                                                return (
                                                    <div style={{marginLeft:"10%"}} >
                                                        <li  style={{ }} >{subcat.subCat}
                                                            <img src={Edit} data-placement="bottom" title="Edit" style={{ cursor: "pointer", width: "2.8%",  marginRight:"75%",marginLeft:"3%", float: "right" }} className={subcat.subCat} onClick={() => { this.edit(subcat.subCat) }} />
                                                            <img src={Delete} data-placement="bottom" title="Delete" style={{ cursor: "pointer", width: "2.8%" , float: "right" }} className={subcat.subCat} onClick={() => { this.delete(subcat.subCat) }} />
                                                        </li>
                                                    </div>
                                                )

                                            }
                                            )}
                                        </ul>
                                    </td>
                                </tr>
                            )
                        })
                        }

                    </tbody>
                </table>
            </div>
        )
    }
}

export default AddCat




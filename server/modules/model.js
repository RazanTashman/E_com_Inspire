const con = require('../db/db')

module.exports = {

  signUp: (data, callback) => {
    var myQuery = `SELECT userId FROM users WHERE email = '${data[2]}' `
    con.query(myQuery, (error, result) => {
      console.log("result", result)
      if (result.length === 0) {
        var myQuery2 = "INSERT INTO users (firstName, lastName, email, password,type) VALUES (?,?,?,?,?) "
        con.query(myQuery2, data, (error, result2) => {
          console.log("not exist")
        })
      }
      callback(error, result)

    })
  },


  signUpShop: (user, shop, callback) => {
    var myQuery = `SELECT userId FROM users WHERE email = '${user[0]}' `
    con.query(myQuery, (error, result) => {
      console.log("result", result)
      if (result.length === 0  && user[0] !== "") {
        var myQuery2 = "INSERT INTO users (email, password,type) VALUES (?,?,?) "
        callback(error, result)
        con.query(myQuery2, user, (error, result2) => {
          console.log("not exist11", result2)
          // shopId, shopeName, address, userId
          var myQuery3 = `INSERT INTO shops (shopeName, phoneNo, address, userId) VALUES (?,?,?,${result2.insertId}) `
          con.query(myQuery3, shop, (error, result3) => {
            console.log("not exist22222")
          })
        })
      }
      

    })
  },

  signIn: (user, callback) => {
    var myQuery = `SELECT userId FROM users WHERE email = '${user[0]}' AND password = '${user[1]}' `
    con.query(myQuery, (error, result) => {
      console.log("result", result)
      callback(error, result)

    })
  },
  // productId, , , productscol, , , 
  addProduct: (data, id, callback) => {

    var myQuery1 = `SELECT shopId FROM shops WHERE userId = '${id}' `
    con.query(myQuery1, (error, result1) => {
      console.log("result", result1)
      data[5] = result1[0].shopId
      var myQuery = `INSERT INTO products (productName, price, categories, description, image, shopId) VALUES (?,?,?,?,?,?) `
      con.query(myQuery, data, (error, result) => {
        callback(error, result)
      })
    })
  },

  getAllProduct: (callback) => {
    var myQuery = "SELECT * FROM products"
    con.query(myQuery, (error, result) => {
      callback(error, result)
    })
  },

  getShopProduct: (id, callback) => {

    var myQuery = `SELECT shopId FROM shops WHERE userId = ${id} `
    con.query(myQuery, (error, result) => {

      var myQuery2 = ` SELECT * FROM products WHERE shopId = ${result[0].shopId} `
      con.query(myQuery2, (error, result1) => {
        console.log("result", result1)
        callback(error, result1)
      })
    })
  },

  shopDetails: (id, callback) => {
    var myQuery1 = `SELECT shopId FROM shops WHERE userId = ${id} `
    con.query(myQuery1, (error, result1) => {
      var myQuery = ` SELECT * FROM shops WHERE shopId = ${result1[0].shopId}`
      con.query(myQuery, (error, result) => {
        callback(error, result)
      })
    })
  },

  getOneProduct: (id, callback) => {
    var myQuery = ` SELECT * FROM products WHERE productId = ${id}`
    con.query(myQuery, (error, result) => {
      callback(error, result)
    })
  },

  getCategories: (id, callback) => {
    var myQuery = ` SELECT * FROM categories`
    con.query(myQuery, (error, result) => {
      callback(error, result)
    })
  },

  editProduct: (data, id, callback) => {
    var myQuery = ` UPDATE  products SET productName = ?, price = ?, categories = ?, description = ?, image = ? WHERE productId = ${id}`
    con.query(myQuery, data, (error, result) => {
      callback(error, result)
    })
  },

  deletProduct: (id, callback) => {
    var myQuery = ` DELETE FROM products WHERE productId= ${id}`
    con.query(myQuery, (error, result) => {
      callback(error, result)
    })
  },


}

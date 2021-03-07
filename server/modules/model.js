const con = require('../db/db')

module.exports = {
  registration: async (user, shop, callback) => {
    var myQuery = await `SELECT userId FROM users WHERE email = '${user[0]}' `
    con.query(myQuery, (error, result) => {
      callback(error, result)
      console.log("result", result)
      if (result.length === 0  && user[0] !== "") {
        var myQuery2 =  "INSERT INTO users (email, password,type) VALUES (?,?,?) "
        
        con.query(myQuery2, user, async (error, result2) => {
          console.log("not exist11", result2)
          // shopId, shopeName, address, userId
          var myQuery3 = await `INSERT INTO shops (shopeName, phoneNo, address, userId) VALUES (?,?,?,${result2.insertId}) `
          con.query(myQuery3, shop, (error, result3) => {
            console.log("not exist22222")
          })
        })
      }
      

    })
  },
  signIn: async (user, callback) => {
    var myQuery = await `SELECT userId,type FROM users WHERE email = '${user[0]}' AND password = '${user[1]}' `
    con.query(myQuery, (error, result) => {
      console.log("result", result)
      callback(error, result)

    })
  },
  // productId, , , productscol, , , 
  addProduct: async (data, id, callback) => {

    var myQuery1 = await `SELECT shopId FROM shops WHERE userId = '${id}' `
    con.query(myQuery1, async (error, result1) => {
      console.log("result", result1)
      data[5] = result1[0].shopId
      var myQuery = await `INSERT INTO products (productName, price, categories, description, image, shopId) VALUES (?,?,?,?,?,?) `
      con.query(myQuery, data, (error, result) => {
        callback(error, result)
      })
    })
  },

  getAllProduct: async (callback) => {
    var myQuery = await "SELECT * FROM products ORDER BY productId DESC"
    con.query(myQuery, (error, result) => {
      callback(error, result)
    })
  },

  getProductDetails: async (id, callback) => {
    // var myQuery = await ` SELECT * FROM products WHERE productId = ${id}`
    var myQuery = await `SELECT * FROM products  INNER JOIN shops ON  products.shopId = shops.shopId WHERE productId = ${id} `
    con.query(myQuery, (error, result) => {
      callback(error, result)
    })
  },


  getCatProduct:async (catId,callback) => {
    var myQuery = await `SELECT * FROM products WHERE categories = '${catId}' `
    con.query(myQuery, (error, result) => {
      callback(error, result)
    })
  },

  getShopProduct: async (id, callback) => {
    var myQuery = `SELECT * FROM products  INNER JOIN shops ON  products.shopId = shops.shopId WHERE userId = ${id} ORDER BY productId DESC`
    con.query(myQuery, async (error, result) => {
      callback(error, result)
    })
    // var myQuery = await `SELECT shopId FROM shops WHERE userId = ${id} `
    // con.query(myQuery, async (error, result) => {

    //   var myQuery2 = await ` SELECT * FROM products WHERE shopId = ${result[0].shopId} `
    //   con.query(myQuery2, (error, result1) => {
    //     console.log("result", result1)
    //     callback(error, result1)
    //   })
    // })
  },


  getStore: async (id, callback) => {
    var myQuery = `SELECT * FROM products  WHERE shopId = '${id}' ORDER BY productId DESC`
    con.query(myQuery, async (error, result) => {
      callback(error, result)
    })

  },
  shopDetails: async (id, callback) => {
    var myQuery1 =  await `SELECT shopId FROM shops WHERE userId = ${id} `
    con.query(myQuery1, async (error, result1) => {
      console.log("reeess",result1[0])
      var myQuery =  await ` SELECT * FROM shops WHERE shopId = ${result1[0].shopId}`
      con.query(myQuery, (error, result) => {
        callback(error, result)
      })
    })
  },

  getOneProduct: async (id, callback) => {
    var myQuery = await ` SELECT * FROM products WHERE productId = ${id}`
    con.query(myQuery, (error, result) => {
      callback(error, result)
    })
  },
  
  getProductDetails: async (id, callback) => {
    var myQuery = await `SELECT * FROM products  INNER JOIN shops ON  products.shopId = shops.shopId WHERE productId = ${id} ORDER BY productId DESC`

    con.query(myQuery, (error, result) => {

      callback(error, result)
    })
  },

  getCategories: async (callback) => {
    var myQuery = await ` SELECT * FROM categories`
    con.query(myQuery, (error, result) => {
      callback(error, result)
    })
  },

  editProduct: async (data, id, callback) => {
    var myQuery = await ` UPDATE  products SET productName = ?, price = ?, categories = ?, description = ?, image = ? WHERE productId = ${id}`
    con.query(myQuery, data, (error, result) => {
      callback(error, result)
    })
  },

  deletProduct: async (id, callback) => {
    var myQuery = await ` DELETE FROM products WHERE productId= ${id}`
    con.query(myQuery, async (error, result) => {
      console.log(result)
      var myQuery1 = await `SELECT * FROM products  INNER JOIN shops ON  products.shopId = shops.shopId WHERE userId = ${id} ORDER BY productId DESC`
    con.query(myQuery1, async (error, result1) => {
      console.log("result1::",result1)
      callback(error, result1)
    })

    // var myQuery1 = this.getShopProduct
    // // this.getShopProduct
    // con.query(myQuery1, function (err, result1) {
    //     callback(err, result1);
    //   });
    })
  },


}

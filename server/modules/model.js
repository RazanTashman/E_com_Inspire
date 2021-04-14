const con = require('../db/db')
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = {
  registration: async (user, shop, otp, callback) => {
    var output = {}
    // [req.body.email, otp ,req.body.type, req.body.fName, req.body.lName, req.body.shopName]
    var myQuery = await `SELECT userId FROM users WHERE email = '${user[0]}' `
    con.query(myQuery, (error, result) => {
      console.log("result", result)
      if (result.length !== 0) {
        output.userId = result[0].userId
        console.log("result.userId::", result[0].userId)
        callback(error, output)
        // output.userId = 0
      }



      if (result.length === 0 && user[0] !== "") {

        var myQuery2 = "INSERT INTO users (email, password,type,firstName,lastName) VALUES (?,?,?,?,?) "

        con.query(myQuery2, user, async (error, result2) => {
          console.log("result2", result2.insertId)
          output.insertId = result2.insertId
          console.log("outputIns::", output)
          callback(error, output)
          // output.insertId = 0


          // shopId, shopeName, address, userId
          var myQuery3 = await `INSERT INTO shops (shopeName, phoneNo, address, userId) VALUES (?,?,?,${result2.insertId}) `
          con.query(myQuery3, shop, (error, result3) => {
            console.log("not exist22222")
            console.log("output::", output)

          })
        })


        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

        var transporter = nodemailer.createTransport({
          service: 'gmail',
          // transportMethod: 'SMTP',
          auth: {
            user: 'carsooqjo@gmail.com',
            pass: 'Adam123456@'
          }
        });

        var mailOptions = {
          from: 'dawerhajo@gmail.com',
          to: user[0],
          subject: 'InspireSooq OTP ',
          text: `To verify your email address, please use the following One Time Password (OTP):  ${otp} Thank you for shopping with us.`
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      }





    })



  },


  signIn: async (user, callback) => {
    console.log("user", user)
    var myQuery = await `SELECT userId,type,password FROM users WHERE email = '${user[0]}' `

    con.query(myQuery, async (error, result) => {
      console.log("result", result[0].password)
      const validPassword = await bcrypt.compare(user[1], result[0].password);
      console.log("validPassword", validPassword)
      if (validPassword) {
        var obj = {}
        obj.data = result

        const accessToken = jwt.sign(user[0], process.env.SECRET_TOKEN)
        obj.token = accessToken
        console.log("accessToken", obj)

      }
      callback(error, obj)
      // else{
      //   return res.sendStatus(401)
      // }

    })
  },



  addProduct: async (data, id, callback) => {
    var myQuery1 = await `SELECT shopId FROM shops WHERE userId = '${id}' `
    con.query(myQuery1, async (error, result1) => {
      console.log("result", result1)
      data[6] = result1[0].shopId
      // [req.body.productName, req.body.price,  req.body.description, req.body.categories, req.body.subcat,req.body.image]
      var myQuery = await `INSERT INTO products (productName, price, description, catId, subcatId,  image, shopId) VALUES (?,?,?,?,?,?,?) `
      con.query(myQuery, data, (error, result1) => {
        console.log("............", result1)
        // var myQuery2 = `SELECT * FROM products WHERE shopId = ${data[6]} ORDER BY productId DESC`
        var myQuery2 = ` SELECT * FROM products  INNER JOIN categories ON  products.catId = categories.catId WHERE shopId = ${data[6]} ORDER BY productId DESC `
        con.query(myQuery2, async (error, result2) => {
          // console.log("result1::", result2)
          callback(error, result2)
        })

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



  getCatProduct: async (catId, callback) => {
    var myQuery = await `SELECT * FROM products WHERE catId = '${catId}' `
    con.query(myQuery, (error, result) => {
      callback(error, result)
    })
  },


  getSubcatProduct: async (subcatId, callback) => {
    var myQuery = await `SELECT * FROM products WHERE subcatId = '${subcatId}' `
    con.query(myQuery, (error, result) => {
      callback(error, result)
    })
  },


  getShopProduct: async (id, callback) => {
    // var myQuery = `SELECT * FROM products  INNER JOIN shops ON  products.shopId = shops.shopId WHERE userId = ${id} ORDER BY productId DESC`
    // var myQuery = `SELECT image FROM products   WHERE productId = 674`
    var myQuery1 = await `SELECT shopId FROM shops WHERE userId = '${id}' `
    con.query(myQuery1, async (error, result1) => {
      console.log("result", result1)
      var shopId = result1[0].shopId
      var myQuery = ` SELECT * FROM products  INNER JOIN categories ON  products.catId = categories.catId WHERE shopId = ${shopId} ORDER BY productId DESC `

      con.query(myQuery, async (error, result) => {
        // console.log("image:::", result)
        callback(error, result)
      })
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

  getShopImage: async (id, callback) => {


    var myQuery = `SELECT image, productId FROM products  INNER JOIN shops ON  products.shopId = shops.shopId WHERE userId = ${id} ORDER BY productId DESC`
    con.query(myQuery, async (error, result) => {
      console.log("image:::", result)
      for (var i = 0; i < result.length; i++) {
        callback(error, result)
      }

    })

  },



  getStore: async (id, callback) => {
    var myQuery = `SELECT * FROM products  WHERE shopId = '${id}' ORDER BY productId DESC`
    // var myQuery = `SELECT * FROM products  INNER JOIN shops ON  products.shopId = shops.shopId WHERE shopId = '${id}'`

    con.query(myQuery, async (error, result) => {
      callback(error, result)
    })

  },

  getStoreInfo: async (id, callback) => {
    var myQuery = `SELECT * FROM shops  INNER JOIN products ON  products.shopId = shops.shopId WHERE productId = '${id}'`
    con.query(myQuery, async (error, result) => {
      console.log("reeess", result)
      callback(error, result)
    })
  },

  shopDetails: async (id, callback) => {
    var myQuery1 = await `SELECT shopId FROM shops WHERE userId = ${id} `
    con.query(myQuery1, async (error, result1) => {
      console.log("reeess", result1[0])
      var myQuery = await ` SELECT * FROM shops WHERE shopId = ${result1[0].shopId}`
      con.query(myQuery, (error, result) => {
        callback(error, result)
      })
    })
  },

  getOneProduct: async (id, callback) => {
    var myQuery = await `SELECT * FROM products  INNER JOIN categories ON  products.catId = categories.catId INNER JOIN subcat ON  products.subcatId = subcat.subCatId WHERE productId = ${id}`

    // var myQuery =`SELECT * FROM gradeb INNER JOIN student ON student.studentId = grade.fk_studentId INNER JOIN exam ON exam.examId = grade.fk_examId ORDER BY exam.date`
    // var myQuery = await ` SELECT * FROM products WHERE productId = ${id}`
    con.query(myQuery, (error, result) => {
      console.log("reeess", result)
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

  getOneCategory: async (id, callback) => {
    var myQuery = await ` SELECT * FROM categories WHERE catId = ${id}`
    con.query(myQuery, (error, result) => {
      callback(error, result)
    })
  },


  editCategory: async (data, id, callback) => {
    console.log("data:", data)
    console.log("id:", id)
    var myQuery = await ` UPDATE  categories SET category = ?, catImage = ? WHERE catId = ${id}`
    con.query(myQuery, data, (error, result) => {
      console.log("result:", result)
      callback(error, result)
    })
  },

  getOneSubcat: async (id, callback) => {
    // var myQuery = await ` SELECT * FROM subcat WHERE subCatId = ${id}`
    var myQuery = await ` SELECT * FROM subcat INNER JOIN categories ON subcat.catId = categories.catId WHERE subCatId = ${id}`
    con.query(myQuery, (error, result) => {
      callback(error, result)
    })
  },

  editSubcat: async (data, id, callback) => {
    console.log("data:", data)
    console.log("id:", id)
    var myQuery = await ` UPDATE  subcat SET subCat = ?, catId = ?, subcatImage = ? WHERE subCatId = ${id}`
    con.query(myQuery, data, (error, result) => {
      console.log("result:", result)
      callback(error, result)
    })
  },

  delete: async (id, type, callback) => {
    var output = {}
    var myQuery = await ` DELETE  FROM subcat WHERE subCatId = ${id}`
    if (type === "categories")
      var myQuery = await ` DELETE  FROM categories WHERE catId = ${id}`
    con.query(myQuery, async (error, result) => {
      var myQuery1 = await ` SELECT * FROM categories`
      con.query(myQuery1, (error, result1) => {
        console.log("result1............", result1)
        output.categories = result1
        var myQuery2 = `SELECT * FROM subcat`
        con.query(myQuery2, (error, result2) => {
          console.log("result2............", result2)
          console.log("............", result)
          output.subcat = result2
          callback(error, output)
        })
      })
    })
  },

  getUserType: async (id, callback) => {
    var myQuery = await ` SELECT * FROM users WHERE userId = ${id}`
    con.query(myQuery, (error, result) => {
      callback(error, result)
    })
  },

  getOTP: async (id, callback) => {
    var myQuery = await ` SELECT password FROM users WHERE userId = ${id}`
    con.query(myQuery, (error, result) => {
      callback(error, result)
    })
  },


  confirmation: async (data, id, callback) => {
    console.log("ppppwwww controller:", data)
    var myQuery = await ` UPDATE  users SET password = ${data}  WHERE userId = '${id}'`
    con.query(myQuery, data, (error, result) => {
      callback(error, result)
    })
  },

  addToCart: async (data, callback) => {
    var myQuery = await "INSERT INTO cart (userId,productId,total) VALUES (?,?,?) "
    con.query(myQuery, data, (error, result) => {
      console.log("result", result)
      callback(error, result)
      // output.insertId = 0
    })
  },

  getCart: async (id, callback) => {
    var myQuery = await `SELECT * FROM products  INNER JOIN cart ON  products.productId = cart.productId WHERE userId = ${id} ORDER BY cartId DESC`
    con.query(myQuery, (error, result) => {
      // console.log("result", result)
      callback(error, result)
      // output.insertId = 0
    })
  },


  deleteCart: async (id, user, callback) => {
    var myQuery = await ` DELETE FROM cart WHERE cartId= ${id}`
    con.query(myQuery, async (error, result) => {
      var myQuery = await `SELECT * FROM products  INNER JOIN cart ON  products.productId = cart.productId WHERE userId = ${user} ORDER BY cartId DESC`
      con.query(myQuery, (error, result) => {
        console.log("result", result)
        callback(error, result)
        // output.insertId = 0
      })
    })
  },

  cahngOnQty: async (data, callback) => {
    var myQuery = await ` UPDATE  cart SET qty = ?, total = ? WHERE cartId = ${data.cartId}`
    con.query(myQuery, data.qty, (error, result) => {
      console.log("QQQQTTTYYY", data.qty, result)
      var myQuery2 = `SELECT * FROM products  INNER JOIN cart ON  products.productId = cart.productId WHERE userId = ${data.userId} ORDER BY cartId DESC`
      con.query(myQuery2, (error, result2) => {
        // console.log("result2", result2)
        callback(error, result2)
        // output.insertId = 0
      })
    })
  },

  editProduct: async (data, id, callback) => {
    console.log("data:", data)
    console.log("id:", id)
    var myQuery = await ` UPDATE  products SET productName = ?, price = ?, catId = ?, subcatId = ?, description = ?, image = ? WHERE productId = ${id}`
    con.query(myQuery, data, (error, result) => {
      console.log("result:", result)
      callback(error, result)
    })
  },



  deletProduct: async (id, user, callback) => {
    var myQuery = await ` DELETE FROM products WHERE productId= ${id}`
    con.query(myQuery, async (error, result) => {

      var myQuery = ` SELECT shopId FROM shops WHERE userId= ${user}`
      con.query(myQuery, async (error, result) => {
        console.log("::::", result)
        // var myQuery1 = await `SELECT * FROM products  INNER JOIN shops ON  products.shopId = shops.shopId WHERE userId = ${id} ORDER BY productId DESC`
        var myQuery1 = `SELECT * FROM products WHERE  shopId = ${result[0].shopId} ORDER BY productId DESC`

        con.query(myQuery1, async (error, result1) => {
          console.log("result1::", result1)
          callback(error, result1)
        })

        // var myQuery1 = this.getShopProduct
        // // this.getShopProduct
        // con.query(myQuery1, function (err, result1) {
        //     callback(err, result1);
        //   });
      })
    })
  },

  getallSubcat: (callback) => {
    var myQuery = `SELECT * FROM subcat`
    con.query(myQuery, (error, result) => {
      console.log("............", result)
      callback(error, result)
    })
  },

  getSubcat: (id, callback) => {
    // var myQuery1 = `SELECT catId FROM categories WHERE category = ${ JSON.stringify(id) } `
    // con.query(myQuery1, (error, result1) => {
    // console.log("result1", result1)
    var myQuery = `SELECT * FROM subcat WHERE catId = ${id} `
    con.query(myQuery, (error, result) => {
      console.log("............", result)
      callback(error, result)
    })
    // })
  },



  addCat: async (data, callback) => {
    var myQuery = `INSERT INTO categories (category, catImage) VALUES (?,?) `
    con.query(myQuery, data, (error, result) => {
      console.log("............", result)
      callback(error, result)
    })
  },

  addOrder: async (data, callback) => {
    console.log("data............", data)
    var myQuery = `INSERT INTO orders (userId, cartId,shopId) VALUES (?,?,?) `
    con.query(myQuery, data, (error, result) => {
      console.log("addOrder............", result)
      // callback(error, result)
    })
  },



  getorders: async (id, callback) => {
    // console.log("id:", id)
    var myQuery = await `SELECT * FROM orders  INNER JOIN cart ON  orders.cartId = cart.cartId  INNER JOIN products ON  products.productId = cart.productId WHERE orders.userId = ${id} ORDER BY  orders.orderId DESC`
    con.query(myQuery, (error, result) => {
      // console.log("id:", result)
      callback(error, result)
    })

  },


  getShopOrders: async (id, callback) => {
    console.log("id:", id)
    // var myQuery = await `SELECT * FROM orders  INNER JOIN cart ON  orders.cartId = cart.cartId  INNER JOIN products ON  products.productId = cart.productId INNER JOIN shops ON  products.shopId = shops.shopId WHERE order.shopId = ${id} ORDER BY  orders.orderId DESC`
    var myQuery = await `SELECT * FROM orders  INNER JOIN cart ON  orders.cartId = cart.cartId  INNER JOIN products ON  products.productId = cart.productId INNER JOIN shops ON  products.shopId = shops.shopId WHERE orders.shopId IN ( SELECT shopId FROM shops WHERE userId = ${id}) ORDER BY  orders.orderId DESC`


    con.query(myQuery, (error, result) => {
      // console.log("id:", result)
      callback(error, result)
    })

  },


  getBuyer: async (shopId, callback) => {
    console.log("shopId:", shopId)
    var myQuery = await `SELECT * FROM orders  INNER JOIN users ON  orders.userId = users.userId WHERE shopId = ${shopId} ORDER BY  orders.orderId DESC`
    con.query(myQuery, (error, result) => {
      console.log("result:", result)
      callback(error, result)
    })

  },


  //   getorders: async (id, callback) => {
  //     var orders = []
  //     var order = [];

  //     console.log("id:", id)

  //     // var myQuery = await `SELECT * FROM orders  INNER JOIN cart ON  orders.cartId = cart.cartId  INNER JOIN products ON  products.productId = cart.productId WHERE orders.userId = ${id} ORDER BY  orders.cartId DESC`
  //     var myQuery = await `SELECT cartId FROM orders WHERE userId = ${id}`
  //     con.query(myQuery,   (error, result) => {

  //       console.log("result.......////", result)
  //       result.map( (elements) => {

  //         console.log("elements:::::", elements.cartId)
  //        JSON.parse( elements.cartId).map(async(cartId) => {
  //         orders =[]
  //         console.log("cartId.......", cartId)
  //           var myQuery1 = await ` SELECT * FROM cart  INNER JOIN products ON  products.productId = cart.productId WHERE cartId = ${cartId} `
  //           // var myQuery1 = ` SELECT * FROM cart  WHERE cartId = ${cartId} `
  //           con.query(myQuery1, (error, result1) => {
  //             // console.log("result1", result1)
  //           //  order.push(result1)
  //           //  console.log("order:::::", order) 
  //           //  orders.push("order")
  //            callback(error, result1)


  //       })

  //       // console.log("orderssss:::::", orders)

  //     })


  //   })


  // })

  //   },

  addSubCat: async (data, callback) => {
    console.log("........data[0]", data[0])
    var myQuery1 = await `SELECT * FROM categories WHERE catId = ${(data[0])}`
    con.query(myQuery1, (error, result1) => {
      console.log("........result1", result1)
      data[0] = result1[0].catId
      var myQuery = `INSERT INTO subcat (catId, subCat, subcatImage) VALUES (?,?,?) `
      con.query(myQuery, data, (error, result) => {
        console.log("............", result)
        callback(error, result)

      })
    })
  },

  purchase: async (id, data, callback) => {
    console.log("URL",`http://localhost:3000/orders/${data.userId}`)
    var userQuery = await `SELECT * FROM users WHERE userId = ${data.userId}`
    con.query(userQuery, async (error, user) => {
      // console.log("user",user[0].customer_email)
      
      
    var myQuery = await `SELECT * FROM products WHERE productId = ${id}`
    con.query(myQuery, async (error, item) => {
      // console.log("session::::productName",item[0].productName)
      // console.log("session::::description",item[0].description)
      console.log("session::::image",item[0].image)
      // console.log("session::::price",item[0].price * 100)
      // console.log("session::::id",id)

      // 2) Create checkout session
      // const subscription = await stripe.subscriptions.create({
      //   customer: "cus_JHwr0zYGGfqdUZ",
      //   // coupon: 'free-period',
      //   // default_tax_rates: ['txr_1EO66sClCIKljWvs98IiVfHW'],
      //   trial_end: 1610403705,
      //   items: [
      //     {
      //       price: 'price_CBXbz9i7AIOTzr',
      //     },
      //     {
      //       price: 'price_IFuCu48Snc02bc',
      //       quantity: 2,
      //     },
      //   ],
      // });
        //  callback(error, subscription)
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        // success_url: `${URL[1]}://${URL[0]}/orders/${data.userId}`,
        success_url: `http://localhost:3000/orders/${data.userId}`,
        cancel_url: `http://localhost:3000/orders/${data.userId}`,
        customer_email: user[0].email,
        client_reference_id: id,
        line_items: [
          {
            name: item[0].productName,
            description: item[0].description,
            images: ["https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"],
            amount: item[0].price * 100,
            currency: 'usd',
            quantity: data.qty
          }
        ]
      });
      callback(error, session)

   
      
      
    });


    })

  },


}




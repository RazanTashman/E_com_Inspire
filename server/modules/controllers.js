const model = require('./model')

module.exports = {

  signUp: (req, res) => {
    const data = [req.body.fName, req.body.lName, req.body.email, req.body.password, "user"]
    model.signUp(data, (error, result) => {
      if (error)
        console.log("error from controller", error)
      else {
        console.log("error from controller", error)
      }
      res.send(result)
    })

  },


  signUpShop: (req, res) => {
    const user = [req.body.email, req.body.password, "shop"]
    const shop = [req.body.shopName, req.body.phoneNo, req.body.address]
    console.log("shhoooop", shop)
    model.signUpShop(user, shop, (error, result) => {
      if (error)
        console.log("error from controller", error)
      else {
        console.log("error from controller", error)
      }
      res.send(result)
    })

  },

  signIn: (req, res) => {
    console.log(" controllerddddddddd")
    const user = [req.body.email, req.body.password]
    
    console.log(" controller", user)
    model.signIn(user, (error, result) => {
      if (error)
        console.log("error from controller", error)
      else {
        console.log("error from controller", error)
      }
      res.send(result)
    })
  },

  addProduct: (req, res) => {
    var id = req.body.shopId
    console.log ("daaaaaaaaaata",req.body) 
    const data = [req.body.productName, req.body.price, req.body.categories,req.body.description,req.body.image]
    console.log ("data",data)
    model.addProduct(data,id, (error, result) => {
      if (error)
        console.log("error from controller", error)
      else {
        console.log("error from controller", error)
      }
      res.send(result)
    })
  },

  getAllProduct: (req, res) => {
      model.getAllProduct((error, result) => {
      if (error)
        console.log("error from controller", error)
      else {
        console.log("error from controller", error)
      }
      res.send(result)
    })
  },

  getShopProduct: (req, res) => {
    const id = req.params.id
    model.getShopProduct(id,(error, result) => {
    if (error)
      console.log("error from controller", error)
    else {
      console.log("error from controller", error)
    }
    res.send(result)
  })
},
shopDetails: (req, res) => {
  const shop =req.params.id
  console.log("controller" , shop)
  model.shopDetails(shop,(error, result) => {
  if (error)
    console.log("error from controller", error)
  else {
    console.log("error from controller", error)
  }
  res.send(result)
})
},


getCategories:(req, res) => {
  model.getCategories(shop,(error, result) => {
  if (error)
    console.log("error from controller", error)
  else {
    console.log("error from controller", error)
  }
  res.send(result)
})
},
getOneProduct: (req, res) => {
  const id =req.params.id
  model.getOneProduct(id,(error, result) => {
  if (error)
    console.log("error from controller", error)
  else {
    console.log("error from controller", error)
  }
  res.send(result)
})
},

editProduct: (req, res) => {
  const id = req.params.id
  const data = [req.body.productName, req.body.price, req.body.categories,req.body.description,req.body.image]
  console.log("data:::",data,id)
  model.editProduct(data,id,(error, result) => {
  if (error)
    console.log("error from controller", error)
  else {
    console.log("error from controller", error)
  }
  res.send(result)
})
},

deletProduct: (req, res) => {
  const id = req.params.id
  model.deletProduct(id,(error, result) => {
  if (error)
    console.log("error from controller", error)
  else {
    console.log("error from controller", error)
  }
  res.send(result)
})
},



} 
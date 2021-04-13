const con = require('../db/db')
const model = require('./model')
const bcrypt = require ('bcryptjs')

module.exports = {
  registration: (req, res) => {
    var otp = Math.floor(Math.random()*(1000000-100000) +100000) 
    // const user
    if (req.body.type === "user")
      var user = [req.body.email, otp ,req.body.type, req.body.fName, req.body.lName]
    else 
      var user = [req.body.email, otp ,req.body.type,req.body.shopName,null]

    const shop = [req.body.shopName, req.body.phoneNo, req.body.address]

    console.log("shhoooop", shop)
    console.log("useeeeer", user)
    model.registration(user, shop, otp, (error, result) => {
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
    var id = req.body.userId
    console.log ("daaaaaaaaaata",req.body) 
  
    
// var buf = Buffer.from(req.body.image, 'base64'); // T
// console.log("buf::",byteCharacters);
//  const byteNumbers = new Array(byteCharacters.length);
//                             for (let i = 0; i < byteCharacters.length; i++) {
//                                 byteNumbers[i] = byteCharacters.charCodeAt(i);
//                             }

                            // const buf = new Uint8Array(byteCharacters);
// console.log("buf::",buf);

// console.log('"' + data + '" converted to Base64 is "' + base64data + '"');
    const data = [req.body.productName, req.body.price,  req.body.description, req.body.categories, req.body.subcat,req.body.image]
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
  getCatProduct: (req, res) => {
    var catId=req.params.catId
    console.log("catId", catId)
    model.getCatProduct(catId,(error, result) => {
    if (error)
      console.log("error from controller", error)
    else {
      console.log("error from controller", error)
    }
    res.send(result)
  })
},

getSubcatProduct: (req, res) => {
  var subcatId=req.params.subcatId
  console.log("catId", subcatId)
  model.getSubcatProduct(subcatId,(error, result) => {
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

getImage: (req, res) => {
  const id = req.params.id
  model.getShopImage(id,(error, result) => {
  if (error)
    console.log("error from controller", error)
  else {
    console.log("error from controller", error)
  }
  res.send(result)
})
},


uploadImage: (req, res) => {
  const id = req.params.id
  model.uploadImage(id,(error, result) => {
  if (error)
    console.log("error from controller", error)
  else {
    console.log("error from controller", error)
  }
  res.send(result)
})
},


getStore: (req, res) => {
  const id = req.params.id
  model.getStore(id,(error, result) => {
  if (error)
    console.log("error from controller", error)
  else {
    console.log("error from controller", error)
  }
  res.send(result)
})
},

getStoreInfo: (req, res) => {
  const id = req.params.id
  model.getStoreInfo(id,(error, result) => {
  if (error)
    console.log("error from controller", error)
  else {
    console.log("error from controller", error)
  }
  res.send(result)
})
},

shopDetails: (req, res) => {
  const user =req.params.id
  console.log("I'm heeeeree")
  model.shopDetails(user,(error, result) => {
  if (error)
    console.log("error from controller", error)
  else {
    console.log("error from controller", error)
  }
  res.send(result)
})
},


getCategories:(req, res) => {
  model.getCategories((error, result) => {
  if (error)
    console.log("error from controller", error)
  else {
    console.log("error from controller", error)
  }
  res.send(result)
})
},


getOneCategory:(req, res) => {
  const id = req.params.id
  model.getOneCategory(id,(error, result) => {
  if (error)
    console.log("error from controller", error)
  else {
    console.log("error from controller", error)
  }
  res.send(result)
})
},


editCategory:(req, res) => {
  const id = req.params.id
  const data =[req.body.category,req.body.image]
  console.log("controool",id, data)
  model.editCategory(data,id,(error, result) => {
  if (error)
    console.log("error from controller", error)
  else {
    console.log("error from controller", error)
  }
  res.send(result)
})
},

getOneSubcat:(req, res) => {
  const id = req.params.id
  model.getOneSubcat(id,(error, result) => {
  if (error)
    console.log("error from controller", error)
  else {
    console.log("error from controller", error)
  }
  res.send(result)
})
},

editSubcat:(req, res) => {
  const id = req.params.id
  const data =[req.body.subcat,req.body.catId,req.body.image]
  console.log("controool",id, data)
  model.editSubcat(data,id,(error, result) => {
  if (error)
    console.log("error from controller", error)
  else {
    console.log("error from controller", error)
  }
  res.send(result)
})
},

delete:(req, res) => {
  const id = req.params.id
  const type = req.params.type
  model.delete(id, type,(error, result) => {
  if (error)
    console.log("error from controller", error)
  else {
    console.log("error from controller", error)
  }
  res.send(result)
})
},



getUserType: (req, res) => {
  const user =req.params.id
  console.log("controller" , user)
  model.getUserType(user,(error, result) => {
  if (error)
    console.log("error from controller", error)
  else {
    console.log("error from controller", error)
  }
  res.send(result)
})
},
getProductDetails: (req, res) => {
  const id =req.params.id
  model.getProductDetails(id,(error, result) => {
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

getOTP: (req, res) => {
  const id =req.body.id
  console.log("ID:",id)
  model.getOTP(id,(error, result) => {
  if (error)
    console.log("error from controller", error)
  else {
    console.log("error from controller", error)
  }
  res.send(result)
})
},

confirmation: async (req, res) => {
  console.log("heeererre",req.body.password)
  var id = req.body.userId
  const data = req.body.password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data, salt)
 console.log("hashedPassword::",hashedPassword)

  model.confirmation(JSON.stringify(hashedPassword),id, (error, result) => {
    if (error)
      console.log("error from controller", error)
    else {
      console.log("error from controller", error)
    }
    res.send(result)
  })
},


addToCart: (req, res) => {
  var data = [req.body.userId, req.body.productId,req.body.price]
  model.addToCart(data, (error, result) => {
    if (error)
      console.log("error from controller", error)
    else {
      console.log("error from controller", error)
    }
    res.send(result)
  })
},

getCart: (req, res) => {
  var id = req.params.id
  console.log("I'm Hereee", id)
  model.getCart(id, (error, result) => {
    if (error)
      console.log("error from controller", error)
    else {
      console.log("error from controller", error)
    }
    res.send(result)
  })
},

deleteCart: (req, res) => {
  const id = req.params.id
  const user = req.params.user
  console.log("id:::", id)
  console.log("id:::", user)
  model.deleteCart(id,user,(error, result) => {
  if (error)
    console.log("error from controller", error)
  else {
    console.log("error from controller", error)
  }
  res.send(result)
})
},


cahngOnQty: (req, res) => {
  var data ={
    userId : req.body.userId,
    cartId : req.body.cartId,
    qty :[ req.body.qty[0],req.body.qty[1]]
   
  }

  console.log("I'm Hereee",data )
  model.cahngOnQty(data,(error, result) => {
    if (error)
      console.log("error from controller", error)
    else {
      console.log("error from controller", error)
    }
    res.send(result)
  })
},


editProduct: (req, res) => {

  console.log("I'm HEEEEEEEERRRREEEEEEEEE")
  const id = req.params.id
  const data = [req.body.productName, req.body.price, req.body.categories, req.body.subcat, req.body.description,req.body.image]
  console.log("data:.......::",data,id)
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
  const user = req.params.user
  console.log("id:::", id)
  console.log("id:::", user)
  model.deletProduct(id,user,(error, result) => {
  if (error)
    console.log("error from controller", error)
  else {
    console.log("error from controller", error)
  }
  res.send(result)
})
},

getallSubcat:(req, res) => {
  model.getallSubcat((error, result) => {
  if (error)
    console.log("error from controller", error)
  else {
    console.log("error from controller", error)
  }
  res.send(result)
})
},

getSubcat:(req, res) => {
  catId = req.params.id
  console.log("catId", catId)

  model.getSubcat(catId,(error, result) => {
  if (error)
    console.log("error from controller", error)
  else {
    console.log("error from controller", error)
  }
  res.send(result)
})
},


addCat: (req, res) => {
  const data = [req.body.category,req.body.image]
  console.log ("data",data)
  model.addCat(data, (error, result) => {
    if (error)
      console.log("error from controller", error)
    else {
      console.log("error from controller", error)
    }
    res.send(result)
  })
},

addOrder: (req, res) => {
  // const data = [req.body.userId,JSON.stringify(req.body.cartId)]
  
  console.log ("addOrder", req.body.cartId)
  req.body.cartId.map( (cartId,index) => {
    const data = [req.body.userId,cartId,req.body.shopId[index]]
  model.addOrder(data, (error, result) => {
    if (error)
      console.log("error from controller", error)
    else 
      console.log("error from controller", error)
    // res.send(result)
  })
})
},

getorders: (req, res) => {
  var id = req.params.id
  model.getorders(id, (error, result) => {
    if (error)
      console.log("error from controller", error)
    else {
      console.log("error from controller", error)
    }
    res.send(result)
  })
},

getShopOrders: (req, res) => {
  var id = req.params.id
  model.getShopOrders(id, (error, result) => {
    if (error)
      console.log("error from controller", error)
    else {
      console.log("error from controller", error)
    }
    res.send(result)
  })
},

getBuyer: (req, res) => {
  var id = req.params.id
  console.log("shopId:::::::::::", id)
  model.getBuyer(id, (error, result) => {
    if (error)
      console.log("error from controller", error)
    else {
      console.log("error from controller", error)
    }
    res.send(result)
  })
},

addSubCat: (req, res) => {
  console.log ("daaaaaaaaaata",req.body) 
  const data = [req.body.category, req.body.subCat,req.body.image]
  console.log ("data",data)
  model.addSubCat(data, (error, result) => {
    if (error)
      console.log("error from controller", error)
    else {
      console.log("error from controller", error)
    }
    res.send(result)
  })
},

purchase: (req, res) => {

  const id = req.params.id
 const data ={
   userId : req.body.userId,
   price : req.body.price,
   qty :  req.body.qty,
 }
  
  const URL = [req.get('host'), req.protocol]
 
  console.log ("data",data)

  model.purchase(id,data, (error, result) => {
    
    if (error)
        res.status(500).send({
          message:
            error.message || "Some error occurred while Purchaseing."
        });
      else res.send(result);
  })
},



} 
const router = require("express").Router()
const controller = require ('./controllers.js')

router.post("/user/signup", controller.signUp);

router.post("/shop/signup", controller.signUpShop);

router.post("/signin", controller.signIn);

router.post("/shop/addproduct", controller.addProduct);

router.get("/user/products", controller.getAllProduct);

router.get("/shop/products/:id", controller.getShopProduct);

router.get("/shop/product/:id", controller.getOneProduct);

router.put("/shop/product/:id", controller.editProduct);

router.delete("/shop/product/:id", controller.deletProduct);

router.get("/shop/:id", controller.shopDetails);

router.get("/categories", controller.getCategories);


// http://localhost:5000/shop?shop=s&id=74



// {
//     "productName":"PC", 
//     "price":10, 
//     "categories": "Electronics",
//      "description":"Good One", 
//      "image":"https://wallpapercave.com/wp/wp3194549.png",
//       "shopId" :1
// }

module.exports = router;
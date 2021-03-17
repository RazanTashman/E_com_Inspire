const router = require("express").Router()
const controller = require ('./controllers.js')

router.post("/registration", controller.registration);

router.post("/signin", controller.signIn);

router.post("/shop/addproduct", controller.addProduct);

router.get("/user/products", controller.getAllProduct);

router.get("/user/products/:catId", controller.getCatProduct);

router.get("/shop/products/:id", controller.getShopProduct);

router.get("/shop/products/image/:id", controller.getImage);

router.post("/shop/products/image/", controller.uploadImage);

router.get("/store/:id", controller.getStore);

router.get("/product/:id", controller.getProductDetails);

router.get("/shop/product/:id", controller.getOneProduct);

router.put("/shop/product/:id", controller.editProduct);

router.delete("/shop/product/:id/:user", controller.deletProduct);

router.get("/shop/:id", controller.shopDetails);

router.get("/categories", controller.getCategories);

router.get("/usertype/:id", controller.getUserType);

router.post("/pwdverification", controller.getOTP);

router.post("/confirmation", controller.confirmation);

router.post("/cart", controller.addToCart);

router.get("/cart/:id", controller.getCart);

router.delete("/cart/:id/:user", controller.deleteCart);

router.post("/qty", controller.cahngOnQty);


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
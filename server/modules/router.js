const router = require("express").Router()
const controller = require ('./controllers.js')

authenticateToken = require("./middlewares")

router.post("/registration", controller.registration);

router.post("/signin", controller.signIn);

router.post("/shop/addproduct", authenticateToken,controller.addProduct);

router.get("/user/products",controller.getAllProduct);

router.get("/user/products/:catId", controller.getCatProduct);

router.get("/user/subcat/products/:subcatId", controller.getSubcatProduct);

router.get("/shop/products/:id", authenticateToken,controller.getShopProduct);

router.get("/shop/products/image/:id", controller.getImage);

// router.post("/shop/products/image/", controller.uploadImage);

router.get("/store/:id", controller.getStore);

router.get("/storeInfo/:id", controller.getStoreInfo);

router.get("/product/:id", controller.getProductDetails);

router.get("/shop/product/:id", controller.getOneProduct);

router.put("/shop/product/:id", controller.editProduct);

router.delete("/shop/product/:id/:user", controller.deletProduct);

router.get("/shop/:id",authenticateToken, controller.shopDetails);

router.get("/categories", controller.getCategories);

router.get("/categories/:id", controller.getOneCategory);

router.put("/categories/:id", controller.editCategory);

router.get("/subcategorie/:id", controller.getOneSubcat);

router.put("/subcategories/:id", controller.editSubcat);

router.delete("/subcategories/:id/:type", controller.delete);

router.get("/usertype/:id", controller.getUserType);

router.post("/pwdverification", controller.getOTP);

router.post("/confirmation", controller.confirmation);

router.post("/cart", authenticateToken,controller.addToCart);

router.get("/cart/:id", authenticateToken,controller.getCart);

router.delete("/cart/:id/:user", controller.deleteCart);

router.post("/qty", authenticateToken,controller.cahngOnQty);

router.get("/subcategories",controller.getallSubcat);

router.get("/subcategories/:id",controller.getSubcat);

router.post("/admin/addcat",controller.addCat);

router.post("/addorder",controller.addOrder);

router.get("/orders/:id",controller.getorders);

// router.get("/v1/payment_intents",controller.getorders);

router.get("/shop/orders/:id",controller.getShopOrders);

router.get("/buyer/:id",controller.getBuyer);

router.post("/admin/addsubcat",controller.addSubCat);

router.post("/purchase/:id",controller.purchase);






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
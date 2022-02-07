//Import module
const router = require('express').Router();
const auth = require('../auth')
const productController = require('../controllers/productControllers');

//root
router.get('/', (req, res) => {
    res.send({
        message: "root folder"
    })
})

//Create-products
router.post('/create-product', auth.verify, (req, res) => {

    let userData = auth.decode(req.headers.authorization)

    if (userData.isAdmin == true) {
        res.send({ message: "Welcome Admin" })
    } res.send({ message: "User is not allowed to create product." })

})

// Get All Products
router.get("/all", (req, res) => {
    productController.getAll()
        .then(resultFromController => res.send(resultFromController));
})

// Get All Active Products
router.get("/active", (req, res) => {
    productController.getAllActive()
        .then(resultFromController => res.send(resultFromController));
})

//Add Products (Admin Only)
router.post("/", auth.verify, (req, res) => {
    //if admin
    // 		productController.addProduct(req.body)
    //			.then(resultFromController => res.send(resultFromController))

    //if not admin
    // res.send(false)
})
module.exports = router;
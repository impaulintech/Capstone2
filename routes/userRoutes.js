//Import module
const express = require('express');
const router = express.Router();
const auth = require('../auth')
const userController = require('../controllers/userControllers');

//root folder
router.get('/', (req, res) => {
    res.send({
        message: "root folder"
    })
})

//Register
router.post('/register', (req, res) => {
    userController.register(req.body)
        .then(result => {
            res.send(result)
        })
})

//Login
router.post('/login', (req, res) => {
    userController.login(req.body)
        .then(result => { res.send(result) })
})

//Checkout
router.post("/checkout", auth.verify, (req, res) => {
    let userData = auth.decode(req.headers.authorization)

    userController.checkout(userData, req.body)
        .then(result => {
            res.send(result.latestOrder)
        });
})

//My-orders
router.get("/my-orders", auth.verify, (req, res) => {

    let userData = auth.decode(req.headers.authorization)

    userController.getMyOrders(userData)
        .then(result => {
            res.send(result)
        });
})

//View all the orders Admin Only
router.get("/orders", auth.verify, (req, res) => {

    let userData = auth.decode(req.headers.authorization)

    userController.getAllOrders(userData)
        .then(result => {
            res.send(result)
        });

})

module.exports = router;
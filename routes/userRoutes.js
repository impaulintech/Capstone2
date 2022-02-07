//Import module
const express = require('express');
const userController = require('../controllers/userControllers');
const router = express.Router();

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

module.exports = router;
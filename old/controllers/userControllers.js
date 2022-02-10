//Import Model 
const auth = require('../auth');
const User = require('../models/User');
const Product = require('../models/Product')
const bcrypt = require('bcrypt')

module.exports = {
    register: (reqbody) => {
        const { email, password } = reqbody;

        const newUser = new User({
            email,
            password: bcrypt.hashSync(password, 9)
        })

        return newUser.save().then((res, rej) => {
            if (res) {
                return {
                    message: "Successfully registered!",
                    email
                }
            }
            return {
                error: "Error, something went wrong!"
            }
        }).catch(err => { console.log(err) })

    },
    login: (reqBody) => {
        const { email, password } = reqBody
        return User.findOne({ email })
            .then((res) => {
                if (res == null) {
                    return { message: "Cannot find email in the database" }
                } else {
                    const inputPass = bcrypt.compareSync(password, res.password)
                    if (inputPass == true) {
                        return {
                            access: auth.createAccessToken(res)
                        }
                    } return {
                        message: "Password is incorrect"
                    }
                }
            })
    },
    checkout: async (userData, cart) => {
        //verification
        if (userData.isAdmin == false) {

            //save newOrder from user to database
            const newOrder = await User.findByIdAndUpdate(userData.id, { $addToSet: { orders: cart } }, { new: true })

            //get latest order from user
            const latestOrder = newOrder.orders[newOrder.orders.length - 1]
            const orderId = latestOrder._id

            let productId
            let productDetail
            for (let i = 0; i < cart.products.length; i++) {
                //find Product using product ID from cart.products[0].productId
                productId = cart.products[i].productId
                //save latest order id from user to Product.orders Array
                productDetail = await Product.findByIdAndUpdate(productId,
                    { $addToSet: { orders: [{ orderId }] } }, { new: true })
            }

            return {
                "productDetails": productDetail,
                "latestOrder": latestOrder
            }
        } return "Admin is not allowed to checkout"
    },
    getMyOrders: async (userData) => {
        if (userData.isAdmin == false) {

            const myOrders = await User.findById(userData.id)

            return myOrders.orders

        } return { message: "Admin is not allowed to get my orders" }
    },
    getAllOrders: async (userData) => {
        if (userData.isAdmin == true) {

            const allOrders = await User.find().select("-password -isAdmin -__v")
            let allActiveOrders = []

            for (let i = 0; i < allOrders.length; i++) {
                if (allOrders[i].orders.length >= 1) {
                    allActiveOrders.push(allOrders[i].orders)
                }
            }

            return allActiveOrders

        } return { message: "User is not allowed to get all orders" }
    }
}
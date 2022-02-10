{
    checkout: async (userData, cart) => {
        if (userData.isAdmin == false) {

            const checkout = await User.findByIdAndUpdate(userData.id, {
                $addToSet: {
                    orders: cart
                }
            }, { new: true })

            const orders = await User.findById(userData.id)
            const lastOrder = orders.orders[orders.orders.length - 1]

            //push order id to product orders
            const find = lastOrder.products[0].productId;
            const push = lastOrder._id;

            const productUpdate = await Product.findByIdAndUpdate(find, {
                $addToSet: {
                    orders: [{ orderId: push }]
                }
            }, { new: true })

            return { "key": lastOrder, "key2": productUpdate }

        } return { message: "Admin is not allowed to checkout." }
    },
        getMyOrders: async (userData) => {
            if (userData.isAdmin == false) {
                const orders = await User.findById(userData.id)
                return orders.orders
            } return { message: "Admin is not allowed to get user orders." }
        },
            getAllOrders: async (userData) => {
                if (userData.isAdmin == true) {

                    const data = await User.find()
                    let getOrders = []

                    for (let i = 0; i < data.length; i++) {
                        if (data[i].orders.length >= 1) {
                            getOrders.push({
                                "email": data[i].email,
                                "userId": data[i]._id,
                                "orders": data[i].orders
                            })
                        }
                    }
                    return getOrders
                } return { message: "User is not allowed to view all orders" }
            }
}

//////////////////////////////

{//Import Model 
    const auth = require('../auth');
    const User = require('../models/User');
    const Product = require('../models/Product')

    module.exports = {
        register: (reqbody) => {
            const { email, password } = reqbody;

            const newUser = new User({
                email,
                password
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
                .then((res, rej) => {
                    if (res == null) {
                        return { message: "Cannot find email in the database" }
                    } else {

                        if (password === res.password) {
                            return {
                                access: auth.createAccessToken(res)
                            }
                        } return {
                            message: "Password is incorrect"
                        }
                    }
                })
        },
        checkout: async (userData, reqBody) => {

            if (userData.isAdmin == false) {

                const user = await User.findByIdAndUpdate(userData.id,
                    { $addToSet: { orders: reqBody } }, { new: true })

                const userOrder = await User.findById(userData.id)
                const total = userOrder.orders.length
                const latest = userOrder.orders[total - 1]

                //Save id to product orders array
                let productId;
                let productDetails;
                const totalOrders = reqBody.products.length
                console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
                for (let i = 0; i < totalOrders; i++) {

                    productId = reqBody.products[i].productId
                    productDetails = await Product.findByIdAndUpdate(productId, { $addToSet: { orders: [{ orderId: latest }] } }, { new: true })

                }

                return {
                    "checkOut": user,
                    "latest": latest,
                    "productOrders": productDetails
                }

            } return "Admin is not allowed to access checkout"
        }
    }
}

//////////////////////////////

{//Import Model 
    const auth = require('../auth');
    const User = require('../models/User');
    const Product = require('../models/Product')

    module.exports = {
        register: (reqbody) => {
            const { email, password } = reqbody;

            const newUser = new User({
                email,
                password
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
                .then((res, rej) => {
                    if (res == null) {
                        return { message: "Cannot find email in the database" }
                    } else {

                        if (password === res.password) {
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
            if (userData.isAdmin == false) {

                const checkout = await User.findByIdAndUpdate(userData.id, {
                    $addToSet: {
                        orders: cart
                    }
                }, { new: true })

                const orders = await User.findById(userData.id)
                const lastOrder = orders.orders[orders.orders.length - 1]

                //push order id to product orders
                const find = lastOrder.products[0].productId;
                const push = lastOrder._id;

                //Save id to product orders array
                let productId;
                let productDetails;
                const totalOrders = cart.products.length

                for (let i = 0; i < totalOrders; i++) {

                    productId = cart.products[i].productId
                    productDetails = await Product.findByIdAndUpdate(productId, { $addToSet: { orders: [{ orderId: push }] } }, { new: true })

                }

                return { "lastOrder": lastOrder, "productDetails": productDetails }

            } return { message: "Admin is not allowed to checkout." }
        },
        getMyOrders: async (userData) => {
            if (userData.isAdmin == false) {
                const orders = await User.findById(userData.id)
                return orders.orders
            } return { message: "Admin is not allowed to get user orders." }
        },
        getAllOrders: async (userData) => {
            if (userData.isAdmin == true) {

                const data = await User.find()
                let getOrders = []

                for (let i = 0; i < data.length; i++) {
                    if (data[i].orders.length >= 1) {
                        getOrders.push({
                            "email": data[i].email,
                            "userId": data[i]._id,
                            "orders": data[i].orders
                        })
                    }
                }
                return getOrders
            } return { message: "User is not allowed to view all orders" }
        }
    }
}
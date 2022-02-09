//Import Model 
const auth = require('../auth');
const User = require('../models/User');

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
        const { id, isAdmin } = userData;

        if (isAdmin == false) {
            return User.findByIdAndUpdate(id, {
                orders: reqBody
            }, { new: true })
        } return { message: "Admin is not allowed to checkout" }
    },
    getMyOrders: async (userData) => {
        const { id, isAdmin } = await userData;
        const userOrder = await User.findById(id);

        if (isAdmin == false) {
            return userOrder.orders
        } return { message: "Admin is not allowed to check user orders" }
    },
    getAllOrders: async (userData) => {
        const { id, isAdmin } = userData;
        const orderList = await User.find();

        const getOrders = [];

        if (isAdmin == true) {

            orderList.forEach((list) => {
                if (list.orders.length >= 1) {
                    getOrders.push({
                        "userId": list._id,
                        "email": list.email,
                        "orders": list.orders
                    });
                }
            })
            return getOrders
        } return { message: "User is not allowed to view orders" }
    }
}
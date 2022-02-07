//Import Modules
const mongoose = require('mongoose');

//User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    orders: [
        {
            totalAmount: {
                type: Number,
                required: [
                    true,
                    "Total amount is required"
                ]
            },
            purchasedOn: {
                type: Date,
                default: new Date()
            },
            products: [
                {
                    productName: {
                        type: String,
                        required: [
                            true,
                            "Product name is required"
                        ]
                    },
                    quantity: {
                        type: Number,
                        required: [
                            true,
                            "Product quantity is required"
                        ]
                    }
                }
            ]
        }
    ]
})

module.exports = mongoose.model("User", userSchema)
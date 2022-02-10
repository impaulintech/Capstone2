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
            purchasedOn: {
                type: Date,
                default: new Date()
            },
            products: [
                {
                    productId: {
                        type: String,
                        required: [
                            true,
                            "Product ID is required"
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
            ],
            totalAmount: {
                type: Number,
                required: [
                    true,
                    "Total amount is required"
                ]
            }
        }
    ]
})

module.exports = mongoose.model("User", userSchema)
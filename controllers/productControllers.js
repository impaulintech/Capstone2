//Import Model  
const Product = require('../models/Product');

module.exports = {
    addProduct: async (userData, reqBody) => {
        const { name, description, price, orders } = await reqBody;

        if (userData.isAdmin == true) {

            const newProduct = new Product({
                name,
                description,
                price,
                orders
            })

            return newProduct.save()
                .then((res, rej) => {
                    if (res) {
                        return {
                            message: "New Product successfully created!",
                            productDetails: reqBody
                        }
                    } return { message: "Error something went wrong" }
                })


        } return { message: "User is not allowed to create product" }
    },
    getAll: () => {
        return Product.find()
            .then((res, rej) => {
                if (res) {
                    return res;
                } return { message: "Something went wrong" }
            })
    },
    getAllActive: () => {
        return Product.find()
            .then((res, rej) => {
                if (res) {

                    let activeProduct = [];
                    const total = res.length;

                    for (let i = 0; i < total; i++) {
                        if (res[i].isActive == true) {
                            activeProduct.push(res[i])
                        }
                    }

                    return activeProduct

                } return { message: "Something went wrong" }
            })
    },
    getProduct: async (id) => {
        const search = await Product.findById(id)
        if (search == null) {
            return { message: "Something went wrong" }
        } return Product.findById(id)
    },
    updateProduct: async (userData, id, reqBody) => {
        const { name, description, price } = await reqBody;
        const search = await Product.findById(id)
        if (search == null) {
            return { message: "Something went wrong" }
        }
        if (userData.isAdmin == true) {

            const product = await Product.findByIdAndUpdate(id, {
                name,
                description,
                price
            }, { new: true })

            return product

        }
        return { message: "User is not allowed to update product." }

    },
    archiveProduct: async (userData, id) => {
        const search = await Product.findById(id)
        if (search == null) {
            return { message: "Something went wrong" }
        }
        if (userData.isAdmin == true) {

            return Product.findByIdAndUpdate(id, {
                isActive: false
            }).then(res => {
                return { message: "Product has been Archive" }
            })

        } return { message: "User is not allowed to update product" }
    },
    activateProduct: async (userData, id) => {
        const search = await Product.findById(id)
        if (search == null) {
            return { message: "Something went wrong" }
        }
        if (userData.isAdmin == true) {

            return await Product.findByIdAndUpdate(id, {
                isActive: true
            }).then(res => {
                return { message: "Product has been Activated" }
            })

        } return { message: "User is not allowed to update product" }
    }
}
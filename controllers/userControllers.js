//Import Model 
const auth = require('../auth');
const bcrypt = require('bcrypt');
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
    }
}
//Import modules
const jwt = require('jsonwebtoken');
const secret = "qqiuqielcoqwmdfudgzivfkkloywganf";

module.exports = {
    createAccessToken: (user) => {
        const data = {
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin
        }

        return jwt.sign(data, secret, {});

    },
    decode: (token) => {
        let slicedToken = token.slice(7, token.length);
        return jwt.decode(slicedToken);
    },
    verify: (req, res, next) => {
        let token = req.headers.authorization;

        if (typeof token !== "undefined") {
            let slicedToken = token.slice(7, token.length)
            return jwt.verify(slicedToken, secret, (err, data) => {
                if (err) {
                    res.send({ auth: "failed authentication" })
                } next();
            })
        } res.send({ message: "undefined token" })
    }
}
const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {

    const token = req.headers.authorization

    if (!token) {
        return res.json({ message: "No token provided" })
    }

    try {

        const decoded = jwt.verify(token, process.env.SECRET_CODE)

        req.user = decoded

        next()

    } catch (error) {

        return res.json({ message: "Invalid token" })

    }
}

module.exports = authMiddleware
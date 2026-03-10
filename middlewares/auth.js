const jwt = require("jsonwebtoken")

module.exports = function(req, res, next){

    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.json({message:"No token provided"})
    }

    // Remove Bearer from token
    const token = authHeader.split(" ")[1]

    if(!token){
        return res.json({message:"Token format invalid"})
    }

    try{

        const decoded = jwt.verify(token, process.env.secretCode)

        req.user = decoded

        next()

    }catch(error){
        return res.json({message:"token is invalid or expired"})
    }

}
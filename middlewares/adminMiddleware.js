const User = require("../models/userModel")

const adminMiddleware = async (req, res, next) => {

    if(!req.user){
        return res.json({message:"User not authenticated"})
    }

    const user = await User.findById(req.user.user)

    if(!user){
        return res.json({message:"User not found"})
    }
       console.log("User role:", user.role) 
    if(user.role !== "admin"){
        return res.json({message:"Admin access required"})
    }

    next()
}

module.exports = adminMiddleware
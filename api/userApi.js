require("dotenv").config()
const express = require('express')
const bcrypt = require('bcrypt')
const jwt=require("jsonwebtoken")
const User = require("../models/userModel") 
const router = express.Router()
const secretCode="djehcunrencu37eyr74gedi347"
router.post('/signup', async (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const role = req.body.role
    const password = req.body.password
    console.log("name:", name)
    if(!email || !password ){
        return res.json({"message":"invalid request"})
    }
    const userCheck = await User.findOne({ email: email })
    console.log("userCheck: ", userCheck)
    if (userCheck) {
        return res.json({"message":"email already exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)//10 is the salt rounds
    const user = new User({
        name: name,
        email: email,
        role: role,
        password: hashedPassword
    })
    await user.save()
    res.json({"message":"success"})
})
router.post("/login",async(req,res)=>{
    const user=await User.findOne({email:req.body.email})
    if(!user){
        return res.json({message:"Email is invalid"})
    }
    console.log(user,user.password, req.body.password)
    
    const isPasswordMatching= await bcrypt.compare(req.body.password,user.password)
    
    if(!isPasswordMatching){
        return res.json({"message":"password invalid"})
    }
    try {
        const token = jwt.sign(
            { user: user._id },
            process.env.secretCode,
            { expiresIn: "1h" }
        )
        return res.json({ message: "login successfull", token: token })
        } catch (err) {
            console.log(err)
            return res.json({"message":"server error"})
    }
}) 
module.exports = router
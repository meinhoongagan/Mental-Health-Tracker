const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const loginSchema = require('../schemas/loginSchema')

router.post('/login',async (req,res)=>{
    try{
        await loginSchema.validateAsync(req.body);
        const {  email, password } = req.body; 
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        if(password === user.password){
            res.json({
                message: "Login successful",
                userId: user.id,
                email: user.email
            });
        }
        else{
            res.status(404).json("password incorrect")
        }
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router
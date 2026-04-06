
const User = require('../Models/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

// method to create a token ()using _id
const createToken = (_id) => {
          // id + secret + expire time  > we have a sign method in jwt to create a token > we are using _id as the payload ( data which we want to store in the token ) > secret is used to sign the token ( it can be any string but it should be kept secret ) > expiresIn is the time after which the token will expire ( we are setting it to 2 days ) 
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '2d' })
}


const signUpUser =  async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.signUp(email, password)
       
        const token = createToken(user._id)
       
        res.status(200).json({ email, token })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}
const loginUser =  async (req, res) => {

    const { email, password } = req.body;
    
    try {
        const user = await User.login(email, password)
       
        const token = createToken(user._id)
       
        res.status(200).json({ email, token })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = {
    loginUser,
    signUpUser
}









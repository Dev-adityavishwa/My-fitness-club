const User = require('../Models/userModel');

const jwt = require('jsonwebtoken');

const requireAuth = async (req, res, next) => {
    //verify authentication
    const { authorization } = req.headers; // we need to get the token from the headers ( we are sending the token in the headers in the frontend )
   
    if (!authorization) {
        return res.status(401).json({ error: 'Authentication required' })
    }
    
    // Bearer token is the standard format for sending the token in the headers ( it is a string that starts with Bearer followed by a space and then the token )
    // split makes an array of two elements ( Bearer and the token ) and we need to get the second element which is the token
    const token = authorization.split(' ')[1] // we need to split the token to get the actual token ( we are splitting the string by space and getting the second part which is the actual token )
//    need my json web token to verify the token ( we need to use the secret key that we used to sign the token in the backend )
    
    try {
        const {_id} = jwt.verify(token, process.env.SECRET) // we need to verify the token using the secret key ( if the token is valid then it will return the decoded token which contains the payload that we used to sign the token in the backend )
        req.User = await User.findOne({ _id }).select('_id') // we need to find the user in the database using the _id that we got from the decoded token and we need to attach the user to the request object so that we can access it in the next middleware or in the route handler
        next() // if the token is valid then we need to call the next middleware or the route handler

    } catch (err) {
        console.log(err)
        res.status(401).json({ error: 'Request is not authorized' })
    }

}


module.exports = requireAuth;
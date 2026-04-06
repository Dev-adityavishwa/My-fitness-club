const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const schema = mongoose.Schema;

// schema
const userSchema = new schema({
    email: {
        type: String,
        required: true,
        unique: true,
        // validate: {
        //     validator: validator.isEmail,
        //     message: 'Please enter a valid email'
        // }
    },
    password: {
        type: String,
        required: true,
    }
})

// static SignUp method
userSchema.statics.signUp = async function (email, password) {

    // validation
    if (!email || !password) {
        throw Error("All fields must be filled")
    }
    if(!validator.isEmail(email)){
        throw Error("Please enter a valid email");
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Please enter a strong password");
    }
    
    // check if email already exists
    // this refers to the model (User) when we call User.signUp() in the controller
    const exists = await this.findOne({ email })
    if (exists) {
        throw Error("Email already in use")
    }

    // hash the password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // create the user
    const user = await this.create({ email, password: hash })

    return user
}

userSchema.statics.login = async function (email, password) {
    // validation
    if (!email || !password) {
        throw Error("All fields must be filled")
    } 

    if(!validator.isEmail(email)){
        throw Error("Please enter a valid email");
    }
    // check if email exists
    const user = await this.findOne({ email })
    if (!user) {
        throw Error("Incorrect email")
    }
    const matchPass  = await bcrypt.compare(password, user.password)
    if(!matchPass){
        throw Error("Incorrect password")
    } 

    return user;
}


// table name > User
module.exports = mongoose.model('User', userSchema)




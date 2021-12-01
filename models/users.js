const mongoose = require("mongoose")
const { isEmail } = require("validator")


// userSchema
const userSchema = {
    firstName: {
        type: String,
        require: [true, "Please enter your first name"]
    },
    lastName: {
        type: String,
        require: [true, "Please enter your last name"]
    },
    otherNames: {
        type: String,
        require: false
    },
    phone: {
        type: String,
        require: [true, "Please enter your phone number"]
    },
    gender: {
        type: String,
        require: [true, "Please select your gender"]
    },
    DoB: {
        type: String,
        require: [true, "Please choose your date of birth"]
    },
    address: {
        type: String,
        require: [true, "Please provide your address"]
    },

    email: {
        type: String,
        require: [true, "Please enter your email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        require: [true, "Please enter your password"],
        minlength: [8, "Please password can not be less 8 characters"]
    },
    role: {
        type: String,
        default: "1"
    },
    date: {
        type: Date,
        default: Date.now
    },
    // Account Number - Auto generate 16 digit AccountNumber (4-digit+DoB+registration year)
    accountNumber: {
        type: String,
        default: Math.floor(1000 + Math.random() * 1000)
    }

}

// userModel
const User = mongoose.model("User", userSchema)
module.exports = User
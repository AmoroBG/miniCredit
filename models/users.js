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
    }

}

// userModel
const User = mongoose.model("User", userSchema)
module.exports = User
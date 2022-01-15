const mongoose = require("mongoose")
const { isEmail } = require("validator")


// userSchema
const userSchema = {

    email: { type: String, unique: true },
    password: String,
    authCode: Number,
    isEmailVerified: { type: Boolean, default: false }

}

// userModel
const User = mongoose.model("User", userSchema)
module.exports = User
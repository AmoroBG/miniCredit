const mongoose = require("mongoose")
    // userSchema
const userSchema = {
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
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
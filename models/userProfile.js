const mongoose = require("mongoose")
    // userSchema
const profileSchema = {
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
const Profile = mongoose.model("Profile", userSchema)
module.exports = Profile
const mongoose = require("mongoose")
    // userSchema
const userSchema = {
    firstName: {
        type: "String",
        require: true
    },
    lastName: {
        type: "String",
        require: true
    },
    email: {
        type: "String",
        require: true
    },
    date: {
        type: "date",
        default: Date.now
    }

}

// userModel
const User = mongoose.model("User", userSchema)
module.exports = User
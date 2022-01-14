const mongoose = require("mongoose")

// otherNames - Min (3), gender, DoB, address, email - Unique (true), password - Min (8), 
// accountNumber -  Auto generate 4 digit number + 12 digit phone number, registrationDate - Auto generate, Id - Auto generate
const profileSchema = {
    otherNames: {
        type: String,
    },
    phone: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        default: "Male"
    },
    // DoB: {
    //     type: Date,
    //     require: true
    // },
    address: {
        type: String,
        require: true
    },
    // profileImage: {
    //     type: String,
    //     require: true
    // },
    accountNumber: {
        type: String,
        default: Math.floor(1000 + Math.random() * 9000)
    }
}

const Profile = mongoose.model("Profile", profileSchema)
module.exports = Profile
const mongoose = require("mongoose")

// OtherNames, Phone, Gender, DoB, Address, ProfileImage, AccountNumber
const profileSchema = {
    othernames: {
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
    DoB: {
        type: Date,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    profileImage: {
        type: String,
        require: true
    },
    accountNumber: {
        type: String,
        default: Math.floor(1000 + Math.random() * 9000)
    }
}

const Profile = mongoose.model("Profile", profileSchema)
module.exports = Profile
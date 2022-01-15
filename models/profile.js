const mongoose = require("mongoose")
const  schema = mongoose.Schema
// otherNames - Min (3), gender, DoB, address, email - Unique (true), password - Min (8), 
// accountNumber -  Auto generate 4 digit number + 12 digit phone number, registrationDate - Auto generate, Id - Auto generate
const profileSchema = {
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    phone: {
        type: String
    },
    gender: {
        type: String
    },
    // DoB: {
    //     type: Date,
    //     require: true
    // },
    address: {
        type: String
    },
    // profileImage: {
    //     type: String,
    //     require: true
    // },
    accountNumber: {
        type: String
    },
    userId: {type: schema.Types.ObjectId, required: true, ref: 'User'}
}

const Profile = mongoose.model("Profile", profileSchema)
module.exports = Profile
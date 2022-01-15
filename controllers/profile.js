const Profile = require("../models/profile")

exports.updateUserProfile = async (req, res) => {
// userid is passed as params from frontend
    const profileData = {
        firstName: req.body.firstName.toLowerCase(),
        lastName: req.body.lastName.toLowerCase(),
        phone: req.body.phone,
        gender: req.body.gender,
        address: req.body.address,
        accountNumber: Math.floor(1000 + Math.random() * 1000) + req.body.phone
    };

    await  Profile.updateOne( {userId: req.params.userId}, { $set: profileData }).then((data) => {
        
        res.status(200).send({
            message:"success"
        });

    }).catch((error) => {
            res.status(500).send({
            message:
                error.message || "error."
        });
    });
}

// Retrieve all User Profile - GET - "/"
exports.getAllProfile = function(req, res) {
        Profile.find().then(function(profile) {
            res.status(200).json(profile)
        }).catch(function(err) {
            res.status(500).json({
                error: err
            })
        })
    }
    // Retrieve one User Profile - GET - "/:profileId"
exports.getOneProfile = function(req, res) {
    Profile.findById(req.params.profileId).then(function(profile) {
        res.status(200).json(profile)
    }).catch(function(err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}

// Create user Profile - POST - "/"
// OtherNames, Phone, Gender, DoB, Address, ProfileImage, AccountNumber
exports.createProfile = function(req, res) {
    const profile = new Profile({
        otherNames: req.body.otherNames,
        phone: req.body.phone,
        gender: req.body.gender,
        address: req.body.address,
    })
    profile.save().then(function() {
        res.status(200).json({
            message: "User Profile Created"
        })
    }).catch(function(err) {
        res.status(500).json({
            error: err
        })
    })
}

// Delete all User Profile - DELETE - "/"
exports.deleteAllprofile = function(req, res) {
    Profile.deleteMany().then(function() {
        res.status(200).json({
            message: "All User Profile deleted"
        })
    }).catch(function(err) {
        res.status(500).json({
            error: err
        })
    })
}


// Delete one User profile - DELETE - "/:profileId"
exports.deleteOneProfile = function(req, res) {
    Profile.findByIdAndRemove(req.params.profileId).then(function() {
        res.status(200).json({
            message: "User Profile deleted"
        })
    }).catch(function(err) {
        res.status(500).json({
            error: err
        })
    })
}

// Update all User profile - PUT - "/:profileId"
// OtherNames, Phone, Gender, DoB, Address, ProfileImage, AccountNumber
exports.updateAllProfile = function(req, res) {
    Profile.findByIdAndUpdate({ _id: req.params.profileId }, { otherNames: req.body.otherNames, phone: req.body.phone, gender: req.body.gender, DoB: req.body.DoB, address: req.body.address }, { new: true }).then(function() {
        res.status(201).json({
            message: "Profile Updated"
        })
    }).catch(function(err) {
        res.status(500).json({
            error: err
        })
    })
}


// Update a specific record of User profile - PATCH - "/:userId"
exports.updateOneProfile = function(req, res) {
    Profile.findOneAndUpdate({ _id: req.params.profileId }, { $set: req.body }).then(function() {
        res.status(201).json({
            message: "Profile updated"
        })
    }).catch(function(err) {
        res.status(500).json({
            error: err
        })
    })
}
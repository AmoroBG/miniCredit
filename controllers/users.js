const User = require("../models/users")

// Register user - POST - "/register"
exports.postUser = function(req, res) {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    })
    user.save().then(function() {
        res.send("User successfully added to db")
    }).catch(function(err) {
        res.send(err)
    })
}

// Retrieve all users - GET - "/"
exports.getAllUsers = function(req, res) {
        User.find().then(function(users) {
            res.send(users)
        }).catch(function(err) {
            res.send(err)
        })
    }
    // Retrieve one user - GET - "/:userId"
exports.getOneUser = function(req, res) {
    User.findById(req.params.userId).then(function(user) {
        res.send(user)
    }).catch(function(err) {
        res.send(err)
    })
}

// Delete all users - DELETE - "/users"
exports.deleteAllUsers = function(req, res) {
    User.remove().then(function() {
        res.send("All users successfuly deleted")
    }).catch(function(err) {
        res.send(err)
    })
}

// Delete one user - DELETE - "/:userId"
exports.deleteOneUser = function(req, res) {
    User.findByIdAndRemove(req.params.userId).then(function() {
        res.send("User successfully deleted")
    }).catch(function(err) {
        res.send(err)
    })
}

// Update all records of a user - PUT - "/:userId"
exports.updateAllUserRecords = function(req, res) {
    User.findOneAndUpdate(req.params.userId, { firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email }, { new: true }).then(function() {
        res.send("User records successfully updated")
    }).catch(function(err) {
        res.send(err)
    })
}

// Update a specific record of a user - PATCH - "/:userId"
exports.updateSomeUserRecords = function(req, res) {
    User.findOneAndUpdate(req.params.userId, { $set: req.body }).then(function() {
        res.send("User record successfully updated")
    }).catch(function(err) {
        res.send(err)
    })
}
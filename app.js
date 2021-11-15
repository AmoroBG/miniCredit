// REQUIRE MODULES
const express = require("express")
const mongoose = require("mongoose")


// IMPORT MODULES- OWN MODULES/ FILES
const dbconnect = require("./server/database/database")
const usersRoute = require("./routes/users")





// GLOBAL VARIABLES


// INITIALIZE APP
const app = express()

// DB CONNECTION
dbconnect





// MIDDLEWARE

// body-parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// ROUTES

// Home Route
app.get("/", function(req, res) {
    res.send("<h2> Welcome to Mini Credit </h2>")
})

// Users Route
app.use("/users", usersRoute)





// Retrieve one user - GET - "/users/:userId"
app.get("/users/:userId", function(req, res) {
    User.findById(req.params.userId).then(function(user) {
        res.send(user)
    }).catch(function(err) {
        res.send(err)
    })
})


// Delete all users - DELETE - "/users"
app.delete("/users", function(req, res) {
    User.remove().then(function() {
        res.send("All users successfuly deleted")
    }).catch(function(err) {
        res.send(err)
    })
})

// Delete one user - DELETE - "/users/:userId"
app.delete("/users/:userId", function(req, res) {
    User.findByIdAndRemove(req.params.userId).then(function() {
        res.send("User successfully deleted")
    }).catch(function(err) {
        res.send(err)
    })
})

// Update all records of a user - PUT - "/users/:userId"
app.put("/users/:userId", function(req, res) {
    User.findOneAndUpdate(req.params.userId, { firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email }, { new: true }).then(function() {
        res.send("User records successfully updated")
    }).catch(function(err) {
        res.send(err)
    })
})

// Update a specific record of a user - PATCH - "/users/:userId"
app.patch("/users/:userId", function(req, res) {
    User.findOneAndUpdate(req.params.userId, { $set: req.body }, { new: true }).then(function() {
        res.send("User record successfully updated")
    }).catch(function(err) {
        res.send(err)
    })
})

// SERVER
const PORT = process.env.PORT || 3000
app.listen(PORT, function() {
    console.log(`Server Listening on port ${PORT}`);
})
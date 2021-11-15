const express = require("express")
const router = express.Router()


// const User = require("../models/users")
const users = require("../controllers/users")


// Register user - POST - "/register"
router.post("/register", users.postUser)

// Retrieve all users - GET - "/"
router.get("/", users.getAllUsers)

// Retrieve one user - GET - "/:userId"
router.get("/:userId", users.getOneUser)


// Delete all users - DELETE - "/users"
router.delete("/", users.deleteAllUsers)

// Delete one user - DELETE - "/:userId"
router.delete("/:userId", users.deleteOneUser)

// Update all records of a user - PUT - "/:userId"
router.put("/:userId", users.updateAllUserRecords)

// Update a specific record of a user - PATCH - "/:userId"
router.patch("/:userId", users.updateSomeUserRecords)




module.exports = router
const express = require("express")

const router = express.Router()

const profile = require("../controllers/profile")


// updateUser profile
router.put("/update-profile/:userId", profile.updateUserProfile)
// Retrieve all User Profile - GET - "/"
router.get("/", profile.getAllProfile)

// Retrieve one User Profile - GET - "/:profileId"
router.get("/:profileId", profile.getOneProfile)

// Create user Profile - POST - "/"
// OtherNames, Phone, Gender, DoB, Address, ProfileImage, AccountNumber
router.post("/", profile.createProfile)

// Delete all User Profile - DELETE - "/"
router.delete("/", profile.deleteAllprofile)

// Delete one User profile - DELETE - "/:profileId"
router.delete("/:profileId", profile.deleteOneProfile)


// Update all User profile - PUT - "/:profileId"
// OtherNames, Phone, Gender, DoB, Address, ProfileImage, AccountNumber
router.put("/:profileId", profile.updateAllProfile)

// Update a specific record of User profile - PATCH - "/:userId"
router.patch("/:profileId", profile.updateOneProfile)


module.exports = router
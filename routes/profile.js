const express = require("express")
const router = express.Router()


router.get("/", function(req, res) {
    console.log("Profile");
    res.status(200).json({
        message: "Success"
    })
})


module.exports = router
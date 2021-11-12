// REQUIRE MODULES
const express = require("express")


// IMPORT MODULES- OWN MODULES/ FILES


// GLOBAL VARIABLES


// INITIALIZE APP
const app = express()

// DB CONNECTION


// MIDDLEWARE


// ROUTES

// Home Route
app.get("/", function(req, res) {
    res.send("<h2> Welcome to Mini Credit </h2>")
})

// SERVER
const PORT = process.env.PORT || 3000
app.listen(PORT, function() {
    console.log(`Server Listening on port ${PORT}`);
})
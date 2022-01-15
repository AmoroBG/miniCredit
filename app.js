// REQUIRE MODULES
const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")



// IMPORT MODULES- OWN MODULES/ FILES
const dbconnect = require("./server/database/database")
const usersRoute = require("./routes/users")
const profileRoute = require("./routes/profile")
const loanRoute = require("./routes/loan")


// LOAD CONFIG
dotenv.config({ path: "./server/config/config.env" })

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
    // Users Profile Route
app.use("/profile", profileRoute)
    // Loans Route
app.use("/loan", loanRoute)


// SERVER
const PORT = 3000
app.listen(PORT, function() {
    console.log(`Server Listening on port ${PORT}`);
})
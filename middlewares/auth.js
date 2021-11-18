const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")


// LOAD CONFIG
dotenv.config({ path: "../server/config/config.env" })

module.exports = requireAuthentication = function(req, res, next) {
    const authHeader = req.get("Authorization")
    if (!authHeader) {
        const error = new Error("Not Authenticated")
        error.statusCode = 401
        throw error
    }
    const token = authHeader.split(" ")[1]
    let decodedToken
    try {

        decodedToken = jwt.verify(token, process.env.JWT_KEY)
    } catch (err) {
        err.statusCode = 500
        throw err
    }
    if (!decodedToken) {
        const error = new Error("Not Authenticated")
        error.statusCode = 401
        throw error
    }
    req.userId = decodedToken.userId
    next()
}


// if (!token) {
//     return res.status(401).json({
//         message: "Unauthorized"
//     })
// }
// jwt.verify(token, process.env.JWT_KEY, function(err, decodedToken) {
//     if (err) {
//         return res.status(401).json({
//             message: "Unauthorized"
//         })
//     } else {
//         next()
//     }
// })
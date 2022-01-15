import verify from "jsonwebtoken";
import secret from "../config/authConfig.js";
import User from "../models/user.js";

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]
     console.log(token)
    if (!token) {
        return res.status(403).send({ message: "No token provided!" })
    }

    verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" })
        }
        req.userId = decoded.id;
        next();
    });
}

export default verifyToken

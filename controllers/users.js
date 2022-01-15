const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

const User = require("../models/users")
const Profile = require("../models/profile")
const { use } = require('express/lib/application')
const generateOTP = require("../helpers/generateOtp");
const verifyEmailTemplate = require("../templates/verifyEmailTemplate")
const sendEmail = require("../helpers/sendEmail")

// LOAD CONFIG
dotenv.config({ path: "../server/config/config.env" })

// Register user - POST - "/register"
exports.registerUser = async (req, res) => {

    let authCode = generateOTP()
    // console.log(authCode)
    if(!req.body.email){
        res.status(400).send({message: "Email cannot be empty"});
        return
    }
    if(!req.body.password){
        res.status(400).send({message: "Password cannot be empty"});
        return
    }
    // Create a user
    const user = new User({
        email: req.body.email.toLowerCase(),
        password: bcrypt.hashSync(req.body.password, 8),
        authCode: authCode
    });
    // let template = VerifyEmailTemplate(email, authCode)
    await user
        .save(user)
        .then( async(data) => {
            // success creating account send code to user
            let template = verifyEmailTemplate(data.email, authCode)
            try {
       sendEmail(
            data.email,
            "mendyak99@gmail.com",
            "Email Verification",
            template,
            "Test"
          );
            } catch(e){
                console.log('in send eamil catch...')
               console.log(e)     
            }
            let dataToReturn = {
                id: data.id,
                email: data.email,
                authCode: authCode,
                isEmailVerified: data.isEmailVerified
            }
            // create profile instance
          const userProfileInstance =  new Profile({
              userId: data.id,
          })
          await userProfileInstance.save(userProfileInstance).then((profileRes) => {
            res.send({
                message: "success",
                userInfo: dataToReturn
            });
          })
        })
        .catch(err => {
            console.log('in catch...')
            res.status(500).send({
                message:
                    err.message || "error."
            });
        });


}

// verify email or phone

exports.verifyAccount = (req, res) => {

    // to refactored later
    if(!req.body.email){
        res.status(400).send({message: "Email cannot be empty"});
        return
    }
    if(!req.body.code){
        res.status(400).send({message: "Code cannot be empty"});
        return
    }
    User.findOne({
        email: req.body.email
    }).exec( async (err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            if (parseInt(user.authCode) !== parseInt(req.body.code)){
                return res.status(401).send({message: "invalid code"})
            }
        // await findOneAndUpdate
         await  User.updateOne( {email : req.body.email }, { $set: { isEmailVerified: true }}).then((data) => {
            //  console.log(data)
            let dataToReturn = {
            id: user._id,
            email: user.email,
            isEmailVerified: 'true'
        }
            res.status(200).send({
                message:"success",
                userInfo: dataToReturn
            });

        }).catch((error) => {
                res.status(500).send({
                message:
                    error.message || "error."
            });
        });
    })
}

// Retrieve all users - GET - "/"
exports.getAllUsers = function(req, res) {
        User.find().then(function(users) {
            res.status(200).json(users)

        }).catch(function(err) {
            res.status(500).json({
                error: err
            })
        })
    }
    // Retrieve one user - GET - "/:userId"
exports.getOneUser = function(req, res) {
    User.findById(req.params.userId).then(function(user) {
        res.status(200).json(user)
    }).catch(function(err) {
        res.status(500).json({
            error: err
        })
    })
}

// Delete all users - DELETE - "/"
exports.deleteAllUsers = function(req, res) {
    User.remove().then(function() {
        res.status(200).json({
            message: "All users successfuly deleted"
        })
    }).catch(function(err) {
        res.status(500).json({
            error: err
        })
    })
}

// Delete one user - DELETE - "/:userId"
exports.deleteOneUser = function(req, res) {
    User.findByIdAndRemove(req.params.userId).then(function() {
        res.status(200).json({
            message: "User deleted"
        })
    }).catch(function(err) {
        res.status(500).json({
            error: err
        })
    })
}

// Update all records of a user - PUT - "/:userId"
exports.updateAllUserRecords = function(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: req.body.password }, { new: true }).then(function() {
        res.status(201).json({
            message: "User records updated"
        })
    }).catch(function(err) {
        res.status(500).json({
            error: err
        })
    })
}

// Update a specific record of a user - PATCH - "/:userId"
exports.updateSomeUserRecords = function(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }).then(function() {
        res.status(201).json({
            message: "User record updated"
        })
    }).catch(function(err) {
        res.status(500).json({
            error: err
        })
    })
}


// User Login - POST - "/login"
exports.userLogin = function(req, res) {
    User.find({ email: req.body.email }).exec().then(function(user) {
        if (user.length < 1) {
            console.log("0 zero");
            return res.status(401).json({
                message: "Auth Failed!"
            })
        }
        bcrypt.compare(req.body.password, user[0].password, function(err, result) {
            if (err) {
                console.log(err + "1");
                return res.status(401).json({
                    message: "Auth Failed!"
                })
            }
            if (result) {
                // The user to login here
                const token = jwt.sign({ email: user[0].email, userId: user[0]._id }, process.env.JWT_KEY, { expiresIn: "1h" })
                return res.status(200).json({
                    message: "Auth Successful",
                    token: token,
                    userId: user[0]._id.toString()
                })
            }
            return res.status(401).json({
                message: "Auth Failed!"
            })
        })
    }).catch(function(err) {
        res.status(500).json({
            error: err
        })
    })
}

// User Logout - GET - "/logout"
exports.userLogout = function(req, res) {
    res.cookie("jwt", " ", { maxAge: 1 })
    res.json({
        message: "Logout"
    })
}
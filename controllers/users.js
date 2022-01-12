const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const User = require("../models/users");
const { use } = require("express/lib/application");

// LOAD CONFIG
dotenv.config({ path: "../server/config/config.env" });

// Register user - POST - "/register"
exports.registerUser = function (req, res) {
  // check if email already exist
  User.find({ email: req.body.email })
    .exec()
    .then(function (user) {
      if (user.length >= 1) {
        res.status(409).json({
          message: "This phone number is already registered!",
        });
      } else {
        // hash password
        bcrypt.hash(req.body.password, 12, function (err, hash) {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            // create user

            const user = new User({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              otherNames: req.body.otherNames,
              phone: req.body.phone,
              gender: req.body.gender,
              DoB: req.body.DoB,
              address: req.body.address,
              email: req.body.email,
              password: hash,
              accountNumber:
                Math.floor(1000 + Math.random() * 1000) + req.body.phone,
            });

            user
              .save()
              .then(function () {
                res.status(201).json({
                  message: "Registration successful",
                });
              })
              .catch(function (err) {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};

// Retrieve all users - GET - "/"
exports.getAllUsers = function (req, res) {
  User.find()
    .then(function (users) {
      res.status(200).json(users);
    })
    .catch(function (err) {
      res.status(500).json({
        error: err,
      });
    });
};
// Retrieve one user - GET - "/:userId"
exports.getOneUser = function (req, res) {
  User.findById(req.params.userId)
    .then(function (user) {
      res.status(200).json(user);
    })
    .catch(function (err) {
      res.status(500).json({
        error: err,
      });
    });
};

// Delete all users - DELETE - "/"
exports.deleteAllUsers = function (req, res) {
  User.remove()
    .then(function () {
      res.status(200).json({
        message: "All users successfuly deleted",
      });
    })
    .catch(function (err) {
      res.status(500).json({
        error: err,
      });
    });
};

// Delete one user - DELETE - "/:userId"
exports.deleteOneUser = function (req, res) {
  User.findByIdAndRemove(req.params.userId)
    .then(function () {
      res.status(200).json({
        message: "User deleted",
      });
    })
    .catch(function (err) {
      res.status(500).json({
        error: err,
      });
    });
};

// Update all records of a user - PUT - "/:userId"
exports.updateAllUserRecords = function (req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    },
    { new: true }
  )
    .then(function () {
      res.status(201).json({
        message: "User records updated",
      });
    })
    .catch(function (err) {
      res.status(500).json({
        error: err,
      });
    });
};

// Update a specific record of a user - PATCH - "/:userId"
exports.updateSomeUserRecords = function (req, res) {
  User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body })
    .then(function () {
      res.status(201).json({
        message: "User record updated",
      });
    })
    .catch(function (err) {
      res.status(500).json({
        error: err,
      });
    });
};

// User Login - POST - "/login"
exports.userLogin = function (req, res) {
  User.find({ email: req.body.email })
    .exec()
    .then(function (user) {
      if (user.length < 1) {
        console.log("0 zero");
        return res.status(401).json({
          message: "Auth Failed!",
        });
      }
      bcrypt.compare(
        req.body.password,
        user[0].password,
        function (err, result) {
          if (err) {
            console.log(err + "1");
            return res.status(401).json({
              message: "Auth Failed!",
            });
          }
          if (result) {
            // The user to login here
            const token = jwt.sign(
              { email: user[0].email, userId: user[0]._id },
              process.env.JWT_KEY,
              { expiresIn: "1h" }
            );
            return res.status(200).json({
              message: "Auth Successful",
              token: token,
              userId: user[0]._id.toString(),
            });
          }
          return res.status(401).json({
            message: "Auth Failed!",
          });
        }
      );
    })
    .catch(function (err) {
      res.status(500).json({
        error: err,
      });
    });
};

// User Logout - GET - "/logout"
exports.userLogout = function (req, res) {
  res.cookie("jwt", " ", { maxAge: 1 });
  res.json({
    message: "Logout",
  });
};

import User from "../models/user.js";

const checkDuplicateAccounts = (req, res, next) => {

    User.findOne({
        email: req.body.email.toLocaleLowerCase()
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: "Failed! Email is already in use!" });
            return;
        }

        next();
    });
};

export default checkDuplicateAccounts

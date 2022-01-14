const Loan = require("../models/loan")


// Add loan/ Raise ticket - POST - "/add"
exports.addLoan = function(req, res) {
    // loanId, loanName, loanDescription, loanOpenDate, availableCash, interestRate, loanDuration, loanStatus [opened exhausted, closed], ownerDetails

    const loan = new Loan({
        loanName: req.body.loanName,
        loanDescription: req.body.loanDescription,
        availableCash: req.body.availableCash,
        interestRate: req.body.interestRate,
        loanDuration: req.body.loanDuration
    })
    loan.save().then(function() {
        res.status(200).json({
            message: "Loan Added"
        })
    }).catch(function(err) {
        res.status(500).json({
            error: err
        })
    })
}

// Retrieve all loans - GET - "/"
exports.getAllLoans = function(req, res) {
        Loan.find().then(function(loans) {
            res.status(200).json(loans)

        }).catch(function(err) {
            res.status(500).json({
                error: err
            })
        })
    }
    // Retrieve one loan - GET - "/:loanId"
exports.getOneLoan = function(req, res) {
    Loan.findById(req.params.loanId).then(function(loan) {
        res.status(200).json(loan)
    }).catch(function(err) {
        res.status(500).json({
            error: err
        })
    })
}

// Delete all loans - DELETE - "/"
exports.deleteAllLoans = function(req, res) {
    Loan.remove().then(function() {
        res.status(200).json({
            message: "All Loans deleted"
        })
    }).catch(function(err) {
        res.status(500).json({
            error: err
        })
    })
}

// Delete one loan - DELETE - "/:loanId"
exports.deleteOneLoan = function(req, res) {
    Loan.findByIdAndRemove(req.params.loanId).then(function() {
        res.status(200).json({
            message: "Loan deleted"
        })
    }).catch(function(err) {
        res.status(500).json({
            error: err
        })
    })
}


// Update all records of a loan - PUT - "/:loanId"
exports.updateAllLoanRecords = function(req, res) {
    Loan.findOneAndUpdate({ _id: req.params.loanId }, { loanName: req.body.loanName, loanDescription: req.body.loanDescription, availableCash: req.body.availableCash, interestRate: req.body.interestRate, loanDuration: req.body.loanDuration }, { new: true }).then(function() {
        res.status(201).json({
            message: "Loan records updated"
        })
    }).catch(function(err) {
        res.status(500).json({
            error: err
        })
    })
}

// Update a specific record of a loan - PATCH - "/:loanId"
exports.updateSomeLoanRecords = function(req, res) {
    Loan.findOneAndUpdate({ _id: req.params.loanId }, { $set: req.body }).then(function() {
        res.status(201).json({
            message: "Loan record updated"
        })
    }).catch(function(err) {
        res.status(500).json({
            error: err
        })
    })
}
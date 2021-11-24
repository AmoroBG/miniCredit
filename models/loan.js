// loanId, loanName, loanDescription, loanOpenDate, availableCash, interestRate, loanDuration, loanStatus [opened exhausted, closed], ownerDetails

const mongoose = require("mongoose")

const loanSchema = {
    loanName: {
        type: String,
        require: true
    },
    loanDescription: {
        type: String,
        require: true
    },
    availableCash: {
        type: String,
        require: true
    },
    interestRate: {
        type: String,
        require: true
    },
    loanDuration: {
        type: String,
        require: true
    },
    loanStatus: {
        type: String,
        default: "Closed"
    },
    loanOpenDate: {
        type: Date,
        default: Date.now
    }
}

const Loan = mongoose.model("Loan", loanSchema)

module.exports = Loan
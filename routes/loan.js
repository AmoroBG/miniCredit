const express = require("express")
const router = express.Router()


const loan = require("../controllers/loan")


// Add loan/ Raise ticket - POST - "/add"
router.post("/add", loan.addLoan)

// Retrieve all loans - GET - "/"
router.get("/", loan.getAllLoans)

// Retrieve one loan - GET - "/:loanId"
router.get("/:loanId", loan.getOneLoan)

// Delete all loans - DELETE - "/"
router.delete("/", loan.deleteAllLoans)

// Delete one loans - DELETE - "/:loanId"
router.delete("/:loanId", loan.deleteOneLoan)

// Update all records of a loan - PUT - "/:loanId"
router.put("/:loanId", loan.updateAllLoanRecords)

// Update a specific record of a loan - PATCH - "/:loanId"
router.patch("/:loanId", loan.updateSomeLoanRecords)




module.exports = router
const express = require("express");
const router = express.Router();
const { getCustomerOverallSales } = require("../controllers/customerOverallSalesController");

router.get("/getCustomerOverallSales", getCustomerOverallSales);

module.exports = router;

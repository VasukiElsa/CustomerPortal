const express = require("express");
const router = express.Router();
const { getCustomerAgingData } = require("../controllers/customerAgingController");

router.get("/getCustomerAging", getCustomerAgingData);

module.exports = router;

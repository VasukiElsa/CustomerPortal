const express = require("express");
const router = express.Router();
const { getCustomerInquiryData } = require("../controllers/customerInquiryController");

router.get("/getCustomerInquiry", getCustomerInquiryData);

module.exports = router;

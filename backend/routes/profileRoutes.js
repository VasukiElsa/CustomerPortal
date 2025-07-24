const express = require("express");
const router = express.Router();
const { getCustomerProfile } = require("../controllers/customerProfileController");

router.get("/getCustomerProfile", getCustomerProfile);

module.exports = router

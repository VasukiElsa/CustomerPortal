const express = require("express");
const router = express.Router();
const { getCustomerDeliveries } = require("../controllers/customerDeliveryController");

router.get("/getDeliveries", getCustomerDeliveries);

module.exports = router;

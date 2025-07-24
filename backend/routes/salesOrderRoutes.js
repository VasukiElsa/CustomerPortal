const express = require("express");
const router = express.Router();
const { getCustomerSalesOrders } = require("../controllers/customerSalesOrderController");

router.get("/getSalesOrders", getCustomerSalesOrders);

module.exports = router;

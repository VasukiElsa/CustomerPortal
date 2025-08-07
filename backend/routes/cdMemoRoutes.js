const express = require("express");
const router = express.Router();
const { getCustomerCdMemo } = require("../controllers/customerCdMemoController");

router.get("/getCustomerCdMemo", getCustomerCdMemo);

module.exports = router;

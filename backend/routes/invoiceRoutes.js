const express = require('express');
const router = express.Router();
const customerInvoiceController = require('../controllers/customerInvoiceController');

router.get('/fetch-customer-invoice/:customerId', customerInvoiceController.fetchCustomerInvoices);
router.get('/pdf/:invoiceNumber', customerInvoiceController.serveCustomerPDF);

module.exports = router;

const express = require('express');
const router = express.Router();
const { customerLogin } = require('../controllers/customerControllers.js');

// Define the route
router.get('/customer-login', customerLogin);

module.exports = router;

//2 Index.js navigates the request to this router.
//Here the specific router '/customer-login will handle controls to the "customerLogin" controller function
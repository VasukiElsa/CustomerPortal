require('dotenv').config();

module.exports = {
  sapHost: process.env.SAP_HOST,
  sapUsername: process.env.SAP_USERNAME,
  sapPassword: process.env.SAP_PASSWORD
};

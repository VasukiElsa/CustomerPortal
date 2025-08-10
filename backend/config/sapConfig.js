require('dotenv').config();

module.exports = {
  sapHost: process.env.SAP_HOST,
  sapUsername: process.env.SAP_USERNAME,
  sapPassword: process.env.SAP_PASSWORD,
  sapProfileUrl : process.env.SAP_PROFILE_URL,
  sapInquiryUrl: process.env.SAP_INQUIRY_URL,
  sapSalesOrderUrl: process.env.SAP_SALESORDER_URL,
  sapDeliveryUrl: process.env.SAP_DELIVERY_URL,
  sapBaseUrl: process.env.SAP_BASE_URL,
  sapAgingUrl: process.env.SAP_AGING_URL,
  sapCdMemoUrl: process.env.SAP_CDMEMO_URL,
  sapOverallSalesUrl: process.env.SAP_OVERALLSALES_URL
};
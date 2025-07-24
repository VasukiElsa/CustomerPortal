const axios = require("axios");
const xml2js = require("xml2js");
const { sapSalesOrderUrl, sapUsername, sapPassword } = require("../config/sapConfig");

const getCustomerSalesOrders = async (req, res) => {
  const rawCustId = req.query.custId;

  if (!rawCustId) {
    return res.status(400).json({ error: "Missing query parameter: custId" });
  }

  const custId = rawCustId.padStart(10, "0");

  const soapBody = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                      xmlns:urn="urn:sap-com:document:sap:rfc:functions">
      <soapenv:Header/>
      <soapenv:Body>
        <urn:ZFM_CUST_SALES_ORDER>
          <IV_CUSTID>${custId}</IV_CUSTID>
        </urn:ZFM_CUST_SALES_ORDER>
      </soapenv:Body>
    </soapenv:Envelope>`;

  try {
    const response = await axios.post(sapSalesOrderUrl, soapBody, {
      headers: {
        "Content-Type": "text/xml;charset=UTF-8",
        "SOAPAction": ""
      },
      auth: {
        username: sapUsername,
        password: sapPassword
      }
    });

    xml2js.parseString(response.data, { explicitArray: false }, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Failed to parse SOAP response" });
      }

      const body = result["soap-env:Envelope"]["soap-env:Body"];
      const salesOrders = body["n0:ZFM_CUST_SALES_ORDERResponse"]["EV_RESULT"]["item"];

      res.json(Array.isArray(salesOrders) ? salesOrders : [salesOrders]); // Always return array
    });

  } catch (error) {
    console.error("SOAP Request Error:", error.message);
    res.status(500).json({ error: "Failed to fetch sales orders", details: error.message });
  }
};

module.exports = {
  getCustomerSalesOrders
};

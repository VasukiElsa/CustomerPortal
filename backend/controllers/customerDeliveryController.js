const axios = require("axios");
const xml2js = require("xml2js");
const { sapUsername, sapPassword } = require("../config/sapConfig");

// Add the delivery service URL to your .env and sapConfig
const sapDeliveryUrl = process.env.SAP_DELIVERY_URL;

const getCustomerDeliveries = async (req, res) => {
  const rawCustId = req.query.custId;
  if (!rawCustId) return res.status(400).json({ error: "Missing query parameter: custId" });

  const custId = rawCustId.padStart(10, "0");

  const soapBody = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                      xmlns:urn="urn:sap-com:document:sap:rfc:functions">
      <soapenv:Header/>
      <soapenv:Body>
        <urn:ZFM_CUST_LISTOFDELIVERY>
          <IV_CUSTID>${custId}</IV_CUSTID>
        </urn:ZFM_CUST_LISTOFDELIVERY>
      </soapenv:Body>
    </soapenv:Envelope>`;

  try {
    const response = await axios.post(sapDeliveryUrl, soapBody, {
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
      if (err) return res.status(500).json({ error: "Failed to parse SOAP response" });

      const deliveries = result["soap-env:Envelope"]["soap-env:Body"]["n0:ZFM_CUST_LISTOFDELIVERYResponse"]["EV_RESULT"]["item"];

      res.json(Array.isArray(deliveries) ? deliveries : [deliveries]);
    });

  } catch (error) {
    console.error("SOAP Request Error:", error.message);
    res.status(500).json({ error: "Failed to fetch delivery data", details: error.message });
  }
};

module.exports = {
  getCustomerDeliveries
};

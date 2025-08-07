const axios = require("axios");
const xml2js = require("xml2js");
const { sapOverallSalesUrl, sapUsername, sapPassword } = require("../config/sapConfig");

const getCustomerOverallSales = async (req, res) => {
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
        <urn:ZFM_CUST_OSALESDATA>
          <IV_CUST_ID>${custId}</IV_CUST_ID>
        </urn:ZFM_CUST_OSALESDATA>
      </soapenv:Body>
    </soapenv:Envelope>`;

  try {
    const response = await axios.post(sapOverallSalesUrl, soapBody, {
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
      const data = body["n0:ZFM_CUST_OSALESDATAResponse"];

      if (!data) {
        return res.status(404).json({ error: "No response from SAP." });
      }

      const salesItems = data.EV_RESULT?.item || [];

      res.json({
        sales: Array.isArray(salesItems) ? salesItems : [salesItems],
      });
    });

  } catch (error) {
    console.error("SOAP Request Error:", error.message);
    res.status(500).json({ error: "Failed to fetch overall sales data", details: error.message });
  }
};

module.exports = {
  getCustomerOverallSales
};

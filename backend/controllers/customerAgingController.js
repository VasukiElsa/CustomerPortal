const axios = require("axios");
const xml2js = require("xml2js");
const { sapAgingUrl, sapUsername, sapPassword } = require("../config/sapConfig");

const getCustomerAgingData = async (req, res) => {
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
        <urn:ZFM_CUST_AGING_PAYMENT>
          <IV_CUST_ID>${custId}</IV_CUST_ID>
        </urn:ZFM_CUST_AGING_PAYMENT>
      </soapenv:Body>
    </soapenv:Envelope>`;

  try {
    const response = await axios.post(sapAgingUrl, soapBody, {
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
      const responseData = body["n0:ZFM_CUST_AGING_PAYMENTResponse"];

      if (!responseData || !responseData.EV_RESULT) {
        return res.status(404).json({ message: "No aging data found." });
      }

      const items = responseData.EV_RESULT.item;
      res.json(Array.isArray(items) ? items : [items]); // Ensure array
    });

  } catch (error) {
    console.error("SOAP Request Error:", error.message);
    res.status(500).json({ error: "Failed to fetch aging data", details: error.message });
  }
};

module.exports = {
  getCustomerAgingData
};

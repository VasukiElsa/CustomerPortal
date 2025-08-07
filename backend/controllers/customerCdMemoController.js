const axios = require("axios");
const xml2js = require("xml2js");
const { sapCdMemoUrl, sapUsername, sapPassword } = require("../config/sapConfig");

const getCustomerCdMemo = async (req, res) => {
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
        <urn:ZFM_CUST_CDMEMO_FI>
          <IV_CUST_ID>${custId}</IV_CUST_ID>
        </urn:ZFM_CUST_CDMEMO_FI>
      </soapenv:Body>
    </soapenv:Envelope>`;

  try {
    const response = await axios.post(sapCdMemoUrl, soapBody, {
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
      const data = body["n0:ZFM_CUST_CDMEMO_FIResponse"];

      if (!data) {
        return res.status(404).json({ error: "No response from SAP." });
      }

      const headItems = data.EV_CDMEMO_HEAD_RESULT?.item || [];
      const itemItems = data.EV_CDMEMO_ITEM_RESULT?.item || [];

      res.json({
        headers: Array.isArray(headItems) ? headItems : [headItems],
        items: Array.isArray(itemItems) ? itemItems : [itemItems],
      });
    });

  } catch (error) {
    console.error("SOAP Request Error:", error.message);
    res.status(500).json({ error: "Failed to fetch credit/debit memo data", details: error.message });
  }
};

module.exports = {
  getCustomerCdMemo
};

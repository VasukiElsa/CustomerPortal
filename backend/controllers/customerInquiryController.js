const axios = require("axios");
const xml2js = require("xml2js");
const { sapInquiryUrl, sapUsername, sapPassword } = require("../config/sapConfig");

const getCustomerInquiryData = async (req, res) => {
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
        <urn:ZFM_CUST_INQUIRY_DATA>
          <IV_KUNNR>${custId}</IV_KUNNR>
        </urn:ZFM_CUST_INQUIRY_DATA>
      </soapenv:Body>
    </soapenv:Envelope>`;

  try {
    const response = await axios.post(sapInquiryUrl, soapBody, {
      headers: {
        "Content-Type": "text/xml;charset=UTF-8",
        "SOAPAction": "urn:sap-com:document:sap:rfc:functions:ZFM_CUST_INQUIRY_DATA"
      },
      auth: {
        username: sapUsername,
        password: sapPassword
      }
    });

    xml2js.parseString(response.data, { explicitArray: false }, (err, result) => {
      if (err) return res.status(500).send("Failed to parse SOAP response");

      const data =
        result["soap-env:Envelope"]["soap-env:Body"]["n0:ZFM_CUST_INQUIRY_DATAResponse"]["ET_INQUIRY"]["item"];

      res.json(Array.isArray(data) ? data : [data]); // Always return array
    });

  } catch (error) {
    console.error("SOAP Request Error:", error.message);
    res.status(500).json({ error: "Failed to fetch inquiry data", details: error.message });
  }
};

module.exports = {
  getCustomerInquiryData
};

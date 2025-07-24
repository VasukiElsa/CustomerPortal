const axios = require("axios");
const xml2js = require("xml2js");
const { sapProfileUrl, sapUsername, sapPassword } = require('../config/sapConfig');

const getCustomerProfile = async (req, res) => {
  //const custId = req.query.custId;

const rawCustId = req.query.custId;

if (!rawCustId) {
  return res.status(400).json({ error: "Missing query parameter: custId" });
}

const custId = rawCustId.padStart(10, '0');

  const soapBody = `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                    xmlns:urn="urn:sap-com:document:sap:rfc:functions">
     <soapenv:Header/>
     <soapenv:Body>
        <urn:ZFM_CUSTPROFILEVIEW>
           <IV_CUSTID>${custId}</IV_CUSTID>
        </urn:ZFM_CUSTPROFILEVIEW>
     </soapenv:Body>
  </soapenv:Envelope>`;

  const url = sapProfileUrl;
  const username = sapUsername;
  const password = sapPassword;

  try {
    const response = await axios.post(url, soapBody, {
      headers: { 'Content-Type': 'text/xml;charset=UTF-8' },
      auth: { username, password }
    });

    xml2js.parseString(response.data, { explicitArray: false }, (err, result) => {
      if (err) return res.status(500).send("XML parsing failed");

      const data = result['soap-env:Envelope']['soap-env:Body']['n0:ZFM_CUSTPROFILEVIEWResponse'];
      res.json(data);
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCustomerProfile
};

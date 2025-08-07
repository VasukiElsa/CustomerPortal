const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { sapBaseUrl, sapUsername, sapPassword } = require('../config/sapConfig');

const SAP_AUTH = {
  username: sapUsername,
  password: sapPassword
};

let customerPdfStore = {};

exports.fetchCustomerInvoices = async (req, res) => {
  const customerId = req.params.customerId;

  if (!customerId) {
    return res.status(400).json({ error: 'Customer ID is required.' });
  }

  const soapBody = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                      xmlns:urn="urn:sap-com:document:sap:rfc:functions">
      <soapenv:Header/>
      <soapenv:Body>
        <urn:ZFM_CUSTINVOICE>
          <IV_CUST_ID>${customerId}</IV_CUST_ID>
        </urn:ZFM_CUSTINVOICE>
      </soapenv:Body>
    </soapenv:Envelope>`;

  try {
    const response = await axios.post(
      `${sapBaseUrl}/zsrv_custinvoice_data1?sap-client=100`,
      soapBody,
      {
        auth: SAP_AUTH,
        headers: {
          'Content-Type': 'text/xml;charset=UTF-8',
          'SOAPAction': ''
        }
      }
    );

    const responseData = response.data;

    // Extracting XML content
    const matches = [...responseData.matchAll(/<item>[\s\S]*?<\/item>/g)];

    const invoices = matches.map((match, index) => {
      const xml = match[0];
      const getValue = (tag) => {
        const regex = new RegExp(`<${tag}>(.*?)<\/${tag}>`);
        const result = xml.match(regex);
        return result ? result[1] : '';
      };

      const invoiceNo = getValue('EV_INVOICE_NO');
      const base64PDF = getValue('EV_PDF_BASE64');
      const filePath = path.join(__dirname, '../pdfs', `${invoiceNo}.pdf`);
      if (base64PDF) {
        fs.writeFileSync(filePath, Buffer.from(base64PDF, 'base64'));
        customerPdfStore[invoiceNo] = filePath;
      }

      return {
        invoice_no: invoiceNo,
        invoice_date: getValue('EV_INVOICE_DATE'),
        cust_id: getValue('EV_CUST_ID'),
        sales_org: getValue('EV_SALES_ORG'),
        item: getValue('EV_ITEM'),
        amount: getValue('EV_AMOUNT'),
        pdf_url: `/customer-invoice/pdf/${invoiceNo}`
      };
    });

    res.json({
      message: `Invoices for Customer ID ${customerId} fetched.`,
      invoices
    });

  } catch (error) {
    console.error('SOAP Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch customer invoices.' });
  }
};

exports.serveCustomerPDF = (req, res) => {
  const invoiceNo = req.params.invoiceNumber;
  const filePath = customerPdfStore[invoiceNo];

  if (!filePath || !fs.existsSync(filePath)) {
    return res.status(404).send('Customer PDF not found');
  }

  res.sendFile(path.resolve(filePath));
};

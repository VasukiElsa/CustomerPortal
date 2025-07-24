const axios = require('axios');
const { sapHost, sapUsername, sapPassword } = require('../config/sapConfig');

const customerLogin = async (req, res) => {
  const ivUserid = req.query.user;
  const ivPassword = req.query.pass;

  const url = `/sap/opu/odata/SAP/ZRFC_CUSTOMER_23_SRV/CustomerLoginSet(IvUserid='${ivUserid}',IvPassword='${ivPassword}')`;

  try {
    const response = await axios.get(`${sapHost}${url}`, {
      auth: {
        username: sapUsername,
        password: sapPassword
      },
      headers: {
        'Accept': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error calling SAP OData service:', error.message);
    res.status(500).json({ error: 'Failed to call SAP OData service', details: error.message });
  }
};


//Here we are exporting this controller function with a name as "customerLogin"
module.exports = {
  customerLogin
};


//3. Once the specific url is navigates to this customerLogin controller, here the logic of handling the login defined.
// customerLogin is an async fucntion which has request and response parameters.
// Read the incoming query and store it in a variable, here incoming inputs's variable names are similiar to the ODATA'S request parameters.
// Crafting the SAP ODATA URL and fetching the results. 
// Then we displaying the response in the console.
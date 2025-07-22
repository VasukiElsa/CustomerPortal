const express = require('express');
const cors = require('cors');
require('dotenv').config();

const customerLoginRoute = require('./routes/customerLogin');

const app = express();
const PORT = 3000;

app.use(cors());

// Use routes
app.use('/', customerLoginRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//Main Function
// This is the main entry point of the request. 
// app.use() directes the incoming request, here it is the root url. That means, any request starts with / url, 
// it navigates to "customerLoginRoute" which contains the routes specific of the url.
//So now control flow to ./routes/customerLogin.
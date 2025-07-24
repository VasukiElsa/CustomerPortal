require("dotenv").config();
const express = require("express");
const cors = require("cors");

const customerLoginRoute = require("./routes/loginRoutes");
const customerProfileRoutes = require("./routes/profileRoutes");
const customerInquiryRoutes = require("./routes/inquiryRoutes");
const salesOrderRoutes = require("./routes/salesOrderRoutes");
const customerDeliveryRoutes = require("./routes/deliveryRoutes");

const app = express();
app.use(cors());

app.use("/", customerLoginRoute);       // /customer-login
app.use("/profile", customerProfileRoutes); // /profile/getCustomerProfile
app.use("/inquiry", customerInquiryRoutes); // /inquiry/getCustomerInquiry
app.use("/salesorder", salesOrderRoutes); // /salesorder/getSalesOrders
app.use("/delivery", customerDeliveryRoutes); // /delivery/getDeliveries

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

//Main Function
// This is the main entry point of the request. 
// app.use() directes the incoming request, here it is the root url. That means, any request starts with / url, 
// it navigates to "customerLoginRoute" which contains the routes specific of the url.
//So now control flow to ./routes/customerLogin.
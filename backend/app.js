const cookieParser = require("cookie-parser");
const express = require("express");
const errorMiddleware = require("./middleware/error");

const app = express();

app.use(express.json());
app.use(cookieParser());

//route import
const product  = require("./routes/productRoute");
const user = require("./routes/userRoute");

//route use
app.use("/api/v1",product);
app.use("/api/v1",user);
//error handling middleware
app.use(errorMiddleware);
module.exports = app;
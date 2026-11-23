// Imports
const express = require("express");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorHandler.js");
const connect = require("./config.js");

// Configuration
require("dotenv").config();

const app = express();
const Port = process.env.PORT;

// Database Connection
connect();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static Files
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/task", require("./router/taskRouter.js"));
app.use("/api/user", require("./router/userRouter.js"));
app.use("/api/book", require("./router/bookRouter.js"));

// Error Handling
app.use(errorHandler);

// Start Server
app.listen(Port, () => {
    console.log("app running successfully");
});
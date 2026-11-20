const express = require("express");
const app = express();

require("dotenv").config();

// Imports
const cookieParser = require("cookie-parser");
const connect = require("./config");
const errorHandler = require("./middleware/errorHandler");

// Configuration
const port = process.env.PORT;

// Database Connection
connect();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static Files
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/task", require("./router/taskRouter"));
app.use("/api/book",require("./router/bookRouter"))
app.use("/api/user", require("./router/userRouter"));

// Error Handling Middleware
app.use(errorHandler);

// Server
app.listen(port, () => {
    console.log("Server is running");
});

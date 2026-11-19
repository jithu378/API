const express = require("express");
const app = express();

require("dotenv").config();

// Configuration
const port = process.env.PORT // hide port number

// Database Connection
const connect = require("./config")
connect();

//Middlewares
app.use(express.json()) // converting data into json

app.use("/api/task", require("./router/taskRouter")) // accesing router
app.use("/api/user",require("./router/userRouter"))

// Error Handling Middleware
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler)

app.listen(port, () =>{
    console.log("server is running")
})
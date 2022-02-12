const express = require("express");
const dotenv = require('dotenv')
const app = express("");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express")
const swaggerFile = require("../swagger_output.json");

const cadastroRoute = require('./routes/cadastroRoutes')

app.use(express.json());
app.use("/sistema/", cadastroRoute)
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));






  dotenv.config()



module.exports = app
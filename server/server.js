const express = require("express")
const cors = require ("cors")
const bodyParser = require("body-parser");
const app = express()
// const router = require("express").Router()
const router = require('./modules/router')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use('/',router)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Running on ${port}, http://localhost:3000`))
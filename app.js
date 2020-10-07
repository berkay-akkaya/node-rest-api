const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./src/routes/index");
const db = require("./src/server")
const app = express();

app.use(bodyParser.json());
app.use("/getir/records", routes);

app.listen(3000, () => console.log('Server Started'));

module.exports = app ;
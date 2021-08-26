const express = require('express')
const bodyParser= require('body-parser')
require('dotenv').config()
const routes = require('./routes/index');
const sequelize = require("./db/mariadb");

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}
app.use(allowCrossDomain)

app.use('/', routes);

sequelize.sync();

app.listen(process.env.PORT || 3000)


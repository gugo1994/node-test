const express = require('express')
const bodyParser= require('body-parser')
require('dotenv').config()
const accountRoute = require('./routes/account');
const sequelize = require("./db/mariadb");
const helmet = require('helmet')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(helmet())

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}
app.use(allowCrossDomain)

app.use('/account', accountRoute);

sequelize.sync();

app.listen(process.env.PORT || 3000)


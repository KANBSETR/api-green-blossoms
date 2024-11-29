const express = require('express');
const app = express();
const morgan = require('morgan');

const {db} = require('./firebase');

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require("./routes/index"));
module.exports = app;
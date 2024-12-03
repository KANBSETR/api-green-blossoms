const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {db} = require('./firebase');

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10mb' })); // Aumenta el límite de tamaño del cuerpo de la solicitud
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));


app.use(require("./routes/index"));
module.exports = app;
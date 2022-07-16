const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const rateLimit = require("express-rate-limit");

var routes = require('./api/route.js');

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
})

require('dotenv').config();
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`started on ${PORT}`));

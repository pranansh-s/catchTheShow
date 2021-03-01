const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var routes = require('./api/route.js');

require('dotenv').config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`started on ${PORT}`));

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const error = require('./middlewares/error');
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cookieParser());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(routes);
app.use(error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const helmet = require('helmet');
const { errors } = require('celebrate');
const { defaultNotFaund } = require('./errors/notFaundError');
const routes = require('./routes/index');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cookieParser());
// app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(requestLogger);
app.use(cors);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use((req, res, next) => { next(defaultNotFaund); });
app.use(error);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

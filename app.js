const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  //useNewUrlParser: true,
  //useCreateIndex: true,
  //useFindAndModify: false
});
app.use((req, res, next) => {
  req.user = {
    _id: '6314a3fe62e9b6b75f00a698'
  };
  next();
});
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use((req, res)=>res.status(404).send({message:'Запрос сформирован неверно. Ресурс не найден'}));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
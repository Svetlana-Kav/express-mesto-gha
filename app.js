const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const Card = require('./models/card');
const routes = require('./routes/index');
require('dotenv').config();

// Слушаем 3000 порт
const { PORT } = process.env;
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
}).then(() => {
  console.log('connected');
}).catch((err) => {
  console.log(err);
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '64d4da9e021f3c367b32b048',
  };

  next();
});

app.use(routes);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Неправильный запрос',
        });
      }
      return res.status(500).send({
        message: 'Внутренняя ошибка сервера',
      });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((users) => res.status(200).send({ data: users }))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({
          message: 'Запрашиваемые данные не найдены',
        });
      }
      res.status(500).send({
        message: 'Внутренняя ошибка сервера',
      });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'Запрашиваемый пользователь не найден',
        });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({
          message: 'Запрашиваемые данные не найдены',
        });
      }
      return res.status(500).send({
        message: 'Внутренняя ошибка сервера',
      });
    });
};

module.exports.editProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'Запрашиваемый пользователь не найден',
        });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Неправильный запрос',
        });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({
          message: 'Запрашиваемые данные не найдены',
        });
      }
      return res.status(500).send({
        message: 'Внутренняя ошибка сервера',
      });
    });
};

module.exports.editAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'Запрашиваемый пользователь не найден',
        });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Неправильный запрос',
        });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({
          message: 'Запрашиваемые данные не найдены',
        });
      }
      return res.status(500).send({
        message: 'Внутренняя ошибка сервера',
      });
    });
};

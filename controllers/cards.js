const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
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

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail()
    .then((cards) => res.send({ data: cards }))
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

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => res.send({ data: card }))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({
          message: 'Запрашиваемый пользователь не найден',
        });
      }
    });
};

module.exports.addLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({
          message: 'Запрашиваемый пользователь не найден',
        });
      }
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

module.exports.deleteLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({
          message: 'Запрашиваемый пользователь не найден',
        });
      }
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
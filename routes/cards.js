const router = require('express').Router();
const {
  createCard,
  getCards,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
} = require('../controllers/cards');

router.post('/', createCard);

router.get('/', getCards);

router.delete('/:cardId', deleteCard);

router.put('/:cardId/likes', addLikeCard);

router.delete('/:cardId/likes', deleteLikeCard);

module.exports = router;

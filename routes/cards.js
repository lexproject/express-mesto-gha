const routerCard = require('express').Router();
const {
  createCard, getCard, delCard, likeCard, dislikeCard,
} = require('../controllers/cards');

routerCard.post('/', createCard);
routerCard.get('/', getCard);
routerCard.delete('/:cardId', delCard);
routerCard.put('/:cardId/likes', likeCard);
routerCard.delete('/:cardId/likes', dislikeCard);

module.exports = routerCard;

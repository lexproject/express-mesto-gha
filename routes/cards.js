const routerCard = require('express').Router();
const {
  createCard, getCard, delCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { cardIdValidate, cardValidate } = require('../utils/validate');

routerCard.post('/', cardValidate, createCard);
routerCard.get('/', getCard);
routerCard.delete('/:cardId', cardIdValidate, delCard);
routerCard.put('/:cardId/likes', cardIdValidate, likeCard);
routerCard.delete('/:cardId/likes', cardIdValidate, dislikeCard);

module.exports = routerCard;

const routerCard = require('express').Router();
const {
  createCard, getCard, delCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { paramsValidate, cardValidate } = require('../utils/validate');

routerCard.post('/', cardValidate, createCard);
routerCard.get('/', getCard);
routerCard.delete('/:cardId', paramsValidate, delCard);
routerCard.put('/:cardId/likes', paramsValidate, likeCard);
routerCard.delete('/:cardId/likes', paramsValidate, dislikeCard);

module.exports = routerCard;

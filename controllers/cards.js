const Card = require('../models/card');
const { cardNotFaund, likesNotFaund } = require('../errors/notFaundError');
const {
  cardCreateError,
  cardLikeError,
  cardDisLikeError,
} = require('../errors/dataError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (name === 'ValidationError' || name === 'CastError') {
        next(cardCreateError);
      } else {
        next(err);
      }
    });
};

module.exports.getCard = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.delCard = (req, res, next) => {
  const { cardId } = req.params;
  return Card.verificateCardByUser(cardId, req.user._id)
    .then((card) => {
      if (!card) { return Promise.reject(cardNotFaund); }
      return res.send({ message: `Карточка ${card.name} была успешно удалена с сервера` });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },

    { new: true, runValidators: true },
  ).then((card) => {
    if (!card) { return Promise.reject(likesNotFaund); }
    return res.send({ data: card });
  })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(cardLikeError);
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },

    { new: true, runValidators: true },
  ).then((card) => {
    if (!card) { return Promise.reject(likesNotFaund); }
    return res.send({ data: card });
  })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(cardDisLikeError);
      } else {
        next(err);
      }
    });
};

const Card = require('../models/card');
const { sendError, cardNotFaund, likesNotFaund } = require('../error/error')
module.exports.createCard = (req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then(card => res.send({ data: card }))
    .catch(err => sendError(err, res, 'при создании карточки'));
};

module.exports.getCard = (req, res) => {
  Card.find({})
    .populate('owner')
    .then(card => res.send({ data: card }))
    .catch(err => sendError(err, res, ''));
};

module.exports.delCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => {
      if (!card) { return Promise.reject(cardNotFaund) };
      res.send({ message: `Карточка ${card.name} была успешно удалена с сервера` });
    })
    .catch(err => sendError(err, res, ''));
}

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } }, { new: true, runValidators: true }
  ).then(card => {
    if (!card) { return Promise.reject(likesNotFaund) };
    res.send({ data: card })
  })
    .catch(err => sendError(err, res, 'для постановки лайка'));
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } }, { new: true, runValidators: true }
  ).then(card => {
    if (!card) { return Promise.reject(likesNotFaund) };
    res.send({ data: card })
  })
    .catch(err => sendError(err, res, 'для снятии лайка'));
}
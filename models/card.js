const mongoose = require('mongoose');
const validator = require('validator');
const { cardNotFaund } = require('../errors/notFaundError');
const { permisionError } = require('../errors/permisionError');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Введённое поле должно быть ссылкой!',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,

  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

cardSchema.statics.verificateCardByUser = function verificateCardByUser(cardId, userId) {
  return this.findById(cardId)
    .then((card) => {
      if (!card) {
        return Promise.reject(cardNotFaund);
      }
      if (userId !== card.owner._id.toString()) {
        return Promise.reject(permisionError);
      }
      return this.findByIdAndRemove(cardId)
        .then((cardDeleted) => cardDeleted);
    });
};

module.exports = mongoose.model('card', cardSchema);

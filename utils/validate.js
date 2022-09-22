const { celebrate, Joi } = require('celebrate');

const paramsValidate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24),
  }),
});
const cardValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^https?:\/\/[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/),
  }).unknown(true),
});
const userDataValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
  }).unknown(true),
});
module.exports = { cardValidate, paramsValidate, userDataValidate };

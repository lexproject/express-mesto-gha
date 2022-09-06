const User = require('../models/user');
const { sendError, userNotFaund } = require('../error/error')

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => sendError(err, res, 'при создании пользователя'));
};

module.exports.getUser = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(err => sendError(err, res, ''));
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) { return Promise.reject(userNotFaund) };
      res.send({ data: user })
    })
    .catch(err => sendError(err, res, ''));
}

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then(user => {
      if (!user) { return Promise.reject(userNotFaund) };
      res.send({ data: user })
    })
    .catch(err => sendError(err, res, 'при обновлении профиля'));
}

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then(user => {
      if (!user) { return Promise.reject(userNotFaund) };
      res.send({ data: user })
    })
    .catch(err => sendError(err, res, 'при обновлении аватара'));
}
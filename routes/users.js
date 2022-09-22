const routerUser = require('express').Router();
const { userDataValidate } = require('../utils/validate');
const {
  getUser, getUserMe, getUserId, updateUser, updateUserAvatar,
} = require('../controllers/users');

routerUser.get('/', getUser);
routerUser.get('/:userId', getUserId);
routerUser.get('/me', getUserMe);
routerUser.patch('/me', userDataValidate, updateUser);
routerUser.patch('/me/avatar', userDataValidate, updateUserAvatar);

module.exports = routerUser;

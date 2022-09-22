const routerUser = require('express').Router();
const {
  userDataValidate,
  userIdValidate,
  avatarValidate,
} = require('../utils/validate');
const {
  getUser, getUserMe, getUserId, updateUser, updateUserAvatar,
} = require('../controllers/users');

routerUser.get('/', getUser);
routerUser.get('/me', getUserMe);
routerUser.get('/:userId', userIdValidate, getUserId);
routerUser.patch('/me', userDataValidate, updateUser);
routerUser.patch('/me/avatar', avatarValidate, updateUserAvatar);

module.exports = routerUser;

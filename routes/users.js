const routerUser = require('express').Router();
const { userDataValidate, paramsValidate } = require('../utils/validate');
const {
  getUser, getUserMe, getUserId, updateUser, updateUserAvatar,
} = require('../controllers/users');

routerUser.get('/', getUser);
routerUser.get('/me', getUserMe);
routerUser.get('/:userId', paramsValidate, getUserId);
routerUser.patch('/me', userDataValidate, updateUser);
routerUser.patch('/me/avatar', userDataValidate, updateUserAvatar);

module.exports = routerUser;

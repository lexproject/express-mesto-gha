const routerUser = require('express').Router();
const { createUser, getUser, getUserId, updateUser, updateUserAvatar } = require('../controllers/users');
routerUser.post('/', createUser);
routerUser.get('/', getUser);
routerUser.get('/:userId', getUserId);
routerUser.patch('/me', updateUser);
routerUser.patch('/me/avatar', updateUserAvatar);

module.exports = routerUser;
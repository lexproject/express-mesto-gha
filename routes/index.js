const router = require('express').Router();
const { errors } = require('celebrate');
const { defaultNotFaund } = require('../errors/notFaundError');
const userRouter = require('./users');
const cardRouter = require('./cards');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const {
  userDataValidate,
  loginValidate,
  avatarValidate,
} = require('../utils/validate');

router.post('/signin', loginValidate, login);
router.post('/signup', userDataValidate, avatarValidate, loginValidate, createUser);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use(errors());
router.use((req, res, next) => { next(defaultNotFaund); });

module.exports = router;

const router = require('express').Router();
const { errors } = require('celebrate');
const { defaultNotFaund } = require('../errors/notFaundError');
const userRouter = require('./users');
const cardRouter = require('./cards');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const {
  signinValidate,
  signupValidate,
} = require('../utils/validate');

router.post('/signin', signinValidate, login);
router.post('/signup', signupValidate, createUser);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use(errors());
router.use((req, res, next) => { next(defaultNotFaund); });

module.exports = router;

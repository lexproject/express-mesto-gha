const router = require('express').Router();
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

module.exports = router;

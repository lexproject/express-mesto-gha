class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthError';
    this.statusCode = 401;
  }
}
const loginError = new AuthError('Введены неправильный адрес почты или пароль');
const tokenError = new AuthError('С вашим токеном что-то не так');
const autorizationError = new AuthError('Неавторизированный пользователь. Необходима авторизация');

module.exports = {
  loginError, tokenError, autorizationError,
};

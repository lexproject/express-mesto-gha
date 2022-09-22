class DataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DataError';
    this.statusCode = 400;
  }
}
const userCreateError = new DataError('Переданы некорректные данные при создании пользователя');
const avatarUpdateError = new DataError('Переданы некорректные данные при обновлении аватара');
const userUpdateError = new DataError('Переданы некорректные данные при обновлении пользователя');
const cardCreateError = new DataError('Переданы некорректные данные при обновлении пользователя');
const cardLikeError = new DataError('Переданы некорректные данные для постановки лайка');
const cardDisLikeError = new DataError('Переданы некорректные данные для снятия лайка');
module.exports = {
  userCreateError,
  avatarUpdateError,
  userUpdateError,
  cardCreateError,
  cardLikeError,
  cardDisLikeError,
};

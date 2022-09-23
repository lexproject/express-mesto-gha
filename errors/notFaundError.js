class NotFaundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFaundError';
    this.statusCode = 404;
  }
}

const userNotFaund = new NotFaundError('Пользователь по указанному _id не найден');
const cardNotFaund = new NotFaundError('Карточка с указанным _id не найдена.');
const likesNotFaund = new NotFaundError('Передан несуществующий _id карточки');
const defaultNotFaund = new NotFaundError('Ресурс не найден или запрос сформирован неверно.');

module.exports = {
  cardNotFaund,
  userNotFaund,
  likesNotFaund,
  defaultNotFaund,
};

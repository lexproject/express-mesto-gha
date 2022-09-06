class NotFaundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFaundError';
    this.statusCode = 404;
  }
}

function sendError(err, res, errMessage) {
  let ERROR_COD = 500;

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    ERROR_COD = 400;
    return res.status(ERROR_COD).send(
      { message: `Произошла ошибка ${ERROR_COD}. Переданы некорректные данные ${errMessage}.` },
    );
  }
  if (err instanceof NotFaundError) {
    ERROR_COD = 404;
    return res.status(ERROR_COD).send({ message: `Произошла ошибка ${ERROR_COD}. ${err.message}.` });
  }

  res.status(ERROR_COD).send({ message: `На сервере произошла ошибка ${ERROR_COD}. ${err.message}.` });
  return '';
}

const userNotFaund = new NotFaundError('Пользователь по указанному _id не найден');
const cardNotFaund = new NotFaundError('Карточка с указанным _id не найдена.');
const likesNotFaund = new NotFaundError('Передан несуществующий _id карточки');

module.exports = {
  cardNotFaund, userNotFaund, likesNotFaund, sendError,
};

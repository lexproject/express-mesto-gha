module.exports = ((err, req, res, next) => {
  const { statusCode = 500, message, name } = err;

  if (name === 'ValidationError' || name === 'CastError') {
    const ERROR_COD = 400;
    res.status(ERROR_COD).send(
      { message: `Произошла ошибка ${ERROR_COD}. На сервер переданы некорректные данные. ${message}` },
    );
  }
  if (err.code === 11000) {
    const ERROR_COD = 409;
    res.status(ERROR_COD).send(
      { message: `Произошла ошибка ${ERROR_COD}. Пользователь с такими данными уже существует. ${message}` },
    );
  } else {
    res.status(statusCode).send({
      message: statusCode === 500
        ? `На сервере произошла ошибка ${statusCode}, сервер не может обработать запрос. ${message}`
        : `Ошибка ${statusCode}. ${message}`,
    });
  }
  next();
});

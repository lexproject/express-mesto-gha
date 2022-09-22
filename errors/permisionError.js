class PermisionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PermisionError';
    this.statusCode = 403;
  }
}
const permisionError = new PermisionError('Ограничение на право удалять чужие карточки');
module.exports = { permisionError };

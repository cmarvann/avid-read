const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  saveBook,
  deleteBook,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/user').get(authMiddleware, createUser);
router.route('/me').get(authMiddleware, getSingleUser);
router.route('/').post(createUser).put(authMiddleware, saveBook);
router.route('/books/:bookId').delete(authMiddleware, deleteBook);
router.route('/login').post(login);

module.exports = router;

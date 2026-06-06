const express = require('express');
const authMiddleware = require('../middleware/auth');
const { getBookmarks, createBookmark, updateBookmark, deleteBookmark } = require('../controllers/bookmarkController');

const router = express.Router();

router.use(authMiddleware);

router.get('/', getBookmarks);
router.post('/', createBookmark);
router.put('/:id', updateBookmark);
router.delete('/:id', deleteBookmark);

module.exports = router;

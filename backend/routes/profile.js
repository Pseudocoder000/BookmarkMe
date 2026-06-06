const express = require('express');
const authMiddleware = require('../middleware/auth');
const { getPublicProfile, claimHandle } = require('../controllers/profileController');

const router = express.Router();

router.get('/:handle', getPublicProfile);
router.post('/claim/handle', authMiddleware, claimHandle);

module.exports = router;

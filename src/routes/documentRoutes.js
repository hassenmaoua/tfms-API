const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const { authenticateToken } = require('../middleware/authMiddleware');

// POST /api/activities
router.post('/', authenticateToken, documentController.createDocument);

module.exports = router;

const express = require('express');
const router = express.Router();
const stateController = require('../controllers/stateController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Get activities by createdBy
router.get('/:code', authenticateToken, stateController.getStatesByCode);

module.exports = router;

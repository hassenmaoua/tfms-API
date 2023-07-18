const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const { authenticateToken } = require('../middleware/authMiddleware');

// GET /api/activities
router.get('/', authenticateToken, activityController.getActivities);

// GET /api/activities/:activityId
router.get(
  '/:activityId',
  authenticateToken,
  activityController.getActivityById
);

// POST /api/activities
router.post('/', authenticateToken, activityController.createActivity);

// PUT /api/activities/:activityId
router.put(
  '/:activityId',
  authenticateToken,
  activityController.updateActivity
);

module.exports = router;

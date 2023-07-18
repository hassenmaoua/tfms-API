const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Set the destination folder for uploaded files

const clientController = require('../controllers/clientController');
const { authenticateToken } = require('../middleware/authMiddleware');

// GET /api/clients/
router.get('/', authenticateToken, clientController.getClients);

// GET /api/clients/all
router.get('/all', authenticateToken, clientController.getAllClients);

// GET /api/clients/:clientId
router.get('/:clientId', authenticateToken, clientController.getClientById);

// POST /api/clients
router.post(
  '/',
  authenticateToken,
  upload.single('avatar'),
  clientController.createClient
);
// PUT /api/clients/:clientId
router.put(
  '/:clientId',
  authenticateToken,
  upload.single('avatar'),
  clientController.updateClient
);

module.exports = router;

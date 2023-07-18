const stateService = require('../services/stateService');

const getStatesByCode = async (req, res) => {
  try {
    const { code } = req.params; // Accessing code from path parameters

    result = await stateService.getStatesByCode(code);

    res.status(200).json(result);
  } catch (error) {
    console.error('Error getting states:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getStatesByCode };

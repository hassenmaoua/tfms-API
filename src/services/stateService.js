const State = require('../models/stateModel');

const getStateById = async (stateId) => {
  try {
    const state = await State.findById(stateId);
    return state;
  } catch (error) {
    console.error('Error fetching state by ID:', error);
    throw new Error('An error occurred while fetching the state by ID.');
  }
};

const getStatesByCode = async (code) => {
  const query = {
    code,
  };

  try {
    const result = await State.find(query);

    return result;
  } catch (error) {
    console.error('Error fetching state by CODE:', error);
    throw new Error('An error occurred while fetching the state by CODE.');
  }
};

module.exports = {
  getStatesByCode,
  getStateById,
};

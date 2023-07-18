const State = require('../models/stateModel');

// Function to check if the States collection is empty
const isStatesCollectionEmpty = async () => {
  try {
    const count = await State.countDocuments();
    return count === 0;
  } catch (error) {
    console.error('Error checking States collection:', error);
    throw new Error('An error occurred while checking the States collection.');
  }
};

// Function to populate the States collection
const populateStatesCollection = async () => {
  try {
    const statesData = [
      { _id: 10, code: 'AE', label: 'Nouveaux', style: 'gray' },
      { _id: 11, code: 'AE', label: 'En Cours', style: 'blue' },
      { _id: 12, code: 'AE', label: 'Terminé', style: 'green' },
      { _id: 13, code: 'AE', label: 'Annulé', style: 'red' },

      { _id: 20, code: 'FE', label: 'Saisie', style: 'gray' },
      { _id: 21, code: 'FE', label: 'En Cours', style: 'blue' },
      { _id: 22, code: 'FE', label: 'Payé', style: 'green' },
      { _id: 23, code: 'FE', label: 'Annulé', style: 'red' },
    ];

    const states = await State.create(statesData);
    console.log('States collection populated:', states);
  } catch (error) {
    console.error('Error populating States collection:', error);
    throw new Error(
      'An error occurred while populating the States collection.'
    );
  }
};

// Check if the States collection is empty and populate it if necessary
const initializeDatabase = async () => {
  const isEmpty = await isStatesCollectionEmpty();
  if (isEmpty) {
    await populateStatesCollection();
  }
};

module.exports = {
  initializeDatabase,
};

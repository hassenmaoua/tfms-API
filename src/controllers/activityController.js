const activityService = require('../services/activityService');

// Get activities by createdBy

const getActivities = async (req, res) => {
  try {
    const {
      page = 1,
      items_per_page = 10,
      search = '',
      filter_date = '',
    } = req.query;
    const createdBy = req.currentUser.id;

    const result = await activityService.getActivitiesQuery({
      page,
      size: items_per_page,
      search,
      dateFilter: filter_date,
      createdBy,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error getting activities:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getActivityById = async (req, res) => {
  const { activityId } = req.params;
  try {
    const activity = await activityService.getActivityById(activityId);
    res.status(200).json(activity);
  } catch (error) {
    console.error('Error retrieving activity by ID:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while retrieving the activity.' });
  }
};

const createActivity = async (req, res) => {
  try {
    const {
      intitule,
      description,
      type,
      quantite,
      consumeBudget,
      saleBudget,
      client,
      estimate,
    } = req.body;

    const createdBy = req.currentUser.id;
    const state = 10;

    const activity = await activityService.createActivity({
      intitule,
      description,
      type,
      quantite,
      consumeBudget,
      saleBudget,
      estimate,
      client,
      state,
      createdBy,
    });

    res.status(201).json(activity);
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateActivity = async (req, res) => {
  const { activityId } = req.params;
  const {
    intitule,
    description,
    type,
    quantite,
    consumeBudget,
    saleBudget,
    client,
    state,
    estimate,
  } = req.body;

  try {
    const updatedActivity = await activityService.updateActivity(activityId, {
      intitule,
      description,
      type,
      quantite,
      consumeBudget,
      saleBudget,
      estimate,
      client,
      state,
    });

    res.status(200).json(updatedActivity);
  } catch (error) {
    console.error('Error updating activity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
};

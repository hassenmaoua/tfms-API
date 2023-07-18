const Activity = require('../models/activityModel');

// Get activities by createdBy
const getActivitiesQuery = async ({
  page,
  size,
  search = '',
  dateFilter,
  createdBy,
}) => {
  const limit = parseInt(size);
  const skip = (page - 1) * limit;

  const query = {
    createdBy,
    intitule: { $regex: search, $options: 'i' },
  };

  try {
    if (dateFilter === '7-days') {
      query.createdAt = {
        $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      };
    } else if (dateFilter === '30-days') {
      query.createdAt = {
        $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      };
    } else if (dateFilter === '1-year') {
      query.createdAt = {
        $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
      };
    }

    const totalCount = await Activity.countDocuments(query);
    const activities = await Activity.find(query)
      .populate('state')
      .populate({
        path: 'client',
        select: 'intitule avatar',
      })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalCount / limit);
    const from = skip + 1;
    const to = skip + activities.length;

    const links = [];
    for (let i = 1; i <= totalPages; i++) {
      links.push({
        active: i === page,
        page: i,
      });
    }

    return {
      activities,
      pagination: {
        links,
        page: parseInt(page),
        items_per_page: limit,
        total_elements: totalCount,
        from,
        to,
      },
    };
  } catch (error) {
    console.error('Error retrieving activities:', error);
    throw new Error('An error occurred while retrieving the activities.');
  }
};

const getActivityById = async (activityId) => {
  try {
    const activity = await Activity.findById(activityId);
    return activity;
  } catch (error) {
    console.error('Error retrieving activity by ID:', error);
  }
};

const createActivity = async (activityData) => {
  const activity = await Activity.create(activityData);
  return activity;
};

const updateActivity = async (activityId, updateData) => {
  try {
    const updatedActivity = await Activity.findByIdAndUpdate(
      activityId,
      updateData,
      { new: true }
    );

    return updatedActivity;
  } catch (error) {
    console.error('Error updating activity:', error);
    throw new Error('An error occurred while updating the activity.');
  }
};

module.exports = {
  getActivitiesQuery,
  getActivityById,
  createActivity,
  updateActivity,
};

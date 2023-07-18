const Client = require('../models/clientModel');

const createClient = async (clientData) => {
  try {
    const client = new Client(clientData);
    const createdClient = await client.save();
    return createdClient;
  } catch (error) {
    console.error('Error creating client:', error);
    throw new Error('An error occurred while creating the client.');
  }
};

// Service functions
const getClientsQuery = async ({
  page,
  size,
  search = '',
  natureFilter,
  createdBy,
}) => {
  const limit = parseInt(size);
  const skip = (parseInt(page) - 1) * limit;

  const query = {
    createdBy,
    $or: [
      { intitule: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
    ],
  };

  if (natureFilter) query.nature = natureFilter;

  try {
    const totalCount = await Client.countDocuments(query);
    const clients = await Client.find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalCount / limit);
    const from = skip + 1;
    const to = skip + clients.length;

    const links = [];
    for (let i = 1; i <= totalPages; i++) {
      links.push({
        active: i === page,
        page: i,
      });
    }

    return {
      clients,
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
    console.error('Error retrieving clients:', error);
    throw new Error('An error occurred while retrieving the clients.');
  }
};

const getClientById = async (clientId) => {
  try {
    const client = await Client.findById(clientId);
    return client;
  } catch (error) {
    console.error('Error retrieving client by ID:', error);
  }
};

const getAllClients = async ({ createdBy }) => {
  const query = {
    createdBy,
  };

  try {
    const result = await Client.find(query).sort({ createdAt: -1 });

    const clients = result.map(({ _id, intitule }) => ({
      _id,
      intitule,
    }));

    return {
      clients,
    };
  } catch (error) {
    console.error('Error retrieving clients:', error);
    throw new Error('An error occurred while retrieving the clients.');
  }
};

const updateClient = async (clientId, updateData) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(clientId, updateData, {
      new: true,
    });

    return updatedClient;
  } catch (error) {
    console.error('Error updating client:', error);
    throw new Error('An error occurred while updating the client.');
  }
};

// Export service functions
module.exports = {
  createClient,
  getAllClients,
  getClientsQuery,
  getClientById,
  updateClient,
};

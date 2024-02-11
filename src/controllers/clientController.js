const Client = require('../models/clientModel');
const clientService = require('../services/clientService');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const getClients = async (req, res) => {
  try {
    const {
      page = 1,
      items_per_page = 12,
      search = '',
      filter_nature,
    } = req.query;
    const createdBy = req.currentUser.id;

    const result = await clientService.getClientsQuery({
      page,
      size: items_per_page,
      natureFilter: filter_nature,
      search,
      createdBy,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error getting clients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllClients = async (req, res) => {
  try {
    const createdBy = req.currentUser.id;

    const result = await clientService.getAllClients({
      createdBy,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error getting clients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getClientById = async (req, res) => {
  const { clientId } = req.params;
  try {
    const client = await Client.findById(clientId);
    res.status(200).json(client);
  } catch (error) {
    console.error('Error retrieving client by ID:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while retrieving the client.' });
  }
};

const createClient = async (req, res) => {
  const { intitule, tax, phone, email, address, nature } = req.body;

  const createdBy = req.currentUser.id;
  try {
    // Check if an avatar file was uploaded
    let avatarPath = '';
    if (req.file) {
      // Retrieve the temporary path of the uploaded file
      const tempFilePath = req.file.path;
      const fileExtension = req.file.originalname.split('.').pop();
      const avatarFileName = `${uuidv4()}.${fileExtension}`;
      avatarPath = `/uploads/${avatarFileName}`; // Set the avatar path

      // Create the folder if it doesn't exist
      const folderPath =
        '.' + avatarPath.substring(0, avatarPath.lastIndexOf('/'));
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      // Move the uploaded file to the desired destination
      fs.writeFileSync(`.${avatarPath}`, fs.readFileSync(tempFilePath));
    }

    const clientData = {
      intitule,
      tax,
      phone,
      email,
      address,
      avatar: avatarPath,
      nature,
      createdBy,
    };

    const client = await clientService.createClient(clientData);
    res.status(201).json(client);
  } catch (error) {
    console.error('Error creating client:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while creating the client.' });
  }
};

const updateClient = async (req, res) => {
  const { clientId } = req.params;
  const { intitule, tax, phone, email, address, nature } = req.body;

  try {
    const client = await clientService.getClientById(clientId);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    // Check if an avatar file was uploaded
    let avatarPath = client.avatar;
    if (req.file) {
      // Remove the old avatar file
      // if (avatarPath) {
      //   fs.unlinkSync(`.${avatarPath}`);
      // }

      // Retrieve the temporary path of the uploaded file
      const tempFilePath = req.file.path;
      const fileExtension = req.file.originalname.split('.').pop();
      const avatarFileName = `${uuidv4()}.${fileExtension}`;
      avatarPath = `/uploads/${avatarFileName}`; // Set the new avatar path

      // Create the folder if it doesn't exist
      const folderPath =
        '.' + avatarPath.substring(0, avatarPath.lastIndexOf('/'));
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      // Move the uploaded file to the desired destination
      fs.writeFileSync(`.${avatarPath}`, fs.readFileSync(tempFilePath));
    }

    const clientData = {
      intitule,
      tax,
      phone,
      email,
      address,
      avatar: avatarPath,
      nature,
    };

    const updatedClient = await clientService.updateClient(
      clientId,
      clientData
    );
    res.status(200).json(updatedClient);
  } catch (error) {
    console.error('Error updating client:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while updating the client.' });
  }
};

// Export controller functions
module.exports = {
  getClientById,
  getAllClients,
  getClients,
  createClient,
  updateClient,
};

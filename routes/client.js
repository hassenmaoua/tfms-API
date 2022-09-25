const express = require('express');
const router = express.Router();
const Client = require('../models/clientModel');
const auth = require('../middleware/authentication');

// Getting all
router.get('/list', auth, async (req, res) => {
  try {
    const clientsList = await Client.find();
    if (clientsList.length > 0) {
      res.status(200).json({
        status: true,
        message: 'Succes',
        data: clientsList,
      });
    } else {
      res.status(404).json({
        status: false,
        message: 'Aucune donnée disponible',
      });
    }
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
});

// Getting One
router.get('/:id', auth, getClient, (req, res) => {
  res.json({ status: true, message: 'succes', data: res.client });
});

async function getClient(req, res, next) {
  let client;
  try {
    client = await Client.findById(req.params.id);
    if (client == null) {
      return res
        .status(404)
        .json({ stats: false, message: 'Client non trouvé' });
    }
  } catch (err) {
    return res.status(500).json({ stats: false, message: err.message });
  }

  res.client = client;
  next();
}

// Creating one
router.post('/', auth, async (req, res) => {
  const client = new Client({
    _id: req.body._id,
    intitule: req.body.intitule,
    phone: req.body.phone,
    email: req.body.email,
    identFiscale: req.body.identFiscale,
    adresse: req.body.adresse,
    isHuman: req.body.isHuman,
  });
  try {
    const newClient = await client.save();
    res
      .status(201)
      .json({ stats: true, message: 'Client ajouté', data: newClient });
  } catch (err) {
    res.status(400).json({ stats: false, message: err.message });
  }
});

// Updating One
router.patch('/:id', auth, getClient, async (req, res) => {
  if (req.body.intitule) {
    res.client.intitule = req.body.intitule;
  }

  if (req.body.phone) {
    res.client.phone = req.body.phone;
  }

  if (req.body.email) {
    res.client.quantite = req.body.email;
  }

  if (req.body.identFiscale) {
    res.client.bugetConsomme = req.body.identFiscale;
  }

  if (req.body.adresse) {
    res.client.bugetVente = req.body.adresse;
  }

  try {
    const updatedClient = await res.client.save();
    res.json({ stats: true, message: 'Client Modifié', data: updatedClient });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
});

// Deleting One
router.delete('/:id', getClient, async (req, res) => {
  try {
    await res.client.remove();
    res.json({ status: true, message: 'Client est Supprimé' });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
});

module.exports = router;

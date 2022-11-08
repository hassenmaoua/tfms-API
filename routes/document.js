const express = require('express');
const router = express.Router();
const Client = require('../models/clientModel');
const Document = require('../models/documentModel');
const getEtat = require('../middleware/getEtat');
const auth = require('../middleware/authentication');

// Getting all
router.get('/list', auth, async (req, res) => {
  try {
    const documentsList = await Document.find();
    if (documentsList.length > 0) {
      res.status(200).json({
        status: true,
        message: 'Succes',
        data: documentsList.reverse(),
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

// Getting by client
router.get('/list-by-client/:client', auth, async (req, res) => {
  const id = Number(req.params['client']);

  try {
    const client = await Client.findById(id);
    const documentsList = await Document.find({
      client: {
        _id: client._id,
        intitule: client.intitule,
        identifiantFiscal: client.identifiantFiscal,
        adresse: client.adresse,
      },
    });

    if (documentsList.length > 0) {
      res.status(200).json({
        status: true,
        message: 'Succes',
        data: documentsList.reverse(),
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
router.get('/:id', auth, getDocument, (req, res) => {
  res.json({ status: true, message: 'succes', data: res.document });
});

async function getDocument(req, res, next) {
  let document;
  try {
    document = await Document.findById(req.params.id);
    if (document == null) {
      return res
        .status(404)
        .json({ stats: false, message: 'Document non trouvé' });
    }
  } catch (err) {
    return res.status(500).json({ stats: false, message: err.message });
  }

  res.document = document;
  next();
}

// Creating one
router.post('/', auth, getEtat, async (req, res) => {
  const id = Math.floor(Date.now() / 1000) - 1665349465;

  const document = new Document({
    _id: id,
    intitule: req.body.intitule,
    dopiece: req.body.dopiece,
    dateDoc: req.body.dateDoc,
    articles: req.body.articles,
    montantHT: req.body.montantHT,
    montantTVA: req.body.montantTVA,
    TVA: req.body.TVA,
    timber: req.body.timber,
    montantTTC: req.body.montantTTC,
    client: req.body.client,
    docCreateur: req.user.data,
  });
  try {
    const newDocument = await document.save();
    res
      .status(201)
      .json({ stats: true, message: 'Document ajouté', data: newDocument });
  } catch (err) {
    res.status(400).json({ stats: false, message: err.message });
  }
});

// Deleting One
router.delete('/:id', getDocument, async (req, res) => {
  try {
    await res.document.remove();
    res.status(201).json({ status: true, message: 'Document est Supprimé' });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
});

module.exports = router;

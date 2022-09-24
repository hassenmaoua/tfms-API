const express = require('express');
const router = express.Router();
const Document = require('../models/documentModel');
const auth = require('../middleware/authentication');

// Getting all
router.get('/list', auth, async (req, res) => {
  try {
    const documentsList = await Document.find();
    if (documentsList.length > 0) {
      res.status(200).json({
        status: true,
        message: 'Succes',
        data: documentsList,
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
router.post('/', auth, async (req, res) => {
  const document = new Document({
    _id: req.body._id,
    dopiece: req.body.dopiece,
    dateDoc: req.body.dateDoc,
    article: req.body.article,
    montantHT: req.body.montantHT,
    montantNetHT: req.body.montantNetHT,
    montantTVA: req.body.montantTVA,
    montantTTC: req.body.montantTTC,
    client: req.body.client,
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

module.exports = router;

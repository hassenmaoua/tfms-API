const express = require('express');
const router = express.Router();
const Etat = require('../models/etatModel');
const auth = require('../middleware/authentication');

// Getting all
router.get('/list', auth, async (req, res) => {
  try {
    const etatsList = await Etat.find();
    if (etatsList.length > 0) {
      res.status(200).json({
        status: true,
        message: 'Succes',
        data: etatsList,
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

// Getting by Code

router.get('/list/:code', auth, async (req, res) => {
  try {
    const code = req.params['code'];
    const etatsList = await Etat.find({ code });

    if (etatsList.length > 0) {
      res.status(200).json({
        status: true,
        message: 'Succes',
        data: etatsList,
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
router.get('/:id', auth, getEtat, (req, res) => {
  res.json({ status: true, message: 'succes', data: res.etat });
});

async function getEtat(req, res, next) {
  let etat;
  try {
    etat = await Etat.findById(req.params.id);
    if (!etat) {
      return res.status(404).json({ stats: false, message: 'Etat non trouvé' });
    }
  } catch (err) {
    return res.status(500).json({ stats: false, message: err.message });
  }

  res.etat = etat;
  next();
}

// Creating one
router.post('/', auth, async (req, res) => {
  const etat = new Etat({
    _id: req.body._id,
    code: req.body.code,
    label: req.body.label,
    style: req.body.style,
  });
  try {
    const newEtat = await etat.save();
    res
      .status(200)
      .json({ stats: true, message: 'Etat ajouté', data: newEtat });
  } catch (err) {
    res.status(400).json({ stats: false, message: err.message });
  }
});

// Updating One
router.patch('/:id', auth, getEtat, async (req, res) => {
  if (req.body._id) {
    res.etat._id = req.body._id;
  }

  if (req.body.code) {
    res.etat.code = req.body.code;
  }

  if (req.body.label) {
    res.etat.label = req.body.label;
  }

  if (req.body.style) {
    res.etat.style = req.body.style;
  }

  try {
    const updatedEtat = await res.etat.save();
    res
      .status(200)
      .json({ stats: true, message: 'Etat Modifié', data: updatedEtat });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
});

// Deleting One
router.delete('/:id', getEtat, async (req, res) => {
  try {
    await res.etat.remove();
    res.status(201).json({ status: true, message: 'Etat est Supprimé' });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
});

module.exports = router;

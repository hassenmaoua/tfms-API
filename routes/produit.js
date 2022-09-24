const express = require('express');
const router = express.Router();
const Produit = require('../models/produitModel');
const auth = require('../middleware/authentication');

// Getting all
router.get('/list', auth, async (req, res) => {
  try {
    const produitsList = await Produit.find();
    if (produitsList.length > 0) {
      res.status(200).json({
        status: true,
        message: 'Succes',
        data: produitsList,
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
router.get('/:id', auth, getProduit, (req, res) => {
  res.json({ status: true, message: 'succes', data: res.produit });
});

async function getProduit(req, res, next) {
  let produit;
  try {
    produit = await Produit.findById(req.params.id);
    if (produit == null) {
      return res
        .status(404)
        .json({ stats: false, message: 'Produit non trouvé' });
    }
  } catch (err) {
    return res.status(500).json({ stats: false, message: err.message });
  }

  res.produit = produit;
  next();
}

// Creating one
router.post('/', auth, async (req, res) => {
  const produit = new Produit({
    _id: req.body._id,
    intitule: req.body.intitule,
    description: req.body.description,
    quantite: req.body.quantite,
    bugetConsomme: req.body.bugetConsomme,
    bugetVente: req.body.bugetVente,
  });
  try {
    const newProduit = await produit.save();
    res
      .status(201)
      .json({ stats: true, message: 'Produit ajouté', data: newProduit });
  } catch (err) {
    res.status(400).json({ stats: false, message: err.message });
  }
});

module.exports = router;

const express = require('express');
const http = require('http');
const router = express.Router();
const Produit = require('../models/produitModel');
const auth = require('../middleware/authentication');

const User = require('../models/userModel');

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
  const id = Math.floor(Date.now() / 1000) - 1664537147;

  const responsable = req.session.userid;

  const produit = new Produit({
    _id: id,
    intitule: req.body.intitule,
    bugetVente: req.body.bugetVente,
    typeActivite: req.body.typeActivite,
    quantite: req.body.quantite,
    tempsEstime: req.body.tempsEstime,
    client: req.body.client,
    responsable: responsable,
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

// Updating One
router.patch('/:id', auth, getProduit, async (req, res) => {
  if (req.body.intitule) {
    res.produit.intitule = req.body.intitule;
  }

  if (req.body.description) {
    res.produit.description = req.body.description;
  }

  if (req.body.quantite) {
    res.produit.quantite = req.body.quantite;
  }

  if (req.body.bugetConsomme) {
    res.produit.bugetConsomme = req.body.bugetConsomme;
  }

  if (req.body.bugetVente) {
    res.produit.bugetVente = req.body.bugetVente;
  }

  if (req.body.tempsEstime) {
    res.produit.tempsEstime = req.body.tempsEstime;
  }

  if (req.body.typeActivite) {
    res.produit.typeActivite = req.body.typeActivite;
  }

  if (req.body.client) {
    res.produit.client = req.body.client;
  }

  try {
    const updatedProduit = await res.produit.save();
    res.json({ stats: true, message: 'Produit Modifié', data: updatedProduit });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
});

// Assign Client
router.patch('/:id/add-client/', auth, getProduit, async (req, res) => {
  const client = { _id: req.body._id, intitule: req.body.intitule };

  res.produit.client = client;

  try {
    const updatedProduit = await res.produit.save();
    res.json({
      status: true,
      message: 'Le client est affecté au produit',
      data: updatedProduit,
    });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
});

// Modifier Etat
router.patch('/:id/etat/', auth, getProduit, async (req, res) => {
  const etat = {
    _id: req.body._id,
    code: req.body.code,
    label: req.body.label,
    style: req.body.style,
  };

  res.produit.etat = etat;

  try {
    const updatedProduit = await res.produit.save();
    res.json({
      status: true,
      message: "L'etat du produit est changé",
      data: updatedProduit,
    });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
});

// Deleting One
router.delete('/:id', getProduit, async (req, res) => {
  try {
    await res.produit.remove();
    res.json({ status: true, message: 'Produit est Supprimé' });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
});

module.exports = router;

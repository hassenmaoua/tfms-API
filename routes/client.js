const express = require('express');
const router = express.Router();
const Client = require('../models/clientModel');
const auth = require('../middleware/authentication');
const fs = require('fs');
const multer = require('multer');
const uuidv4 = require('uuid/v4');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

// Getting all
router.get('/list', auth, async (req, res) => {
  try {
    const clientsList = await Client.find();
    if (clientsList.length > 0) {
      res.status(200).json({
        status: true,
        message: 'Succes',
        data: clientsList.reverse(),
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
    if (!client) {
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
router.post('/', auth, upload.single('photo'), async (req, res) => {
  const id = Math.floor(Date.now() / 1000) - 1665349465;

  try {
    let url = '';
    let client;

    if (req.file) {
      url =
        req.protocol + '://' + req.get('host') + '/public/' + req.file.filename;

      client = new Client({
        _id: id,
        intitule: req.body.intitule,
        identifiantFiscal: req.body.identifiantFiscal,
        phone: req.body.phone,
        email: req.body.email,
        adresse: req.body.adresse,
        isIndividual: req.body.isIndividual,
        cCreator: req.user.data,
        photo: url,
      });
    } else {
      client = new Client({
        _id: id,
        intitule: req.body.intitule,
        identifiantFiscal: req.body.identifiantFiscal,
        phone: req.body.phone,
        email: req.body.email,
        adresse: req.body.adresse,
        isIndividual: req.body.isIndividual,
        cCreator: req.user.data,
      });
    }

    const newClient = await client.save();

    res
      .status(200)
      .json({ stats: true, message: 'Client ajouté', data: newClient });
  } catch (err) {
    res.status(400).json({ stats: false, message: err.message });
  }
});

// Updating One
router.patch(
  '/:id',
  auth,
  getClient,
  upload.single('photo'),
  async (req, res) => {
    let url = '';

    if (req.body._id) {
      res.client._id = req.body._id;
    }

    if (req.body.intitule) {
      res.client.intitule = req.body.intitule;
    }

    if (req.body.identifiantFiscal) {
      res.client.identifiantFiscal = req.body.identifiantFiscal;
    }

    if (req.body.phone) {
      res.client.phone = req.body.phone;
    }

    if (req.body.email) {
      res.client.email = req.body.email;
    }

    if (req.body.adresse) {
      res.client.adresse = req.body.adresse;
    }

    const dirr = req.protocol + '://' + req.get('host') + '/';

    if (req.file) {
      try {
        fs.unlinkSync(res.client.photo.replace(dirr, ''));
      } catch {}
      url =
        req.protocol + '://' + req.get('host') + '/public/' + req.file.filename;
      res.client.photo = url;
    }

    if (req.body.isIndividual) {
      res.client.isIndividual = req.body.isIndividual;
    }

    try {
      const updatedClient = await res.client.save();
      res
        .status(200)
        .json({ stats: true, message: 'Client Modifié', data: updatedClient });
    } catch (err) {
      res.status(400).json({ status: false, message: err.message });
    }
  }
);

// Deleting One
router.delete('/:id', getClient, async (req, res) => {
  const dirr = req.protocol + '://' + req.get('host') + '/';

  try {
    await res.client.remove();

    try {
      fs.unlinkSync(res.client.photo.replace(dirr, ''));
    } catch {}

    res.json({ status: true, message: 'Client est Supprimé' });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
});

module.exports = router;

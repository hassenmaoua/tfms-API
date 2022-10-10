const Etat = require('../models/etatModel');

const getEtat = async (req, res, next) => {
  let etat = { _id: 0 };
  if (!req.body.etat) return next();

  try {
    etat = await Etat.findById(req.body.etat);
    if (!etat) {
      return res.status(404).json({ stats: false, message: 'Etat non trouvé' });
    }
  } catch (err) {
    return res.status(500).json({ stats: false, message: err.message });
  }

  req.body.etat = etat;
  next();
};

module.exports = getEtat;

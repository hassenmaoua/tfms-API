const Etat = require('../models/etatModel');

const getTypeActivite = async (req, res, next) => {
  let etat = { _id: 0 };
  if (!req.body.typeActivite) return next();
  try {
    etat = await Etat.findById(req.body.typeActivite);
    if (!etat) {
      return res
        .status(404)
        .json({ stats: false, message: 'Type activité non trouvé' });
    }
  } catch (err) {
    return res.status(500).json({ stats: false, message: err.message });
  }

  req.body.typeActivite = { _id: etat._id };
  next();
};

module.exports = getTypeActivite;

const Client = require('../models/clientModel');

const getClient = async (req, res, next) => {
  try {
    if (!req.body.client) {
      return next();
    }

    const client = await Client.findById(req.body.client);
    if (!client) {
      return next();
    }
    if (!res.produit) {
      return next();
    }

    res.produit.client = {
      _id: client._id,
    };
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ stats: false, message: err.message });
  }

  next();
};

module.exports = getClient;

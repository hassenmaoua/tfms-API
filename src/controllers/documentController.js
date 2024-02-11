const documentService = require('../services/documentService');

const createDocument = async (req, res) => {
  try {
    const {
      _id,
      dopiece,
      dateDoc,
      articles,
      montantHT,
      montantTVA,
      TVA,
      timber,
      montantTTC,
      client,
    } = req.body;

    const docCreateur = req.currentUser.id;
    const etat = 20;

    const document = await documentService.createDocument({
      _id,
      dopiece,
      dateDoc,
      articles,
      montantHT,
      montantTVA,
      TVA,
      timber,
      montantTTC,
      etat,
      client,
      docCreateur,
    });

    res.status(201).json(document);
  } catch (error) {
    console.error('Error creating document:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { createDocument };

const Document = require('../models/documentModel');

const createDocument = async (documentData) => {
  const document = await Document.create(documentData);
  return document;
};

module.exports = {
  createDocument,
};

const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication');
const fs = require('fs');
const path = require('path');

router.get('/:filePath', function (req, res) {
  const { filePath } = req.params;
  res.sendFile(filePath);
});

router.delete('/:fileName', auth, async function (req, res) {
  const { fileName } = req.params;

  fs.unlink('public/' + fileName, function (err) {
    if (err) {
      console.log(err.message);
      res.status(404).send({ err: err.message });
    }
    console.log('File deleted!');
  });
  res.status(200).send({ message: 'File deleted!' });
});

module.exports = router;

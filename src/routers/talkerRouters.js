const express = require('express');
const { readTalkerFile } = require('../utils/talkerFunctions');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const talkers = await readTalkerFile();
    res.status(200).json(talkers);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
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

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const talkers = await readTalkerFile();
  const personTalker = talkers.find((talker) => talker.id === Number(id));
  if (personTalker) {
    res.status(200).json(personTalker);
  } else {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

module.exports = router;
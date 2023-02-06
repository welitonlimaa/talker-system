const express = require('express');
const valideAuth = require('../middlewares/authorization');
const validateAge = require('../middlewares/validateAge');
const validateName = require('../middlewares/validateName');
const validateRate = require('../middlewares/validateRate');
const validateTalkerData = require('../middlewares/validateTalkerData');
const validateWatchedAt = require('../middlewares/validateWatchedAt');
const { readTalkerFile, addTalker, editTalker, deleteTalker } = require('../utils/talkerFunctions');

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

router.post('/',
  valideAuth,
  validateTalkerData,
  validateName,
  validateAge,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const newTalker = { ...req.body };

    const cadTalker = await addTalker(newTalker);
    res.status(201).json(cadTalker);
  });

router.put('/:id',
  valideAuth,
  validateTalkerData,
  validateName,
  validateAge,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const { id } = req.params;
    const newTalkerData = { ...req.body };

    const talkers = await readTalkerFile();
    const personTalker = talkers.find((talker) => talker.id === Number(id));

    if (personTalker) {
      const editDataTalker = await editTalker(Number(id), newTalkerData);
      res.status(200).json(editDataTalker);
    } else {
      res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
  });

router.delete('/:id', valideAuth, async (req, res) => {
  const { id } = req.params;

  const talkers = await readTalkerFile();
  const personTalker = talkers.find((talker) => talker.id === Number(id));

  if (personTalker) {
    await deleteTalker(Number(id));
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

module.exports = router;
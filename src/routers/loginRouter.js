const express = require('express');
const generateToken = require('../utils/tokenGenerate');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].includes(undefined)) {
    return res.status(401).json({ message: 'Campos ausentes!' });
  }

  const token = generateToken();

  return res.status(200).header({ token }).json({ token });
});

module.exports = router;
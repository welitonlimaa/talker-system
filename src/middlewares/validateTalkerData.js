const validateDescription = (data, res, value) => {
  if (data[value] === undefined) {
    return res.status(400).json(
      { message: `O campo "${value}" é obrigatório` },
    );
  }
};

module.exports = (req, res, next) => {
  const data = req.body;

  return validateDescription(data, res, 'name')
    || validateDescription(data, res, 'age')
    || validateDescription(data, res, 'talk')
    || next();
};
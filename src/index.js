const express = require('express');

const talkerRouters = require('./routers/talkerRouters');
const loginRouter = require('./routers/loginRouter');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.use('/talker', talkerRouters);
app.use('/login', loginRouter);
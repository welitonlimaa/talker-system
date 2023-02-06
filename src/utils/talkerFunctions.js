const fs = require('fs').promises;

const { join } = require('path');

const readTalkerFile = async () => {
  const path = '../talker.json';
  try {
    const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
    return JSON.parse(contentFile);
  } catch (error) {
    console.error(`Arquivo não pôde ser lido: ${error}`);
  }
};

const writeTalkerFile = async (content) => {
  const path = '../talker.json';
  try {
    await fs.writeFile(join(__dirname, path), JSON.stringify(content));
  } catch (error) {
    return null;
  }
};

const addTalker = async (infos) => {
  const data = await readTalkerFile();
  const nextId = data[data.length - 1].id + 1;
  const newTalker = { id: nextId, ...infos };

  data.push(newTalker);

  await writeTalkerFile(data);

  return newTalker;
};

module.exports = {
  readTalkerFile,
  writeTalkerFile,
  addTalker,
};
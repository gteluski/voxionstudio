const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Arquivos estáticos servidos de /public na raiz /
app.use(express.static(path.join(__dirname, 'public')));

// Rotas de páginas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/portfolio', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'portfolio.html'));
});

app.get('/equipe/:membro', (req, res) => {
  const membro = req.params.membro;
  const membrosValidos = ['guilherme-teluski', 'guilherme-ricco', 'lucas-chaves'];

  if (membrosValidos.includes(membro)) {
    res.sendFile(path.join(__dirname, 'views', 'equipe', `${membro}.html`));
  } else {
    res.status(404).sendFile(path.join(__dirname, 'views', 'index.html'));
  }
});

// Fallback 404 — redireciona para a home
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Voxion Studio rodando em http://localhost:${PORT}`);
});

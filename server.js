const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const equipe = require('./data/equipe.json');

// ---------------------------------------------------------------------------
// Template de perfil — renderizado server-side com caminhos absolutos
// ---------------------------------------------------------------------------
function renderProfile(pessoa) {
  const fotoHTML = pessoa.foto
    ? `<div class="profile-photo-panel">
        <img src="${pessoa.foto}" alt="${pessoa.fotoAlt}" />
      </div>`
    : `<div class="profile-photo-placeholder">
        <span>Adicionar foto</span>
        <small>${pessoa.fotoAlt}</small>
      </div>`;

  return `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${pessoa.fotoAlt} | Voxion Studio</title>
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body class="profile-page">
    <main class="profile-shell">
      <a class="profile-back" href="/#equipe">← Voltar para Voxion</a>
      <div class="profile-grid">
        ${fotoHTML}
        <div class="${pessoa.copyClass}">
          <span>Voxion people / ${pessoa.numero}</span>
          <h1>${pessoa.nome}</h1>
          <strong>${pessoa.cargo}</strong>
          ${pessoa.bio}
          <a href="https://wa.me/5543974001872" target="_blank" rel="noopener noreferrer">Entrar em contato ↗</a>
        </div>
      </div>
    </main>
  </body>
</html>`;
}

// ---------------------------------------------------------------------------
// Arquivos estáticos servidos de /public na raiz /
// ---------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));

// ---------------------------------------------------------------------------
// Rotas de páginas
// ---------------------------------------------------------------------------
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/portfolio', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'portfolio.html'));
});

app.get('/equipe/:membro', (req, res) => {
  const pessoa = equipe.find(p => p.slug === req.params.membro);
  if (!pessoa) {
    return res.status(404).sendFile(path.join(__dirname, 'views', 'index.html'));
  }
  res.send(renderProfile(pessoa));
});

// ---------------------------------------------------------------------------
// Fallback 404 — redireciona para a home
// ---------------------------------------------------------------------------
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Voxion Studio rodando em http://localhost:${PORT}`);
});

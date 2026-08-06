# Voxion Studio

Site institucional da Voxion Studio servido por um servidor Node.js simples, sem dependencias externas.

## Estrutura

```text
.
├── server.js
├── package.json
├── index.html
├── portfolio.html
├── styles.css
├── script.js
├── portfolio.js
├── assets/
├── equipe/
├── projetos/
└── views/
```

## Desenvolvimento local

```bash
npm start
```

O servidor usa `process.env.PORT` quando disponivel e cai para `3000` localmente.

## Deploy no Hostinger

Configure o projeto como aplicacao Node.js, nao como site estatico puro.

1. No hPanel, abra `Node.js`.
2. Defina:
   - Node.js `18.x` ou superior
   - `Application root`: a pasta raiz deste projeto
   - `Application startup file`: `server.js`
3. Garanta que o deploy por Git/FTP esteja enviando a branch correta.
4. Depois do pull/upload, rode `npm install --production`.
5. Reinicie a aplicacao no painel.

## Checklist de publicacao

- A branch configurada na Hostinger precisa ser a mesma branch que recebeu as alteracoes.
- Os arquivos da raiz `index.html`, `portfolio.html`, `styles.css`, `script.js`, `portfolio.js` e a pasta `assets/` precisam estar versionados no Git.
- Se fizer upload manual, envie a pasta inteira do projeto, nao apenas os HTMLs.

## Observacao importante

Se o site subir mas nao abrir externamente, revise a configuracao da aplicacao Node.js e reinicie o processo apos o deploy. Este projeto nao depende de `public/` nem de `Express`.

# Voxion Studio — Site Institucional

Site institucional da Voxion Studio, construído com **Node.js** e **Express**, servindo arquivos HTML estáticos.

---

## Estrutura do Projeto

```
voxion-studio/
├── server.js           ← Ponto de entrada da aplicação
├── package.json
├── .gitignore
├── .env.example
├── public/             ← Arquivos estáticos (CSS, JS, assets)
│   ├── styles.css
│   ├── script.js
│   ├── portfolio.js
│   └── assets/
│       ├── brand/
│       ├── fonts/
│       └── team/
└── views/              ← Páginas HTML
    ├── index.html
    ├── portfolio.html
    └── equipe/
        ├── guilherme-teluski.html
        ├── guilherme-ricco.html
        └── lucas-chaves.html
```

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm v9 ou superior

---

## Instalação e Execução Local

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/voxion-studio.git
cd voxion-studio

# 2. Instale as dependências
npm install

# 3. Crie o arquivo de ambiente
cp .env.example .env

# 4. Inicie o servidor em modo desenvolvimento
npm run dev
```

Acesse em: [http://localhost:3000](http://localhost:3000)

---

## Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm start` | Inicia o servidor em produção com `node server.js` |
| `npm run dev` | Inicia com `nodemon` — reinicia automaticamente ao salvar |

---

## Rotas

| Rota | Arquivo servido |
|---|---|
| `GET /` | `views/index.html` |
| `GET /portfolio` | `views/portfolio.html` |
| `GET /equipe/guilherme-teluski` | `views/equipe/guilherme-teluski.html` |
| `GET /equipe/guilherme-ricco` | `views/equipe/guilherme-ricco.html` |
| `GET /equipe/lucas-chaves` | `views/equipe/lucas-chaves.html` |

---

## Deploy no Hostinger (Node.js App)

### 1. Prepare o repositório

```bash
# Certifique-se de que node_modules não está no repositório
# O .gitignore já trata disso automaticamente

git add .
git commit -m "feat: estrutura Node.js + Express"
git push origin main
```

### 2. Configure o Node.js App no Hostinger

1. Acesse o **hPanel** → **Sites** → seu domínio → **Node.js**
2. Clique em **Create Application**
3. Configure:
   - **Node.js version**: 18.x (ou superior)
   - **Application mode**: Production
   - **Application root**: `/` (raiz do projeto)
   - **Application startup file**: `server.js`
4. Clique em **Create**

### 3. Faça upload dos arquivos

**Opção A — via Git (recomendado):**
- Na seção Git do hPanel, conecte o repositório e faça o pull

**Opção B — via Gerenciador de Arquivos / FTP:**
- Compacte a pasta do projeto **sem** a pasta `node_modules/`
- Faça upload do `.zip` e extraia no servidor

### 4. Instale as dependências no servidor

No terminal SSH do Hostinger (ou pelo hPanel → Terminal):

```bash
cd ~/public_html  # ou o diretório raiz configurado
npm install --production
```

### 5. Defina a variável de ambiente

No hPanel → Node.js App → **Environment Variables**:

```
PORT=3000
```

> O Hostinger geralmente injeta a porta automaticamente via `PORT`. O `process.env.PORT || 3000` garante compatibilidade.

### 6. Inicie a aplicação

Clique em **Start** (ou **Restart**) no painel do Node.js App.

---

## Variáveis de Ambiente

| Variável | Padrão | Descrição |
|---|---|---|
| `PORT` | `3000` | Porta em que o servidor irá escutar |

Copie `.env.example` para `.env` e ajuste os valores para desenvolvimento local.

---

## Tecnologias

- **Node.js** + **Express 4**
- **dotenv** para configuração via variáveis de ambiente
- **nodemon** para hot-reload em desenvolvimento

---

## Licença

© Voxion Studio. Todos os direitos reservados.

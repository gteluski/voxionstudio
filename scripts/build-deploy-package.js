const fs = require("node:fs");
const path = require("node:path");

const ROOT_DIR = path.resolve(__dirname, "..");
const DEPLOY_DIR = path.resolve(ROOT_DIR, "deploy_package");

const EXCLUDE_NAMES = new Set([
  ".git",
  ".DS_Store",
  "__MACOSX",
  "node_modules",
  ".env",
  "deploy_package"
]);

function shouldExclude(fileName, relativePath) {
  if (EXCLUDE_NAMES.has(fileName)) return true;
  if (fileName.endswith && fileName.endsWith(".log")) return true;
  if (fileName.startsWith(".git") && fileName !== ".gitignore") return true;
  return false;
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      if (shouldExclude(entry, path.join(src, entry))) continue;
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else if (stat.isFile()) {
    if (path.extname(src) === ".log") return;
    fs.copyFileSync(src, dest);
  }
}

function buildDeployPackage() {
  console.log("Iniciando a geracao do pacote de deploy limpo...");
  
  if (fs.existsSync(DEPLOY_DIR)) {
    fs.rmSync(DEPLOY_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(DEPLOY_DIR, { recursive: true });

  const entries = fs.readdirSync(ROOT_DIR);
  for (const entry of entries) {
    if (shouldExclude(entry, path.join(ROOT_DIR, entry))) continue;
    copyRecursive(path.join(ROOT_DIR, entry), path.join(DEPLOY_DIR, entry));
  }

  console.log(`Pacote de deploy gerado com sucesso em: ${DEPLOY_DIR}`);
}

buildDeployPackage();

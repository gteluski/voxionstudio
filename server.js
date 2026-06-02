const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const rootDir = __dirname;
const host = process.env.HOST || "127.0.0.1";
const port = Number.parseInt(process.env.PORT ?? "", 10) || 3000;

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".otf": "font/otf",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

const safeResolve = (relativePath) => {
  const resolvedPath = path.resolve(rootDir, relativePath);

  if (!resolvedPath.startsWith(rootDir)) {
    return null;
  }

  return resolvedPath;
};

const getCandidatePaths = (pathname) => {
  const normalizedPath = pathname.replace(/\/+/g, "/");
  const trimmedPath =
    normalizedPath === "/" ? "/" : normalizedPath.replace(/\/$/, "");
  const relativePath = trimmedPath.startsWith("/")
    ? trimmedPath.slice(1)
    : trimmedPath;

  if (trimmedPath === "/") {
    return ["index.html", "views/index.html"];
  }

  if (path.extname(relativePath)) {
    return [relativePath];
  }

  return [`${relativePath}.html`, path.join(relativePath, "index.html")];
};

const findExistingFile = async (pathname) => {
  const candidates = getCandidatePaths(pathname);

  for (const candidate of candidates) {
    const resolvedPath = safeResolve(candidate);

    if (!resolvedPath) {
      continue;
    }

    try {
      const stats = await fs.promises.stat(resolvedPath);

      if (stats.isFile()) {
        return { filePath: resolvedPath, stats };
      }
    } catch {
      // Ignore missing candidates and keep trying the next option.
    }
  }

  return null;
};

const sendError = (response, statusCode, message) => {
  response.writeHead(statusCode, {
    "Content-Type": "text/plain; charset=utf-8"
  });
  response.end(message);
};

const server = http.createServer(async (request, response) => {
  if (!request.url) {
    sendError(response, 400, "Requisicao invalida.");
    return;
  }

  if (!["GET", "HEAD"].includes(request.method ?? "")) {
    sendError(response, 405, "Metodo nao permitido.");
    return;
  }

  const requestUrl = new URL(request.url, "http://localhost");
  const match = await findExistingFile(decodeURIComponent(requestUrl.pathname));

  if (!match) {
    sendError(response, 404, "Pagina nao encontrada.");
    return;
  }

  const extension = path.extname(match.filePath).toLowerCase();
  const contentType = mimeTypes[extension] ?? "application/octet-stream";

  response.writeHead(200, {
    "Cache-Control":
      extension === ".html" ? "no-cache" : "public, max-age=3600",
    "Content-Length": match.stats.size,
    "Content-Type": contentType
  });

  if (request.method === "HEAD") {
    response.end();
    return;
  }

  const stream = fs.createReadStream(match.filePath);

  stream.on("error", () => {
    if (!response.headersSent) {
      sendError(response, 500, "Erro ao ler o arquivo.");
      return;
    }

    response.destroy();
  });

  stream.pipe(response);
});

server.listen(port, host, () => {
  console.log(`Voxion Studio rodando em http://${host}:${port}`);
});

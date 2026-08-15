const fs = require("node:fs");
const path = require("node:path");

const DOMAIN = "https://voxionstudio.com";
const ROOT_DIR = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.resolve(ROOT_DIR, "public");

const IGNORED_FILES = new Set(["googled05e851d6335e615.html"]);

function getPriority(route) {
  if (route === "/") return "1.0";
  if (route === "/portfolio" || route === "/equipe") return "0.8";
  return "0.7";
}

function getChangeFreq(route) {
  if (route === "/") return "weekly";
  return "monthly";
}

function findHtmlFiles(dir, baseDir = "") {
  let results = [];
  const list = fs.readdirSync(dir);

  for (const file of list) {
    const filePath = path.join(dir, file);
    const relativePath = path.join(baseDir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (file !== "node_modules" && file !== "public" && file !== "assets" && file !== ".git") {
        results = results.concat(findHtmlFiles(filePath, relativePath));
      }
    } else if (file.endsWith(".html") && !IGNORED_FILES.has(file)) {
      results.push({
        filePath,
        relativePath: relativePath.replace(/\\/g, "/")
      });
    }
  }

  return results;
}

function formatRoute(relativePath) {
  let route = relativePath.replace(/\.html$/, "");
  if (route === "index") {
    return "/";
  }
  if (route.endsWith("/index")) {
    route = route.slice(0, -6);
  }
  return route.startsWith("/") ? route : `/${route}`;
}

function generateSitemap() {
  const htmlFiles = findHtmlFiles(ROOT_DIR);
  const today = new Date().toISOString().split("T")[0];

  const urls = htmlFiles.map(({ relativePath }) => {
    const route = formatRoute(relativePath);
    const loc = `${DOMAIN}${route}`;
    const priority = getPriority(route);
    const changefreq = getChangeFreq(route);

    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

  fs.writeFileSync(path.join(ROOT_DIR, "sitemap.xml"), xmlContent, "utf8");
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }
  fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), xmlContent, "utf8");

  console.log(`Sitemap gerado com sucesso contendo ${urls.length} URLs!`);
}

generateSitemap();

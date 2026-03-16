const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");
const {
  handleCreateLead,
  handleUpdateLead,
  isSupabaseConfigured,
  sendJson,
  sendText,
} = require("./lib/leads-api");

const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number.parseInt(process.env.PORT || "4173", 10);
const BASE_DIR = __dirname;

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp3": "audio/mpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
};

async function serveStatic(requestPath, response) {
  const normalizedPath = requestPath === "/" ? "/index.html" : requestPath;
  const safePath = path.normalize(normalizedPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(BASE_DIR, safePath);

  if (!filePath.startsWith(BASE_DIR)) {
    sendText(response, 403, "Forbidden");
    return;
  }

  try {
    const data = await fs.readFile(filePath);
    const extension = path.extname(filePath).toLowerCase();

    response.writeHead(200, {
      "Content-Type": MIME_TYPES[extension] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    response.end(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      sendText(response, 404, "Not found");
      return;
    }

    console.error("Failed to serve static asset:", error);
    sendText(response, 500, "Internal Server Error");
  }
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  if (request.method === "GET" && url.pathname === "/health") {
    sendJson(response, 200, {
      ok: true,
      supabaseConfigured: isSupabaseConfigured(),
    });
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/leads") {
    await handleCreateLead(request, response);
    return;
  }

  if (request.method === "PATCH" && url.pathname.startsWith("/api/leads/")) {
    const leadId = decodeURIComponent(url.pathname.slice("/api/leads/".length));
    await handleUpdateLead(request, response, leadId);
    return;
  }

  if (request.method === "GET") {
    await serveStatic(url.pathname, response);
    return;
  }

  sendText(response, 405, "Method Not Allowed");
});

server.listen(PORT, HOST, () => {
  console.log(`Roleta Cirion disponível em http://localhost:${PORT}`);
});

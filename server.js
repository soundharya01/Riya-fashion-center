/**
 * Riya Fashion Design — Local Server
 * ------------------------------------
 * Run:  node server.js
 * Open: http://localhost:3000
 *
 * Drop any photo into a category folder and just
 * refresh the browser — it shows up automatically.
 */

const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;
const { folders: FOLDERS, covers: COVERS } = require('./photo-folders.json');

/* Supported image extensions */
const IMG_EXT = new Set(['.jpg','.jpeg','.png','.gif','.webp','.jfif','.bmp']);

/* Scan a folder and return sorted image file paths */
function scanFolder(rel) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) return [];
  return fs.readdirSync(abs)
    .filter(f => IMG_EXT.has(path.extname(f).toLowerCase()))
    .sort((a, b) => {
      /* natural sort: image1 < image2 < image10 */
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    })
    .map((f, i) => ({ n: i + 1, src: rel.replace(/\\/g, '/') + '/' + f }));
}

/* MIME types */
const MIME = {
  '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'application/javascript; charset=utf-8',
  '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg',
  '.gif':'image/gif', '.webp':'image/webp', '.jfif':'image/jpeg',
  '.bmp':'image/bmp', '.svg':'image/svg+xml', '.ico':'image/x-icon',
};
function getMime(f) {
  const e = path.extname(f).toLowerCase();
  return MIME[e] || 'application/octet-stream';
}

/* Server */
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  /* ── API: /api/photos?cat=blouse&grp=Aari+Work ── */
  if (url.pathname === '/api/photos') {
    const cat = url.searchParams.get('cat') || '';
    const grp = url.searchParams.get('grp') || '';
    const key = cat + '|' + grp;
    const folder = FOLDERS[key];
    const photos = folder ? scanFolder(folder) : [];
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache',
    });
    res.end(JSON.stringify(photos));
    return;
  }

  /* ── API: /api/covers ── */
  if (url.pathname === '/api/covers') {
    const result = {};
    Object.entries(COVERS).forEach(([cat, folder]) => {
      const imgs = scanFolder(folder);
      if (imgs.length) result[cat] = imgs[0].src;
    });
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache',
    });
    res.end(JSON.stringify(result));
    return;
  }

  /* ── API: /api/folders — returns the full folder map (for debugging) ── */
  if (url.pathname === '/api/folders') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(FOLDERS, null, 2));
    return;
  }

  /* ── Static file serving ── */
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); }
  catch { res.writeHead(400); res.end('Bad request'); return; }
  const relativePath = pathname === '/' ? 'r2.html' : pathname.replace(/^\/+/, '');
  const filePath = path.resolve(ROOT, relativePath);
  /* security: prevent path traversal */
  if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found: ' + url.pathname); return; }
    res.writeHead(200, { 'Content-Type': getMime(filePath) });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('');
  console.log('  ✦ Riya Fashion Design server running');
  console.log(`  → Open http://localhost:${PORT} in your browser`);
  console.log('');
  console.log('  Drop photos into any folder under photos/');
  console.log('  then refresh the browser — they appear automatically.');
  console.log('');
  console.log('  Press Ctrl+C to stop.');
});

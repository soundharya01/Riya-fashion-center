const fs = require('node:fs');
const path = require('node:path');
const config = require('./photo-folders.json');

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.jfif', '.bmp']);
const root = __dirname;

function scanFolder(relativeFolder) {
  const folder = path.join(root, relativeFolder);
  if (!fs.existsSync(folder)) return [];
  return fs.readdirSync(folder)
    .filter(file => imageExtensions.has(path.extname(file).toLowerCase()))
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true, sensitivity: 'base' }));
}

const photos = {};
let nextPhotoNumber = 1;
for (const [key, folder] of Object.entries(config.folders)) {
  photos[key] = scanFolder(folder).map(file => ({
    n: nextPhotoNumber++,
    src: `${folder}/${file}`,
  }));
}

const covers = {};
for (const [category, folder] of Object.entries(config.covers)) {
  const [file] = scanFolder(folder);
  if (file) covers[category] = `${folder}/${file}`;
}

fs.writeFileSync(path.join(root, 'photos.json'), `${JSON.stringify({ covers, photos }, null, 2)}\n`);
fs.copyFileSync(path.join(root, 'r2.html'), path.join(root, 'index.html'));
console.log(`Generated index.html and photos.json for ${nextPhotoNumber - 1} photos.`);

const fs = require('fs');

// 1. Check r2.html
const html = fs.readFileSync('r2.html', 'utf8');
console.log('r2.html size:', (html.length/1024).toFixed(1)+'KB');
const htmlChecks = [
  ['<link rel="stylesheet" href="style.css">',  'Links to style.css'],
  ['<style>',                                    'NO inline style tag (should be absent)'],
  ["Bridal Collection – Front",                  'Bridal Front subcategory'],
  ["Bridal Collection – Back",                   'Bridal Back subcategory'],
  ["name:'Bridal Collection'",                    'Combined Bridal section'],
  ["name:'Designer Blouse'",                      'Combined Designer section'],
  ["name:'Neck Design'",                          'Combined Chudi neck section'],
  ["id:'lehanga',n:'Lehanga'",                    'Lehanga category'],
  ["id:'hand-design',n:'Hand Design'",            'Hand Design category'],
  ['navigateView(c.id,c.g.length===1?c.g[0]:null)','Open single-section categories directly'],
  ["singleSection?'← Back to Collections'",       'Return from direct gallery to collections'],
  ["window.addEventListener('popstate'",           'Restores views with browser Back and Forward'],
  ['history[replace?\'replaceState\':\'pushState\']','Stores in-app navigation in browser history'],
  ['goBackTo(singleSection?null:cur,null)',        'In-app Back follows browser history'],
  ["Front design",                                'Front design option'],
  ["Back design",                                 'Back design option'],
  ["aria-pressed",                                'Accessible selected design option'],
  ['CATS.flatMap',                                'Loads photo groups from categories'],
  ['buildServerNotice',                          'Explains how to enable folder photos'],
  ['hero-featured-grid',                          'Homepage banner folder-photo strip'],
  ['Your style, beautifully stitched',            'Homepage banner brand message'],
  ['openStaticGallery',                          'Photo lightbox function'],
  ['Photo ${i+1} of ${photos.length}',           'Photo counter'],
];
let ok = true;
htmlChecks.forEach(([s, label]) => {
  const found = html.includes(s);
  if(label.startsWith('NO ')) {
    if(found){ console.log('FAIL (should not exist): '+label); ok=false; }
    else      console.log('OK (absent): '+label);
  } else {
    if(!found){ console.log('MISSING: '+label); ok=false; }
    else        console.log('OK: '+label);
  }
});

// 2. Check style.css
const css = fs.readFileSync('style.css', 'utf8');
console.log('\nstyle.css size:', (css.length/1024).toFixed(1)+'KB');
const cssChecks = [
  ['--cream','Color tokens'],
  ['--burg','Burgundy color'],
  ['--gold','Gold color'],
  ['.topbar','Topbar style'],
  ['.hero','Hero style'],
  ['.main-card','Main card style'],
  ['.sub-card','Sub card style'],
  ['.gallery-grid','Gallery grid'],
  ['.home-hero .hero-inner','Responsive homepage banner layout'],
  ['.hero-featured-tile','Homepage folder-photo tiles'],
  ['@media (max-width: 900px)','Tablet homepage banner layout'],
  ['@media (max-width: 640px)','Mobile breakpoint'],
  ['@media (max-width: 360px)','Small phone breakpoint'],
  ['touch-action: manipulation','Touch optimization'],
];
cssChecks.forEach(([s, label]) => {
  if(!css.includes(s)){ console.log('MISSING in CSS: '+label); ok=false; }
  else console.log('OK CSS: '+label);
});

// 3. Check folder structure
const folders = [
  'photos/blouse/bridal-collection/front',
  'photos/blouse/bridal-collection/back',
  'photos/blouse/design/front',
  'photos/blouse/design/back',
  'photos/lehanga/design',
  'photos/Hand-design/design',
  'photos/chudi',
  'photos/blouse',
];
console.log('');
folders.forEach(f => {
  console.log((fs.existsSync(f) ? 'FOLDER OK: ' : 'FOLDER MISSING: ') + f);
});

console.log(ok ? '\nAll checks passed ✓' : '\nSome checks failed!');

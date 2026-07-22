import { chromium } from 'playwright';
import { createServer } from 'http';
import { readFileSync, existsSync, mkdirSync } from 'fs';
import { join, extname } from 'path';

const PORT = 3001;
const PUBLIC = join(import.meta.dirname, 'out');

const MIME = {
  '.html': 'text/html','.css':'text/css','.js':'text/javascript',
  '.json':'application/json','.png':'image/png','.jpg':'image/jpeg',
  '.svg':'image/svg+xml','.ico':'image/x-icon'
};

const server = createServer((req, res) => {
  let fp = join(PUBLIC, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  const ext = extname(fp);
  if (!ext) {
    if (existsSync(fp + '.html')) fp += '.html';
    else if (existsSync(join(fp, 'index.html'))) fp = join(fp, 'index.html');
  }
  try {
    const c = readFileSync(fp);
    res.writeHead(200, { 'Content-Type': MIME[extname(fp)] || 'octet-stream' });
    res.end(c);
  } catch { res.writeHead(404); res.end('Not Found'); }
});

await new Promise(r => server.listen(PORT, r));
console.log(`Server on http://localhost:${PORT}`);

const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
const page = await context.newPage();

const routes = [
  { name: 'home', path: '/' },
  { name: 'destinos', path: '/destinos' },
  { name: 'explorar', path: '/explorar' },
  { name: 'dija-ai', path: '/dija-ai' },
  { name: 'club', path: '/club' },
  { name: 'checkout', path: '/checkout' },
  { name: 'dashboard', path: '/dashboard' },
];

for (const route of routes) {
  console.log(`Capturing ${route.name}...`);
  await page.goto(`http://localhost:${PORT}${route.path}`, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(2000);
  await page.screenshot({ path: join(import.meta.dirname, `screenshot_${route.name}.png`), fullPage: true });
  console.log(`  -> screenshot_${route.name}.png`);
}

await browser.close();
server.close();
console.log('All screenshots captured.');

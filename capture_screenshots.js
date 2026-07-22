const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'out');

// MIME types for static server
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

// Create static file server
const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  let filePath = path.join(PUBLIC_DIR, urlPath === '/' ? 'index.html' : urlPath);
  
  const ext = path.extname(filePath);
  if (!ext) {
    if (fs.existsSync(filePath + '.html')) {
      filePath += '.html';
    } else if (fs.existsSync(path.join(filePath, 'index.html'))) {
      filePath = path.join(filePath, 'index.html');
    }
  }

  const contentType = MIME_TYPES[path.extname(filePath)] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Viewports configuration
const VIEWPORTS = [
  { name: 'desktop', width: 1920, height: 1080, isMobile: false },
  { name: 'notebook', width: 1366, height: 768, isMobile: false },
  { name: 'tablet', width: 768, height: 1024, isMobile: false },
  { name: 'mobile', width: 390, height: 844, isMobile: true }
];

// Target pages/routes
const PAGES = [
  { name: 'home', url: '/' },
  { name: 'explorar', url: '/explorar' },
  { name: 'dija_ai', url: '/dija-ai' },
  { name: 'club', url: '/club' },
  { name: 'consultoria', url: '/consultoria' },
  { name: 'login', url: '/login' },
  { name: 'blog', url: '/blog' },
  { name: 'blog_artigo', url: '/blog/artigo?id=3' },
  { name: 'blog_artigo_vip', url: '/blog/artigo?id=1&vip=true' },
  { name: 'termos', url: '/termos' },
  { name: 'privacidade', url: '/privacidade' },
  { name: 'dashboard_main', url: '/dashboard', auth: true },
  { name: 'dashboard_ofertas', url: '/dashboard/ofertas', auth: true },
  { name: 'dashboard_comunidade', url: '/dashboard/comunidade', auth: true },
  { name: 'dashboard_dicas', url: '/dashboard/dicas', auth: true },
  { name: 'dashboard_guia', url: '/dashboard/guia', auth: true },
  { name: 'dashboard_perfil', url: '/dashboard/perfil', auth: true }
];

// Ensure screenshot directories exist
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR);
VIEWPORTS.forEach(vp => {
  const dir = path.join(SCREENSHOTS_DIR, vp.name);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
});

async function run() {
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`Local web server serving static out/ folder on http://localhost:${PORT}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  
  // Enable request interception to reroute all production API calls to our local container port 8001
  await page.setRequestInterception(true);
  page.on('request', interceptedRequest => {
    const url = interceptedRequest.url();
    if (url.startsWith('https://destinosincriveis.vps-kinghost.net')) {
      const localUrl = url.replace('https://destinosincriveis.vps-kinghost.net', 'http://localhost:8001');
      interceptedRequest.continue({ url: localUrl });
    } else {
      interceptedRequest.continue();
    }
  });

  // 1. Perform login to get real local auth tokens
  console.log('Logging in as test user viajante@di.com to authenticate the session...');
  let savedToken = null;
  let savedUser = null;
  
  try {
    await page.goto(`http://localhost:${PORT}/login`, { waitUntil: 'load', timeout: 15000 });
    await page.type('input[type="email"]', 'viajante@di.com');
    await page.type('input[type="password"]', 'viajante123');
    
    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'load', timeout: 15000 })
    ]);

    // Extract the valid token and user info from browser context
    savedToken = await page.evaluate(() => localStorage.getItem('token'));
    savedUser = await page.evaluate(() => localStorage.getItem('user'));
    
    console.log('Successfully logged in. Retained Token:', savedToken ? 'Yes (valid)' : 'No');
  } catch (loginErr) {
    console.log('Error during initial login:', loginErr.message);
  }

  // If login failed to retrieve token, throw since dashboard screens will be blank
  if (!savedToken) {
    console.error('Fatal: Could not retrieve a valid session token. Dashboard screenshots will fail.');
    await browser.close();
    server.close();
    process.exit(1);
  }

  // Iterate over each page
  for (const targetPage of PAGES) {
    console.log(`Processing page: ${targetPage.name} (${targetPage.url})...`);
    
    try {
      if (targetPage.auth) {
        // Navigate to dashboard route (this sets the origin for localStorage)
        await page.goto(`http://localhost:${PORT}${targetPage.url}`, { waitUntil: 'domcontentloaded', timeout: 10000 }).catch(() => {});
        
        // Inject the REAL authenticated token and user metadata
        await page.evaluate((token, user) => {
          localStorage.setItem('token', token);
          localStorage.setItem('user', user);
        }, savedToken, savedUser);
      }

      // Load full page
      await page.goto(`http://localhost:${PORT}${targetPage.url}`, { waitUntil: 'load', timeout: 15000 });
      
    } catch (err) {
      console.log(`  Warning page load alert: ${err.message}`);
    }
    
    // Wait for maps, feeds, and statistics animations
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2500)));

    // Capture each viewport size
    for (const vp of VIEWPORTS) {
      await page.setViewport({
        width: vp.width,
        height: vp.height,
        isMobile: vp.isMobile,
        hasTouch: vp.isMobile
      });
      
      // Let layout adapt to new viewport size
      await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 800)));

      const filename = path.join(SCREENSHOTS_DIR, vp.name, `${targetPage.name}.png`);
      await page.screenshot({ path: filename, fullPage: false });
      console.log(`  Saved screenshot: [${vp.name}] -> ${filename}`);
    }
  }

  await browser.close();
  server.close();
  console.log('\nAll screenshots captured successfully! Local server closed.');
}

run().catch(err => {
  console.error('Error running screenshot engine:', err);
  process.exit(1);
});

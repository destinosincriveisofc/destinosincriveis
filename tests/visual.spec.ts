import { test, expect } from '@playwright/test';

const routes = [
  { name: 'home', path: '/' },
  { name: 'club', path: '/club/' },
  { name: 'ofertas', path: '/ofertas/' },
  { name: 'blog', path: '/blog/' },
  { name: 'consultoria', path: '/consultoria/' },
  { name: 'parcerias', path: '/parcerias/' },
];

for (const route of routes) {
  test(`Visual regression for ${route.name}`, async ({ page }) => {
    // Navigate to local route
    await page.goto(route.path, { waitUntil: 'load' });
    
    // Defer a tiny bit for page animations or dynamic hydration to settle
    await page.waitForTimeout(2500);
    
    // Compare screenshot with baseline
    await expect(page).toHaveScreenshot(`${route.name}.png`, {
      maxDiffPixelRatio: 0.03, // Visual regression ceiling set at 3%
      animations: 'disabled',  // Disable dynamic animations/transition flicker
      fullPage: true,          // Capture the complete height of the page
    });
  });
}

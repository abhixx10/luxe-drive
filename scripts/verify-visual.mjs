import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright-core';

import { createStaticPreviewServer } from './serve-dist.mjs';

const projectRoot = resolve('.');
const screenshotDir = resolve(projectRoot, 'verification-screenshots');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = Number(process.env.STATIC_PORT || 4173);
const baseUrl = `http://127.0.0.1:${port}`;

await mkdir(screenshotDir, { recursive: true });

const server = createStaticPreviewServer({ root: resolve(projectRoot, 'client/dist') });

await new Promise((resolveListen, rejectListen) => {
  server.once('error', rejectListen);
  server.listen(port, '127.0.0.1', resolveListen);
});

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true
});

try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await desktop.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
  await desktop.getByRole('heading', { name: 'Command the road in modern American muscle.' }).waitFor();
  await desktop.locator('canvas').waitFor({ state: 'visible', timeout: 15000 });
  await desktop.screenshot({ path: resolve(screenshotDir, 'home.png'), fullPage: true });

  const canvasBox = await desktop.locator('canvas').boundingBox();
  if (!canvasBox || canvasBox.width < 200 || canvasBox.height < 200) {
    throw new Error('3D placeholder canvas did not render at the expected size');
  }

  const mobile = await browser.newPage({ viewport: { width: 390, height: 900 }, isMobile: true });
  await mobile.goto(`${baseUrl}/login`, { waitUntil: 'networkidle' });
  await mobile.getByRole('heading', { name: 'Login' }).waitFor();
  await mobile.getByPlaceholder('you@example.com').waitFor();
  await mobile.getByPlaceholder('Your password').waitFor();

  const hasHorizontalOverflow = await mobile.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
  );

  if (hasHorizontalOverflow) {
    throw new Error('Mobile login page has horizontal overflow');
  }

  await mobile.screenshot({ path: resolve(screenshotDir, 'login-mobile.png'), fullPage: true });
  console.log(`Visual verification screenshots saved to ${screenshotDir}`);
} finally {
  await browser.close();
  await new Promise((resolveClose) => server.close(resolveClose));
}

#!/usr/bin/env node
// Generate PDF from HTML report using puppeteer-core + local Chrome
// Usage: node src/generate-pdf.js reports/AAPL-analysis-2026-02.html [more files...]
const puppeteer = require('puppeteer-core');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

async function generatePDF(htmlPath) {
  const absolutePath = path.resolve(htmlPath);
  const pdfPath = absolutePath.replace(/\.html$/, '.pdf');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--disable-gpu', '--disable-extensions', '--no-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto(`file://${absolutePath}`, { waitUntil: 'networkidle0' });

  // Hide the PDF export button
  await page.evaluate(() => {
    document.querySelectorAll('.pdf-export-btn').forEach(el => el.style.display = 'none');
  });
  await page.emulateMediaType('screen');

  try {
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', bottom: '10mm', left: '5mm', right: '5mm' },
    });
    console.log(`PDF generated: ${pdfPath}`);
  } catch {
    // Chrome print can fail on some complex pages — use screenshot + sips fallback
    console.log('Chrome print failed, using screenshot fallback...');
    const pngPath = pdfPath.replace('.pdf', '-tmp.png');
    await page.setViewport({ width: 1000, height: 800 });
    await page.screenshot({ path: pngPath, fullPage: true, type: 'png' });
    try {
      execSync(`sips -s format pdf "${pngPath}" --out "${pdfPath}" 2>/dev/null`);
      fs.unlinkSync(pngPath);
      console.log(`PDF generated (via screenshot): ${pdfPath}`);
    } catch {
      console.log(`Screenshot saved: ${pngPath}`);
      console.log('Auto PDF failed. Use the "导出 PDF" button in the HTML report.');
    }
  }

  await browser.close();
}

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error('Usage: node src/generate-pdf.js <file.html> [file2.html ...]');
  process.exit(1);
}

(async () => {
  for (const file of files) {
    await generatePDF(file);
  }
})();

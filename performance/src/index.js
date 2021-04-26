// Import generics dependences.
import path from 'path';
import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';

// Import tools.
import File from './tools/file.js';

const dirname = path.resolve();

(async () => {
  /**
   * You can add '--headless' in chromeFlags preferences
   * in order to hide the visual chrome instance.
   * You can add '--ignore-certificate-errors' in chromeFlags preferences
   * in order to ignore https/http2 ssl certificate.
   */
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--ignore-certificate-errors', '--window-size=1920,1080'],
  });

  const port = process.argv[2] === 'https' ? 443 : 8443;
  /**
   * More info about formFactor: https://github.com/GoogleChrome/lighthouse/blob/master/docs/emulation.md
   * You can change the onlyCategory with ['performance', 'accessibility', 'best-practices', 'seo']
   */
  const runnerResult = await lighthouse(`https://localhost:${port}`, {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance'],
    port: chrome.port,
    formFactor: 'desktop',
    screenEmulation: {
      mobile: false,
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      disabled: false,
    },
  });

  // `.report` is the HTML report as a string
  await File.write(`${dirname}/reports/${process.argv[2]}.html`, runnerResult.report);

  // `.lhr` is the Lighthouse Result as a JS object
  console.log('Report is done for', runnerResult.lhr.finalUrl);
  console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

  await chrome.kill();
})();

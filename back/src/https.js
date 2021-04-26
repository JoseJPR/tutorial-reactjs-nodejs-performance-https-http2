/**
 * Description: Create https server and with html file and request css and js file.
 * You need write in your browser: https://localhost:443/
 */

/** Import generics dependences */
import https from 'https';
import path from 'path';

// Import tools.
import File from './tools/file.js';

// Import MimeTypes
import MIMETYPES from './mimetypes.js';

const dirname = path.resolve();
const port = 443;

(async () => {
  const server = https.createServer({
    key: await File.read(`${dirname}/back/cert/localhost-privkey.pem`),
    cert: await File.read(`${dirname}/back/cert/localhost-cert.pem`),
  });
  server.on('error', (err) => console.error(err));

  server.on('request', async (request, response) => {
    response.writeHead(200, { 'Content-Type': MIMETYPES[path.extname(request.url === '/' ? '/index.html' : request.url)] });
    response.write(await File.read(`${dirname}/build/${request.url === '/' ? '/index.html' : request.url}`));
    response.end();
  });

  server.listen(port);
  console.log(`Server working on port: ${port}`);
})();

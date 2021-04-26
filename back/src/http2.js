/**
 * Description: Create https server and with html file and request css and js file.
 * You need write in your browser: https://localhost:8443/
 */

// Import generics dependences.
import path from 'path';
import http2 from 'http2';

// Import tools.
import File from './tools/file.js';

// Import MimeTypes.
import MIMETYPES from './mimetypes.js';

const dirname = path.resolve();
const port = 8443;

(async () => {
  const server = http2.createSecureServer({
    key: await File.read(`${dirname}/back/cert/localhost-privkey.pem`),
    cert: await File.read(`${dirname}/back/cert/localhost-cert.pem`),
  });
  server.on('error', (err) => console.error(err));

  server.on('stream', async (stream, headers) => {
    /**
     * headers[':method']
     * headers[':path']
     */
    stream.respond({
      'content-type': MIMETYPES[path.extname((headers[':path'] === '/' ? 'index.html' : headers[':path']))],
      ':status': 200,
    });
    stream.end(await File.read(`${dirname}/build/${headers[':path'] === '/' ? 'index.html' : headers[':path']}`));
  });

  server.listen(port);
  console.log(`Server working on port: ${port}`);
})();

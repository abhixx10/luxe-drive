import { createReadStream, existsSync } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const defaultPort = Number(process.env.STATIC_PORT || 4173);

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp'
};

const sendFile = async (res, filePath) => {
  const fileStat = await stat(filePath);
  res.writeHead(200, {
    'Content-Length': fileStat.size,
    'Content-Type': contentTypes[extname(filePath)] || 'application/octet-stream'
  });
  createReadStream(filePath).pipe(res);
};

export const createStaticPreviewServer = ({ root = resolve('client/dist') } = {}) => {
  const fallback = join(root, 'index.html');

  return createServer(async (req, res) => {
    try {
      const url = new URL(req.url || '/', `http://${req.headers.host}`);
      const requestedPath = normalize(decodeURIComponent(url.pathname)).replace(
        /^(\.\.[/\\])+/,
        ''
      );
      const candidate = resolve(join(root, requestedPath));
      let filePath = fallback;

      if (candidate.startsWith(root) && existsSync(candidate)) {
        const candidateStat = await stat(candidate);
        filePath = candidateStat.isFile() ? candidate : fallback;
      }

      await sendFile(res, filePath);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
    }
  });
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const server = createStaticPreviewServer();

  server.listen(defaultPort, () => {
    console.log(`Static preview running at http://localhost:${defaultPort}`);
  });
}

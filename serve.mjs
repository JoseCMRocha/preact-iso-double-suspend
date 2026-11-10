// A tiny static server, so the example needs no dependencies at all. Any
// path without a file gets index.html, like a single-page app host.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const root = import.meta.dirname;
const port = Number(process.env.PORT) || 5173;
const types = { '.html': 'text/html', '.js': 'text/javascript' };

createServer(async (req, res) => {
  const path = new URL(req.url, 'http://x').pathname;
  let file = join(root, path === '/' ? 'index.html' : path);
  if (!types[extname(file)]) file = join(root, 'index.html');
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': types[extname(file)] + '; charset=utf-8' });
    res.end(body);
  } catch {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(await readFile(join(root, 'index.html')));
  }
}).listen(port, () => console.log(`http://localhost:${port}/`));

import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 1234;

const server = http.createServer((req, res) => {
  let filePath = "";

  if (req.url === '/' || req.url === '/index.html') {
    filePath = path.join(__dirname, 'index.html');
  } else if (req.url === '/about') {
    filePath = path.join(__dirname, 'about.html');
  } else if (req.url === '/contact') {
    filePath = path.join(__dirname, 'contact-me.html');
  } else {
    filePath = path.join(__dirname, '404.html');
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Server Error');
      return;
    }

    const statusCode = filePath.includes('404.html') ? 404 : 200;
    res.writeHead(statusCode, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


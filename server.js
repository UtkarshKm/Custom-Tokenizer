const http = require('http');
const fs = require('fs');
const path = require('path');
const Tokenizer = require('./tokenizer');

const tokenizer = new Tokenizer();

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (req.url === '/style.css' && req.method === 'GET') {
        fs.readFile(path.join(__dirname, 'style.css'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        });
    } else if (req.url === '/script.js' && req.method === 'GET') {
        fs.readFile(path.join(__dirname, 'script.js'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(data);
        });
    } else if (req.url === '/tokenize' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { text } = JSON.parse(body);
            const encoded = tokenizer.encode(text);
            const tokens = encoded.map((id) => ({
                id,
                word: tokenizer.revVocab[id]
            }));

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ tokens }));
        });
    } else if (req.url === '/vocab' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ vocab: tokenizer.vocab }));
    } else if (req.url === '/examples' && req.method === 'GET') {
        fs.readFile(path.join(__dirname, 'training.txt'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            const lines = data.split('\n').filter(line => line.trim() !== '');
            const examples = [];
            for (let i = 0; i < 5; i++) {
                const randomIndex = Math.floor(Math.random() * lines.length);
                examples.push(lines[randomIndex]);
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ examples }));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
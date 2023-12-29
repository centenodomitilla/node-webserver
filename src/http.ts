import http from 'http';
import * as fs from "fs";

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        const htmlFile = fs.readFileSync('public-old/index.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlFile);
        return;
    }

    if (req.url?.endsWith('.js')) {
        const jsFile = fs.readFileSync('public-old/js/app.js', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.end(jsFile);
        return;
    }

    if (req.url?.endsWith('.css')) {
        const cssFile = fs.readFileSync('public-old/css/styles.css', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(cssFile);
        return;
    }
});

server.listen(8080, () => {
    console.log('Server is running on port 8080');
});
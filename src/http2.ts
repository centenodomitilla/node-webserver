import fs from 'fs';
import * as http2 from "http2";

const server = http2.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt')
}, (req, res) => {
    if (req.url === '/') {
        const htmlFile = fs.readFileSync('public/index.html', 'utf-8');
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
        const cssFile = fs.readFileSync('public/css/styles.css', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(cssFile);
        return;
    }

    try {
        const responseContent = fs.readFileSync(`public${req.url}`, 'utf-8');
        res.end(responseContent);
    } catch (error) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end();
    }
});

server.listen(8080, () => {
    console.log('Server is running on port 8080');
});
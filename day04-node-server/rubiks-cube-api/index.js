path = require('path');
fs = require('fs');
http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html'});
        res.end('<h1>Welcome to the Rubik\'s Cube API!');
    } else if (req.url === '/cubes' && req.method == 'GET') {
        const cubes = [
            {
                name: "Weilong WRM",
                brand: "Moyu",
                size: 55,
                stickerless: true,
                id: 1
            },
            {
                name: "356 M",
                brand: "Gan",
                size: 56,
                stickerless: false,
                id: 2
            }
        ]

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(cubes));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 PAGE NOT FOUND')
    }
});

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}...`);
});
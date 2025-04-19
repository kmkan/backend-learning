const path = require('path')
const fs = require('fs')
const http = require('http')

// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
//             if (err) throw err;
//             res.writeHead(200, { 'Content-Type': 'text/HTML' });
//             res.end(content);
//         })
//     } else {
//         res.end(req.url);
//     }  
// }); 

// const PORT = process.env.PORT || 5000;

// server.listen(5000, () => {
//     console.log(`Server running on ${PORT}...`);
// })

const server = http.createServer((req, res) => {
    // Build file path
    filePath = path.join(__dirname, 'public', req.url === '/' ? 
        'index.html' : req.url);

    // Extension of file
    extname = path.extname(filePath);

    // Initial content type
    contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
    }

    // Read File
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                // page not found
                fs.readFile(path.join(__dirname, 'public', 'error.html'), (err, content) => {
                    if (err) throw err;
                    res.writeHead(200, { 'Content-Type': 'text/html'});
                    res.end(content, 'utf8');
                })
            } else {
                // some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType});
            res.end(content, 'utf8');
        }
    })
})

const PORT  = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}...`);
})
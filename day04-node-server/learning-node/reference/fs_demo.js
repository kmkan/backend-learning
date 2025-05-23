const fs = require('fs')
const path = require('path')

// Create folder
fs.mkdir(path.join(__dirname, '/test'), {}, err => {
    if (err) throw err;
    console.log('Folder created...');
})

// Create, write, read to file
fs.writeFile(path.join(__dirname, '/test', 'hello.txt'), 'Hello world!', err => {
    if (err) throw err;
    console.log('File created...')

    fs.appendFile(path.join(__dirname, '/test', 'hello.txt'), 'I love Node.js!', err => {
        if (err) throw err;
        console.log('File modified...')

        fs.readFile(path.join(__dirname, '/test', 'hello.txt'), 'utf-8', (err, data) => {
            if (err) throw err;
            console.log(data)
        })
    })
})


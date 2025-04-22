const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/cube-collection.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});

// Create Table
// let sql = `CREATE TABLE cubes (id INTEGER PRIMARY KEY AUTOINCREMENT, brand VARCHAR(20), 
//                                name VARCHAR(20), size_mm INT, stickerless BOOLEAN)`;
// db.run(sql);

// Insert default data
// let sql = 'INSERT INTO cubes (brand, name, size_mm, stickerless) VALUES (?,?,?,?)';
// db.run(sql, ['GAN', 'GAN 11 M Pro', 56, 1], (err) => {
//     if (err) return console.error(err.message);
// })

module.exports = db;
const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.get('/', (req, res) => {
    db.all('SELECT * FROM cubes',[], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
    })
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    db.all(`SELECT * FROM cubes WHERE id == ${id}`, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (rows.length === 0) {
            return res.status(404).json({ msg: `Cube with id ${id} not found...` });
        }
        res.status(200).json(rows);
    })
})

router.post('/', (req, res) => {
    const { brand, name, size_mm, stickerless } = req.body;
    if (!brand) {
        return res.status(400).json({ msg: "Please enter a brand." });
    } else if (!name) {
        return res.status(400).json({ msg: "Please enter a name." });
    } else if (isNaN(size_mm) || size_mm <= 0) {
        return res.status(400).json({ msg: "Please enter a valid size." });
    } else if (typeof(stickerless) !== 'boolean') {
        return res.status(400).json({ msg: "Please true of false for stickerless." });
    }

    db.run('INSERT INTO cubes (brand, name, size_mm, stickerless) VALUES (?,?,?,?)',
           [brand, name, size_mm, stickerless],
           (err) => {
            if (err) return res.status(500).json({ error: err.message });
            db.all('SELECT * FROM cubes',[], (err, rows) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json(rows);
            })
           }
    )
})

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { brand, name, size_mm, stickerless } = req.body;

    db.get(`SELECT * FROM cubes WHERE id = ?`, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ msg: `Cube with id ${id} not found...` });
        }

        const updates = [];
        const values = [];

        if (brand !== undefined) {
            updates.push('brand = ?');
            values.push(brand);
        }
        if (name !== undefined) {
            updates.push('name = ?');
            values.push(name);
        }
        if (size_mm !== undefined && !isNaN(parseInt(size_mm)) && parseInt(size_mm) > 0) {
            updates.push('size_mm = ?');
            values.push(parseInt(size_mm));
        }
        if (stickerless !== undefined && typeof(stickerless) === 'boolean') {
            updates.push('stickerless = ?');
            values.push(stickerless ? 1 : 0); // Convert boolean to integer
        }

        if (updates.length === 0) {
            return res.status(400).json({ msg: 'No fields to update provided.' });
        }

        const sql = `UPDATE cubes SET ${updates.join(', ')} WHERE id = ?`;
        values.push(id);

        db.run(sql, values, function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            db.get('SELECT * FROM cubes WHERE id = ?', [id], (err, updatedRow) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(200).json(updatedRow);
            });
        });
    });
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    db.all(`SELECT * FROM cubes WHERE id == ${id}`, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (rows.length === 0) {
            return res.status(404).json({ msg: `Cube with id ${id} not found...` });
        }
        
        db.run(`DELETE FROM cubes WHERE id == ${id}`, (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
        })

        res.status(201).json(rows);
    })
})



module.exports = router;
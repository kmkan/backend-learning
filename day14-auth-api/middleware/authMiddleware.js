require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ msg: 'No token.' });
    }

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ msg: 'Invalid token.' });
        }
        req.user = user;
        next();
    })
}

module.exports = authenticateToken;
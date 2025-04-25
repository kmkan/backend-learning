const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ msg: 'Token not found.' });
    }
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) return res.status(403).json({ msg: 'Invalid token.' });
        req.user = user;
        console.log(req.user);
        next();
    });
};

module.exports = authenticateToken;
module.exports = function (req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    if (token !== process.env.JWT_KEY) {
        return res.status(403).json({ message: 'Invalid token.' });
    }

    next(); 
};
import jwt from 'jsonwebtoken';

// Hubi in qofku soo galay (login). Wuxuu dhigaa req.userId iyo req.userRole
export const auth = (req, res, next) => {
    try {
        const header = req.headers.authorization; // "Bearer TOKEN"
        if (!header || !header.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Not logged in' });
        }
        const decoded = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET);
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

// Admin kaliya: isticmaal ka dib auth
export const isAdmin = (req, res, next) => {
    if (req.userRole !== 'admin') {
        return res.status(403).json({ message: 'Admin only' });
    }
    next();
};
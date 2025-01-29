import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ Status: false, Error: "No token provided, access denied!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ Status: false, Error: "Invalid or expired token!" });
        }
        req.user = decoded; 
        next();
    });
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const authMiddleware = (req, res, next) => {
    if (req.session && req.session.user) {
        req.user = req.session.user; // 👈 attach user from session
        return next();
    }
    return res.status(401).json({ message: "Unauthorized" });
};
exports.authMiddleware = authMiddleware;

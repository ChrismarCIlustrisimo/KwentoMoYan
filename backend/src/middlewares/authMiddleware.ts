import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.user) {
    req.user = req.session.user; // 👈 attach user from session
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
};

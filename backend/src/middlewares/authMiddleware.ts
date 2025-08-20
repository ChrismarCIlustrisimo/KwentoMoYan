import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  user_id: number;
  username: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token; // ⬅️ read token from cookies

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    (req as any).user = decoded; // attach user payload to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

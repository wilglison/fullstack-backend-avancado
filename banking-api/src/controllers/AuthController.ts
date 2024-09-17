import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma";
import { compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

type TokenPayload = {
  id: string;
  email: string;
  iat: number;
  exp: number;
};

class AuthController {
  async authenticate(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        return res.status(400).json({ error: "User or password not found" });
      }
      const isValidPassword = await compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ error: "User or password not found" });
      }
      const token = sign({ id: user.id, email: user.email }, "secret", {
        expiresIn: "1m",
      });
      return res.status(200).json({ user: { id: user.id, email }, token });
    } catch (error) {
      return res.status(400).json({ error: "Error on login" });
    }
  }

  async authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const token = authorization.replace("Bearer ", "");

      const decoded = verify(token, "secret") as { id: string; email: string };

      const { id } = decoded as TokenPayload;

      console.log(`ID: ${id}`);

      next();
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  }
}

export { AuthController };

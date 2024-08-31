import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma";

class CheckingAccountController {
  async create(req: Request, res: Response) {
    try {
      const { name, email, number } = req.body;
      const checkingAccount = await prisma.checkingAccount.create({
        data: {
          name,
          email,
          number,
        },
      });
      return res.status(201).json(checkingAccount);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { name, email, number } = req.body;

      const checkingAccountUpdated = await prisma.checkingAccount.update({
        where: { id },
        data: {
          name,
          email,
          number,
        },
      });
      return res.json(checkingAccountUpdated);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const checkingAccount = await prisma.checkingAccount.findUnique({
        where: { id },
      });

      if (checkingAccount == null) {
        return res.status(404).json({ msg: "Checking Account not found." });
      }
      await prisma.checkingAccount.delete({
        where: { id },
      });
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const checkingAccounts = await prisma.checkingAccount.findMany();
      return res.json(checkingAccounts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const checkingAccount = await prisma.checkingAccount.findUnique({
        where: { id },
      });

      if (checkingAccount == null) {
        return res.status(404).json({ msg: "Checking Account not found." });
      }

      return res.json(checkingAccount);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async verifyIfExists(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const checkingAccount = await prisma.checkingAccount.findUnique({
        where: { id },
      });
      if (checkingAccount == null) {
        return res.status(404).json({ msg: "Checking Account not found." });
      }
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export { CheckingAccountController };

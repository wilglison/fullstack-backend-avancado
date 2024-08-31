import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma";
import { error } from "console";

class StatementController {
  async deposit(req: Request, res: Response) {
    try {
      const idCheckingAccount = req.params.id;
      const { amount, description } = req.body;
      if (amount <= 0) {
        return res.status(400).json({
          message: "Amount must be greater than zero",
        });
      }
      const statement = await prisma.statement.create({
        data: {
          idCheckingAccount,
          amount,
          description,
          type: "credit",
        },
      });
      return res.status(201).json(statement);
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  async getStatement(req: Request, res: Response) {
    try {
      const idCheckingAccount = req.params.id;
      const statement = await prisma.statement.findMany({
        where: { idCheckingAccount },
      });
      return res.status(200).json(statement);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
  async withdraw(req: Request, res: Response) {
    try {
      const idCheckingAccount = req.params.id;
      const { amount, description } = req.body;
      if (amount <= 0) {
        return res.status(400).json({ message: "Invalid amount" });
      }
      const statement = await prisma.statement.create({
        data: {
          idCheckingAccount,
          amount: amount * -1,
          description,
          type: "debit",
        },
      });
      return res.status(201).json(statement);
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
}
export { StatementController };

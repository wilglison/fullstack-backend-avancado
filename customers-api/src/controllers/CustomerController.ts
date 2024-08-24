import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma";

class CustomerController {
  async create(req: Request, res: Response) {
    try {
      const { name, email, document } = req.body;
      const customer = await prisma.customers.create({
        data: {
          name,
          document,
          email,
        },
      });
      return res.status(201).json(customer);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { name, email, document } = req.body;

      const customer = await prisma.customers.findUnique({
        where: { id },
      });

      if (!customer) {
        return res.status(404).json({ msg: "Customer not found." });
      }

      const customerUpdated = await prisma.customers.update({
        where: { id },
        data: {
          name,
          email,
          document,
        },
      });
      return res.json(customerUpdated);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const customer = await prisma.customers.findUnique({
        where: { id },
      });

      if (!customer) {
        return res.status(404).json({ msg: "Customer not found." });
      }
      await prisma.customers.delete({
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
      const customers = await prisma.customers.findMany();
      return res.json(customers);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const customer = await prisma.customers.findUnique({
        where: { id },
      });

      if (!customer) {
        return res.status(404).json({ msg: "Customer not found." });
      }

      return res.json(customer);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async verifyIfExists(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const customer = await prisma.customers.findUnique({
        where: { id },
      });
      if (customer == null) {
        return res.status(404).json({ msg: "Customer not found." });
      }
      return next;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export { CustomerController };

import express, { json } from "express";
import { PrismaClient } from "@prisma/client";

//const express = require("express"); //import

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.get("/customers", async function (req, res) {
  const customers = await prisma.customers.findMany();
  res.json(customers);
});

app.get("/customers/:id", async function (req, res) {
  const id = req.params.id;

  const customer = await prisma.customers.findUnique({
    where: { id },
  });

  if (customer == null) {
    return res.status(404).json({ error: "Customer not found" });
  }
  return res.json(customer);
});

app.post("/customers", async (req, res) => {
  const { name, email, document } = req.body;
  const customer = await prisma.customers.create({
    data: {
      name,
      email,
      document,
    },
  });
  res.status(201).json(customer);
});

app.delete("/customers/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.customers.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Customer not found" });
  }
});

app.put("/customers/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email, document } = req.body;
  try {
    const updatedCustomer = await prisma.customers.update({
      where: { id },
      data: { name, email, document },
    });
    res.json(updatedCustomer);
  } catch (error) {
    res.status(404).json({ error: "Customer not found" });
  }
});

app.listen(3006, () => console.log("Express running."));

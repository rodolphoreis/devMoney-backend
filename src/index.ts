import express from "express";
import cors from "cors";
import prisma from "../prisma/prismaClient";

const app = express();
app.use(cors());
app.use(express.json());

const port = 3333;

app.get("/transactions", async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany();
    res.json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching transactions" });
  }
});

app.post("/transactions", async (req, res) => {
  const { id, description, amount, type, createdAt, updatedAt } = req.body;
  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        id,
        description,
        amount,
        type,
        createdAt,
        updatedAt,
      },
    });
    res.status(201).json(newTransaction);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating transaction" });
  }
});

app.put("/transactions/:id", async (req, res) => {
  const { id } = req.params;
  const { description, amount, type, createdAt, updatedAt } = req.body;
  try {
    const updatedTransaction = await prisma.transaction.update({
      where: { id },
      data: {
        description,
        amount,
        type,
        createdAt,
        updatedAt,
      },
    });
    res.json(updatedTransaction);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating transaction" });
  }
});

app.delete("/transactions/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.transaction.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error deleting transaction" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_express = __toESM(require("express"));
var import_cors = __toESM(require("cors"));

// prisma/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prismaClient_default = prisma;

// src/index.ts
var app = (0, import_express.default)();
app.use((0, import_cors.default)());
app.use(import_express.default.json());
var port = 3333;
app.get("/transactions", async (req, res) => {
  try {
    const transactions = await prismaClient_default.transaction.findMany();
    res.json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching transactions" });
  }
});
app.post("/transactions", async (req, res) => {
  const { id, description, category, amount, type, createdAt, updatedAt } = req.body;
  try {
    const newTransaction = await prismaClient_default.transaction.create({
      data: {
        id,
        description,
        category,
        amount,
        type,
        createdAt,
        updatedAt
      }
    });
    res.status(201).json(newTransaction);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating transaction" });
  }
});
app.put("/transactions/:id", async (req, res) => {
  const { id } = req.params;
  const { description, category, amount, type, createdAt, updatedAt } = req.body;
  try {
    const updatedTransaction = await prismaClient_default.transaction.update({
      where: { id },
      data: {
        description,
        category,
        amount,
        type,
        createdAt,
        updatedAt
      }
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
    await prismaClient_default.transaction.delete({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error deleting transaction" });
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

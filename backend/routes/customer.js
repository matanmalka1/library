import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Customer } from "../models/Customer.js";
import { verifyToken } from "../helpers/authMiddleware.js";

export const router = express.Router();

/* REGISTER */
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const customer = await Customer.create({
      ...req.body,
      password: hashedPassword,
    });

    const { password, ...safeCustomer } = customer.toJSON();
    return res.status(201).json(safeCustomer);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

/* LOGIN */
router.post("/login", async (req, res) => {
  try {
    const customer = await Customer.findOne({
      where: { email: req.body.email },
    });
    if (!customer)
      return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(req.body.password, customer.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: customer.customerID, email: customer.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/* GET ALL */
router.get("/", verifyToken, async (req, res) => {
  try {
    const customers = await Customer.findAll({
      attributes: { exclude: ["password"] },
    });
    return res.json(customers);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/* GET ONE */
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* UPDATE */
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const [updatedCount] = await Customer.update(req.body, {
      where: { customerID: req.params.id },
    });

    if (!updatedCount) {
      return res.status(404).json({ error: "Customer not found" });
    }

    return res.json({ message: "Customer updated successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

/* DELETE */
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedCount = await Customer.destroy({
      where: { customerID: req.params.id },
    });

    if (!deletedCount) {
      return res.status(404).json({ error: "Customer not found" });
    }

    return res.json({ message: "Customer deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
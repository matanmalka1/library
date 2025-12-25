import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./db.js";
import { router as customerRoutes } from "./routes/customer.js";
import { router as bookRoutes } from "./routes/book.js";
import { router as authorRoutes } from "./routes/author.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("public/uploads"));

// Routes
app.use("/customers", customerRoutes);
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);

const PORT = process.env.PORT;

// server
app.listen(PORT, async () => {
  await sequelize.sync();
  console.log(`Server running on http://localhost:${PORT}`);
});

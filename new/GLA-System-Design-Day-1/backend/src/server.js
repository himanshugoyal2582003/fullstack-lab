require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const recordsRouter = require("./routes/records");
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.get("/", (req, res) => res.json({ message: "Pagination Lab API is running" }));
app.use("/api/records", recordsRouter);
const port = process.env.PORT || 3000;
connectDB().then(() => app.listen(port, () => console.log(`API listening on http://localhost:${port}`)))
  .catch((error) => { console.error("Failed to start API:", error.message); process.exit(1); });

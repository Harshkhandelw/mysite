const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

// Load env
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const productRoutes = require("./routes/productRoutes");

const app = express();

/* =========================
   Ensure uploads folder
========================= */
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

/* =========================
   Middleware
========================= */
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

/* =========================
   API ROUTES (MUST BE FIRST)
========================= */
app.use("/api/products", productRoutes);

/* =========================
   Serve Frontend (Vite build)
========================= */
const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));

// React Router fallback — EXCLUDE /api
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

/* =========================
   MongoDB Connection
========================= */
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

/* =========================
   Server
========================= */
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

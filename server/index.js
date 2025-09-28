const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./db");
const tripRoutes = require("./tripRoutes");
const bucketRoutes = require("./bucketRoutes");

const app = express();
const port = 3000;

// middlewares
app.use(cors());
app.use(bodyParser.json());

// connect to database
connectDB();

// debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// routes
app.use("/api/trips", tripRoutes);
app.use("/api/bucket", bucketRoutes);

// test route to verify server is working
app.get("/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// 404 handler
app.use((req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.url}`);
  res.status(404).json({ error: "Route not found" });
});

// start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./db");
const tripRoutes = require("./tripRoutes");

const app = express();
const port = 3000;

// middlewares
app.use(cors());
app.use(bodyParser.json());

// connect to database
connectDB();

// routes
app.use("/api/trips", tripRoutes);

// start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

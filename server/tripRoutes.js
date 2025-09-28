const express = require("express");
const Trip = require("./trip");

const router = express.Router();

// GET all
router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find().sort({ arrivalDate: 1 });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch all trips" });
  }
});

// GET one
router.get("/:id", async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  res.json(trip);
});

// CREATE
router.post("/", async (req, res) => {
  const newTrip = new Trip(req.body);
  await newTrip.save();
  res.json(newTrip);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Trip.findByIdAndDelete(req.params.id);
  res.json({ message: "Trip deleted" });
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedTrip);
});

module.exports = router;

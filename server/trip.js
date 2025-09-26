const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  tripName: String,
  destination: String,
  arrivalDate: Date,
  departureDate: Date,
  tripType: {
    type: String,
    enum: ["solo", "family", "friends", "business", ""],
  },
  accommodation: { name: String, url: String, parking: Boolean },
});

module.exports = mongoose.model("Trip", tripSchema);

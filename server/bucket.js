const mongoose = require("mongoose");

const bucketItemSchema = new mongoose.Schema({
  section: {
    type: String,
    enum: ["landmarks", "cities", "countries"],
    required: true,
  },
  name: { type: String, required: true },
  visited: { type: Boolean, default: false },
});

module.exports = mongoose.model("BucketItem", bucketItemSchema);

const express = require("express");
const BucketItem = require("./bucket");

const router = express.Router();

// GET all items for a section
router.get("/:section", async (req, res) => {
  try {
    console.log(`Fetching items for section: ${req.params.section}`);
    const items = await BucketItem.find({ section: req.params.section });
    console.log(`Found ${items.length} items`);
    res.json(items);
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// ADD new item
router.post("/", async (req, res) => {
  try {
    console.log("Adding new item:", req.body);
    const newItem = new BucketItem(req.body);
    await newItem.save();
    console.log("Item saved:", newItem);
    res.json(newItem);
  } catch (err) {
    console.error("Error adding item:", err);
    res.status(500).json({ error: "Failed to add item" });
  }
});

// UPDATE (edit name or toggle visited)
router.put("/:id", async (req, res) => {
  try {
    console.log(`Updating item ${req.params.id}:`, req.body);
    const updatedItem = await BucketItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    console.log("Item updated:", updatedItem);
    res.json(updatedItem);
  } catch (err) {
    console.error("Error updating item:", err);
    res.status(500).json({ error: "Failed to update item" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    console.log(`Deleting item: ${req.params.id}`);
    await BucketItem.findByIdAndDelete(req.params.id);
    console.log("Item deleted successfully");
    res.json({ message: "Item deleted" });
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).json({ error: "Failed to delete item" });
  }
});

module.exports = router;

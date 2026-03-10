const express = require("express");
const router = express.Router();

const Asset = require("../models/assetModel");
const authMiddleware = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/adminMiddleware");


// CREATE ASSET (ADMIN ONLY)
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {

    const { name, type } = req.body;

    const asset = await Asset.create({
      name,
      type
    });

    res.status(201).json(asset);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET ALL ASSETS
router.get("/", authMiddleware, async (req, res) => {
  try {

    const assets = await Asset.find();
    res.json(assets);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ASSIGN ASSET (ADMIN)
router.put("/:id/assign", authMiddleware, adminMiddleware, async (req, res) => {
  try {

    const { userId } = req.body;

    const asset = await Asset.findByIdAndUpdate(
      req.params.id,
      {
        status: "assigned",
        assignedTo: userId
      },
      { new: true }
    );

    res.json(asset);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// RETURN ASSET
router.put("/:id/return", authMiddleware, async (req, res) => {
  try {

    const asset = await Asset.findByIdAndUpdate(
      req.params.id,
      {
        status: "available",
        assignedTo: null
      },
      { new: true }
    );

    res.json(asset);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
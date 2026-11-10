const express = require("express");
const router = express.Router();

const Event = require("../models/Event");

// GET: Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Add a new event
router.post("/", async (req, res) => {
  try {
    const { title, description, date, venue, category } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      venue,
      category,
    });

    res.status(201).json({
      message: "Event added successfully",
      event,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Delete an event
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();

const Feedback = require("../models/Feedback");
const Event = require("../models/Event");

// POST: Submit feedback
router.post("/", async (req, res) => {
  try {
    const { event, studentName, rating, comments } = req.body;

    if (!event || !studentName || !rating || !comments) {
      return res.status(400).json({
        message: "Please fill all feedback fields",
      });
    }

    if (!Number.isInteger(Number(rating)) || Number(rating) < 1 || Number(rating) > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    const eventExists = await Event.findById(event);

    if (!eventExists) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    const feedback = await Feedback.create({
      event,
      studentName,
      rating: Number(rating),
      comments,
    });

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: View all feedback
router.get("/", async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .populate("event", "title date venue")
      .sort({ createdAt: -1 });

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Feedback for a specific event
router.get("/event/:eventId", async (req, res) => {
  try {
    const feedback = await Feedback.find({
      event: req.params.eventId,
    }).sort({ createdAt: -1 });

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

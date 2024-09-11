const express = require('express');
const router = express.Router();
const Event = require('../models/Eventes');

// Create a new event
router.post('/', async (req, res) => {
  const { title, description, time, color, date } = req.body;
  try {
    const newEvent = new Event({ title, description, time, color, date });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Get all events for a specific date
router.get('/', async (req, res) => {
  const { date } = req.params;
  try {
    const events = await Event.find({ });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Update an event
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, time, color } = req.body;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, description, time, color },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// Delete an event
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

module.exports = router;

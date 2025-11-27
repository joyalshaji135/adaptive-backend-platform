import express from 'express';
import UserPreference from '../models/UserPreferences.js';

const router = express.Router();

// Get user preferences
router.get('/:userId/preferences', async (req, res) => {
  try {
    const preferences = await UserPreference.findOne({ userId: req.params.userId });
    if (!preferences) {
      return res.status(404).json({ message: 'Preferences not found' });
    }
    res.json(preferences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save user preferences
router.post('/:userId/preferences', async (req, res) => {
  try {
    const preferences = await UserPreference.findOneAndUpdate(
      { userId: req.params.userId },
      { $set: req.body },
      { 
        new: true, 
        upsert: true, 
        runValidators: true 
      }
    );
    res.json(preferences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add custom component
router.post('/:userId/components', async (req, res) => {
  try {
    const { component } = req.body;
    const preferences = await UserPreference.findOneAndUpdate(
      { userId: req.params.userId },
      { $push: { customComponents: component } },
      { new: true }
    );
    res.json(preferences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add form field
router.post('/:userId/fields', async (req, res) => {
  try {
    const { field } = req.body;
    const preferences = await UserPreference.findOneAndUpdate(
      { userId: req.params.userId },
      { $push: { formFields: field } },
      { new: true }
    );
    res.json(preferences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
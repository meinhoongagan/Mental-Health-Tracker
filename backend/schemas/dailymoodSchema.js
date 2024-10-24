const Joi = require('joi');

const dailyMoodSchema = Joi.object({
  userId: Joi.string().required(),  // Reference to the user logging the mood
  mood: Joi.string().valid('happy', 'sad', 'angry', 'excited', 'anxious', 'neutral').required(),  // Daily mood, limited to valid options
  description: Joi.string().max(500).optional(),  // Optional note, max 500 characters
  notes: Joi.string().max(100).optional(),  // Optional note, max 500 characters
  createdAt: Joi.date().iso() // Date the mood was recorded
});

module.exports = dailyMoodSchema;

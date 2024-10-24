const Joi = require('joi');

const dailyMoodSchema = Joi.object({
  userId: Joi.string().required(),  // Reference to the user logging the mood
  mood: Joi.string().valid('happy', 'sad', 'angry', 'excited', 'anxious', 'neutral', 'stressed').required(),  // Daily mood, limited to valid options
  description: Joi.string().max(500),  // Optional note, max 500 characters
  notes: Joi.string().max(100),  // Optional note, max 100 characters
  sleepHours: Joi.number().min(0).max(24),  // Number of hours slept, should be between 0 and 24
  exercise: Joi.boolean(),  // Whether the user exercised that day
  stressLevel: Joi.string().valid('low', 'moderate', 'high', 'extreme'),  // Stress level
  energyLevel: Joi.string().valid('low', 'moderate', 'high'),  // Energy level
  journalEntry: Joi.string(),  // Long-form entry about the day or mood
  medicationTaken: Joi.boolean(),  // Whether medication was taken
  copingMechanisms: Joi.array().items(Joi.string()),  // Array of coping mechanisms (strings)
  dietQuality: Joi.string().valid('poor', 'moderate', 'good'),  // Diet quality rating
  externalEvents: Joi.string(),  // Significant external events
  tags: Joi.array().items(Joi.string()),  // Tags related to the mood or day
  severity: Joi.number().integer().min(1).max(10),  // Severity rating, 1-10 scale
  triggers: Joi.string(),  // Events or activities that triggered the mood
  professionalSupport: Joi.boolean(),  // Whether professional support was consulted 
});

module.exports = dailyMoodSchema;

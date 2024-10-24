const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const User = require('./userModel'); // Import the User model

const DailyMood = sequelize.define('DailyMood', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mood: {
    type: DataTypes.ENUM('happy', 'sad', 'neutral', 'angry', 'stressed'),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT, // Allows users to provide details about their mood
    allowNull: false, // Optional
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: false, // Optional field for additional notes
  },
  sleepHours: {
    type: DataTypes.FLOAT, // Number of hours slept
    allowNull: false,
  },
  exercise: {
    type: DataTypes.BOOLEAN, // True if the user exercised
    allowNull: false,
  },
  stressLevel: {
    type: DataTypes.ENUM('low', 'moderate', 'high', 'extreme'),
    allowNull: false,
  },
  energyLevel: {
    type: DataTypes.ENUM('low', 'moderate', 'high'),
    allowNull: false,
  },
  journalEntry: {
    type: DataTypes.TEXT, // Long-form entry about the user's day or mood
    allowNull: false,
  },
  medicationTaken: {
    type: DataTypes.BOOLEAN, // True if medication was taken
    allowNull: false,
  },
  copingMechanisms: {
    type: DataTypes.JSON, // Using JSON to store arrays of coping mechanisms
    allowNull: false,
  },
  dietQuality: {
    type: DataTypes.ENUM('poor', 'moderate', 'good'), // How well the user ate that day
    allowNull: false,
  },
  externalEvents: {
    type: DataTypes.TEXT, // Significant external events that may have affected mood
    allowNull: false,
  },
  tags: {
    type: DataTypes.JSON, // Using JSON to store arrays of tags
    allowNull: false,
  },
  severity: {
    type: DataTypes.INTEGER, // Severity rating (e.g., 1-10)
    allowNull: false,
  },
  triggers: {
    type: DataTypes.TEXT, // Events or activities that triggered the mood
    allowNull: false,
  },
  professionalSupport: {
    type: DataTypes.BOOLEAN, // True if the user consulted a mental health professional
    allowNull: false,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});

// Associate DailyMood with User (One-to-Many relationship)
DailyMood.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(DailyMood, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = DailyMood;

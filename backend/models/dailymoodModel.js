// models/DailyMood.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const User = require('./userModel'); // Import the User model

const DailyMood = sequelize.define('DailyMood', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
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
    allowNull: true, // Optional
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true, // Optional field for additional notes
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});

// Associate DailyMood with User (One-to-Many relationship)
DailyMood.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(DailyMood, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = DailyMood;

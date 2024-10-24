// models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profilePicture: {
    type: DataTypes.STRING, // Store the URL or path to the profile picture (optional)
    allowNull: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

module.exports = User;

// init.js

const sequelize = require('./db/db');
const User = require('./models/user');
const DailyMood = require('./models/dailymood');

// Sync all models with the database
sequelize.sync({ alter: true }) // 'alter: true' updates tables without dropping them
  .then(() => {
    console.log('Database & tables synced!');
  })
  .catch(err => {
    console.error('Error syncing database tables:', err);
  });

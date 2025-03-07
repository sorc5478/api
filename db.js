const { Sequelize } = require('sequelize');

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

/**
 * Connect to MySQL database
 */
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Database Connection has been established successfully.');
    
    // Sync all models
    if (process.env.NODE_ENV === 'development') {
      // In development, we may want to sync models (don't use force:true in production!)
      await sequelize.sync({ alter: true });
      console.log('All models were synchronized successfully.');
    } else if (process.env.NODE_ENV === 'production') {
      // In production, only sync if explicitly enabled via environment variable
      if (process.env.DB_SYNC === 'true') {
        console.log('Synchronizing models in production mode...');
        await sequelize.sync({ alter: false }); // safer option, won't modify existing tables
        console.log('All models were synchronized successfully.');
      } else {
        console.log('Database sync disabled in production mode.');
      }
    }
    
    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { connectDB, sequelize };
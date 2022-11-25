export default {
  port: process.env.PORT || 3000,
  database: {
    mongo:
      process.env.MONGO_DB_URI || 'mongodb://localhost:27017/dws-projects-nest',
  },
  crypt: {
    saltRounds: 10,
    jwtSecret: process.env.JWT_SECRET || 'dws-projects-nest',
  },
};

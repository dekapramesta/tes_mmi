const db = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "dhanter77",
  DB: "klhk",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

module.exports = db;

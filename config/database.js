const db = require("./db.config");
const { Sequelize } = require("sequelize");

const dbc = new Sequelize("postgresql://postgres:RMgzYnhyoshINgjmv3Jg@containers-us-west-179.railway.app:7403/railway", {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
// const dbc = new Sequelize(db.DB, db.USER, db.PASSWORD, {
//   host: db.HOST,
//   dialect: db.dialect,
//   operatorsAliases: false,

//   pool: {
//     max: db.pool.max,
//     min: db.pool.min,
//     acquire: db.pool.acquire,
//     idle: db.pool.idle,
//   },
// });

module.exports = dbc;

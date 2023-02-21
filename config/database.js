const db = require("./db.config");
const { Sequelize } = require("sequelize");

// const dbc = new Sequelize("postgres://vajtiniovaseji:14ae30f534ed3ebdc87cea4a39a4d8faf6d90325c4f00c14d8b044d2dbcadd82@ec2-54-164-40-66.compute-1.amazonaws.com:5432/d775pl0i02k48r", {
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// });
const dbc = new Sequelize(db.DB, db.USER, db.PASSWORD, {
  host: db.HOST,
  dialect: db.dialect,
  operatorsAliases: false,

  pool: {
    max: db.pool.max,
    min: db.pool.min,
    acquire: db.pool.acquire,
    idle: db.pool.idle,
  },
});

module.exports = dbc;

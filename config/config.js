const { Client } = require("pg");
const db = require("./db.config");

const client = new Client("postgresql://postgres:RMgzYnhyoshINgjmv3Jg@containers-us-west-179.railway.app:7403/railway");
// const client = new Client({
//   user: db.USER,
//   host: db.HOST,
//   database: db.DB,
//   password: db.PASSWORD,
//   port: 5432,
// });

module.exports = client;

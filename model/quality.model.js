const { Sequelize } = require("sequelize");
const db = require("../config/database.js");

const { DataTypes } = Sequelize;

const Quality = db.define(
  "quality",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    indexmsr: {
      type: DataTypes.STRING,
    },
    value: {
      type: DataTypes.INTEGER,
    },
    deviceid: {
      type: DataTypes.INTEGER,
    },
    unitmsr: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Quality;

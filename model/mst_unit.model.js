const { Sequelize } = require("sequelize");
const db = require("../config/database.js");
const MST_UNIT_DEVICE = require("./mst_unit_device.model.js");

const { DataTypes } = Sequelize;

const MST_UNIT = db.define(
  "mst_unit",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    unitid: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
module.exports = MST_UNIT;

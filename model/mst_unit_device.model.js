const { Sequelize } = require("sequelize");
const db = require("../config/database.js");
const MST_UNIT = require("./mst_unit.model.js");

const { DataTypes } = Sequelize;

const MST_UNIT_DEVICE = db.define(
  "mst_unit_device",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    deviceid: {
      type: DataTypes.STRING,
    },
    unitid: {
      type: DataTypes.STRING,
      references: {
        model: MST_UNIT,
        key: "unitId",
      },
    },

    status: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = MST_UNIT_DEVICE;

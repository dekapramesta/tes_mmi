const express = require("express");
const cors = require("cors");
const dbc = require("./config/database");
const Quality = require("./model/quality.model.js");
const MST_UNIT = require("./model/mst_unit.model.js");
const MST_UNIT_DEVICE = require("./model/mst_unit_device.model.js");
const t_log = require("./model/t_log.model");
const client = require("./config/config");
const DataRoute = require("./routes/index");
const { associate } = require("./model/mst_unit_device.model.js");
const app = express();
const port = 5000;
(async () => {
  try {
    app.use(cors());

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    await client.connect();
    await dbc.authenticate();

    console.log("db connect");
    // await Quality.sync();
    // await MST_UNIT.sync();
    // await MST_UNIT_DEVICE.sync();
    // await t_log.sync();
    // await MST_UNIT_DEVICE.associate();
    // await MST_UNIT.associate();

    console.log("done");

    app.use("/", DataRoute);

    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
  }
})();

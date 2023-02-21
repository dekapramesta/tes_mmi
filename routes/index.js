const express = require("express");
const { dataQuality, updateData, detailData, getDevice } = require("../controller/index");

const router = express.Router();
router.post("/quality", dataQuality);
router.post("/updateData", updateData);
router.post("/detailquality", detailData);
router.get("/getDevice", getDevice);
module.exports = router;

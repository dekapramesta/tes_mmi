const client = require("../config/config");
const MST_UNIT = require("../model/mst_unit.model");
const MST_UNIT_DEVICE = require("../model/mst_unit_device.model");
const Quality = require("../model/quality.model");

const dataQuality = async (req, res) => {
  try {
    const { unit, device } = req.body;
    let data = [];

    if (unit === null && device === null) {
      data = await client.query(
        `SELECT  DISTINCT ON (qy.indexmsr,qy.deviceid) qy.*, mu.id as mud_id, mu.status, mu.deviceid as device, mu.unitid FROM quality qy inner join mst_unit_device mu on qy.deviceid = mu.id order by qy.indexmsr,qy.deviceid,"createdAt" desc `
      );
    } else if (unit !== null && device === null) {
      data = await client.query(
        `SELECT DISTINCT ON (qy.indexmsr,qy.deviceid) qy.*,  mu.id as mud_id, mu.status, mu.deviceid as device, mu.unitid FROM quality qy inner join mst_unit_device mu on qy.deviceid = mu.id where mu.unitid ='${unit}'order by qy.indexmsr,qy.deviceid,"createdAt" desc`
      );
    }
    // else if (unit === null && device !== null) {
    //   data = await client.query(
    //     `SELECT DISTINCT ON (qy.indexmsr,qy.deviceid) qy.*, mu.id as mud_id, mu.status, mu.deviceid as devid, mu.unitid FROM quality qy inner join mst_unit_device mu on qy.deviceid = mu.id where mu.deviceid ='${device}'order by qy.indexmsr,qy.deviceid,"createdAt" desc`
    //   );
    // }
    else if (unit !== null && device !== null) {
      data = await client.query(
        `SELECT DISTINCT ON (qy.indexmsr) qy.*,  mu.id as mud_id, mu.status, mu.deviceid as device, mu.unitid FROM quality qy inner join mst_unit_device mu on qy.deviceid = mu.id  where mu.unitid ='${unit}' and mu.deviceid ='${device}' order by qy.indexmsr,"createdAt" desc `
      );
    }
    return res.status(200).json({
      status: true,
      data: data.rows,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

const updateData = async (req, res) => {
  try {
    const data_device = await MST_UNIT_DEVICE.findAll({ attributes: ["id"] });
    const parameter = ["pH", "TSS", "Debit"];
    const unit = ["unit", "m3/s", "mg/L"];
    const value = [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 200) + 1, Math.floor(Math.random() * 200) + 1];
    for (let num = 0; num < data_device.length; num++) {
      let deviceid = data_device[num].id;
      for (let par = 0; par < parameter.length; par++) {
        await Quality.create({
          deviceid: deviceid,
          indexmsr: parameter[par],
          value: value[par],
          unitmsr: unit[par],
        });
      }
    }
    res.status(201).json({
      status: true,
      message: "success",
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
const detailData = async (req, res) => {
  try {
    const { indexmsr, date, device } = req.body;
    let data = [];
    let dataCount = [];
    let value = [];
    let dateCh = [];
    if (indexmsr === null) {
      let datenow = new Date().toLocaleDateString();
      data = await client.query(`SELECT  
        qy.value, qy."createdAt" 
        FROM quality qy inner join mst_unit_device mu on qy.deviceid = mu.id
        where (DATE(qy."createdAt") = '${datenow}') and qy.indexmsr='pH' and qy.deviceid ='1'
        order by qy."createdAt" desc`);
      dataCount = await client.query(`SELECT  
       percentile_cont(0.5) within group (order by qy.value) as median, max(qy.value),min(qy.value)
        FROM quality qy inner join mst_unit_device mu on qy.deviceid = mu.id
        where (DATE(qy."createdAt") = '${datenow}') and qy.indexmsr='pH' and qy.deviceid ='1'`);
    } else {
      dataCount = await client.query(`SELECT  
       percentile_cont(0.5) within group (order by qy.value) as median, max(qy.value),min(qy.value)
        FROM quality qy inner join mst_unit_device mu on qy.deviceid = mu.id
        where (DATE(qy."createdAt") = '${date}') and qy.indexmsr='${indexmsr}' and qy.deviceid ='${device}'`);
      data = await client.query(`SELECT  
        qy.*, qy.id as qy_id, mu.id as mud_id 
        FROM quality qy inner join mst_unit_device mu on qy.deviceid = mu.id
        where (DATE(qy."createdAt") = '${date}') and qy.indexmsr='${indexmsr}' and qy.deviceid ='${device}'
        order by "createdAt" desc`);
    }
    data.rows.forEach((val) => {
      value.push(val.value);
      dateCh.push(val.createdAt);
    });
    res
      .json({
        status: true,
        data: {
          min: dataCount.rows[0].min,
          max: dataCount.rows[0].max,
          median: dataCount.rows[0].median,
          value,
          dateCh,
        },
      })
      .status(200);
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
const getDevice = async (req, res) => {
  try {
    const { unit } = req.query;
    let data = [];
    if (unit.length === 0) {
      data = await MST_UNIT.findAll();
      // data.push(1);
    } else if (unit.length > 0) {
      data = await MST_UNIT_DEVICE.findAll({
        where: {
          unitid: unit,
        },
      });
    }

    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = { dataQuality, updateData, detailData, getDevice };

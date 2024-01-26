const express = require("express");
const { getFile } = require("../controllers/data.js");

const router = express.Router();

// router.get('/', getAlliItems);
router.route("/").get((req,res)=>{});

router.route("/data").get(getFile);


module.exports = router;
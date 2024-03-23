const express = require("express");
const router = express.Router();

//import controller
const {localFileUpload} = require("../controllers/fileUpload");

//api route
router.post("/localFileUpload",localFileUpload );


//export
module.exports = router;
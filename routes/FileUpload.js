const express = require("express");
const router = express.Router();

//import controller
const {localFileUpload,imageUpload} = require("../controllers/fileUpload");

//api route
router.post("/localFileUpload",localFileUpload );
router.post("/imageUpload",imageUpload );


//export
module.exports = router;
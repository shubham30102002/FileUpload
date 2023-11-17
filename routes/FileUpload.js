const express = require("express");
const router = express.Router();

const {imageUpload, videoUpload, imageReducerUpload, localFileUpload} = require("../controller/fileUpload");

router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);



module.exports = router;
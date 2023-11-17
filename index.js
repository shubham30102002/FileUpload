//app create
const express = require("express");
const app = express();

//port find karna hai
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//middlewares
app.use(express.json());  //body parser

const fileUpload = require("express-fileupload"); //file upload middleware
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

//db connect karna hai
const db = require("./config/database")
db.connect();

//cloud se connect karna hai
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mount karna hai
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload",Upload);

//activate server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})
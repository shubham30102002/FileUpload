const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewurlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("DB connection successful"))
    .catch((error) => {
        console.log("DB connection failed");
        console.error(error);
        process.exit(1);
    }); 
}
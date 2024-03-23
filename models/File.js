const mongoose = require("mongoose");
const transporter = require("../config/transporter");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});

//post middleware
fileSchema.post("save" , async function(doc) {
    try{
        //database entry entire object is store in this doc
        console.log("Doc -> ",doc);

        //transporter
        //shift this configuration under config folder
        //done - shifted in config

        //send mail
        let info = await transporter.sendMail({
            from: `FileUpload by Shubham`,
            to: doc.email,
            subject: "New File uploaded on cloudinary",
            html: `<h2>Thank You jee</h2> <p>File Uploaded</p> View here : <a href=${doc.imageUrl}>${doc.imageUrl}</a>`
        })
        console.log(info);

    }catch(error){
        console.log(error);
     

    }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;
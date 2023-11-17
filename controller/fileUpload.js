const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//localFileUpload
exports.localFileUpload = async(req,res) => {
    try{
        //fetch file
        const file = req.files.file;
        console.log("File AA GAYE => ",file);

        //__dirname -> current working directory
        //"/files" -> folder
        //date.now() -> name
        //${file.name.split('.')[1]} -> extension 
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;//server path
        console.log("Path -> ",path)

        //add path to the move function
        file.mv(path, (err)=> {
            console.log(err);
        });

        res.json({
            success: true,
            message : "Local file Uploaded Successfully",
        });

    }catch(error){
        console.log("Not able to upload the file on server")
        console.log(error);
    }
}

function isFileTypeSupported(fileType, supportedTypes){
    return supportedTypes.includes(fileType);
}

async function uploadFileToCloudinary(file, folder){
    const options = {folder};
    await cloudinary.uploader.upload(file.tempFilePath, options); 
}
//image upload
exports.imageUpload = async(req,res) => {
    try{
        //data fetch
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFiles;
        console.log(file);


        //validation
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:",fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File format not supported"
            })
        }

        //file format supported hai
        console.log("Uploading to Codehelp");
        const response = await uploadFileToCloudinary(file, "myFolder"); //bhaiya ka Codehelp pe tha
        console.log(response);

        //db me entry save karna hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })


        res.json({
            success:true,
            // imageUrl: response.secure_url,
            message:"Image successfully uploaded"
        })

    }catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Image Upload failed, something went wrong",
        })
    }
}
const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//localfileupload -> handler function

exports.localFileUpload = async (req, res) => {
    try {

        //fetch filefrom request
        const file = req.files.file;
        console.log("FILE AAGYI JEE -> ", file);

        //__dirname -> current working directory
        //"/files" -> folder
        //date.now() -> name
        //${file.name.split('.')[1]} -> extension 
        //create path to store file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH-> ", path)

        //add path to the move fucntion
        file.mv(path, (err) => {
            console.log(err);
        });

        //create a successful response
        res.json({
            success: true,
            message: 'Local File Uploaded Successfully',
        });

    }
    catch (error) {
        console.log("Not able to upload the file on server")
        console.log(error);
    }
}

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality, maxHeight) {
    if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size exceeds 5MB limit.');
    }
    const options = { folder };
    console.log("temp file path ", file.tempFilePath);
    if (quality) {
        options.quality = quality;
    }
    // Add transformation for reducing image height
    if (maxHeight) {
        options.transformation = { height: maxHeight, crop: "scale" };
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
    try {
        //data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log("File Type: ", fileType);

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            })
        }

        //file format is supported
        //upload to cloudinary
        console.log("Uploading to cloudinary");
        const response = await uploadFileToCloudinary(file, "Shubham")
        console.log("response-> ", response)

        //save entry in db
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image Successfully uploaded"
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}


//video upload
exports.videoUpload = async (req, res) => {
    try {
        //data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;

        //validation
        const supportedTypes = ["mp4", "mpov"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log("File Type: ", fileType);
        //add a  upper limit for 5 mb
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            })
        }


        //file format is supported
        //upload to cloudinary
        console.log("Uploading to cloudinary");
        const response = await uploadFileToCloudinary(file, "Shubham")
        console.log("response-> ", response)

        //db entry
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Video Successfully uploaded"
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

//image size reducer
exports.imageSizeReducer = async (req, res) => {
    try {
        //data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log("File Type: ", fileType);

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            })
        }

        //file format is supported
        //upload to cloudinary
        console.log("Uploading to cloudinary");
        // const response = await uploadFileToCloudinary(file, "Shubham",30)
        // console.log("response-> ", response)


        //hw-> compress wrt to height
        const response = await uploadFileToCloudinary(file, "Shubham", 50, 500); // Reduce height to 500 pixels
        console.log('File uploaded successfully.');
        console.log("response-> ", response)

        //save entry in db
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image Successfully uploaded"
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })

    }
}
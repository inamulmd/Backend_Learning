
const File = require("../models/File");
const cloudinary = require("cloudinary").v2;



exports.localFileUpload = async (req, res) => {
    try {
        console.log("req.files:", req.files);

        // Check if file exists
        if (!req.files || !req.files["file"]) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        // Fetch file from request
        const file = req.files.file;
        console.log("File received:", file);

        // Define file path
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH->", path);

        // Move file to the specified path
        file.mv(path, (err) => {
            if (err) {
                console.error("File move error:", err);
                return res.status(500).json({
                    success: false,
                    message: "File upload failed",
                    error: err.message,
                });
            }

            res.json({
                success: true,
                message: "Local file uploaded successfully",
            });
        });
    } catch (error) {
        console.error("Error during file upload:", error);
        res.status(500).json({
            success: false,
            message: "Local file upload failed",
            error: error.message,
        });
    }
}

 function isFileTypeSupported(fileType, supportedTypes) {
    return supportedTypes.includes(fileType);
 }

 async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder, resource_type: "auto" };
    if (quality) options.quality = quality;
    return cloudinary.uploader.upload(file.tempFilePath, options);
  }

 //image uploader Hanler
 exports.imageUpload = async (req,res) => {
    try {
        console.log("Request body:", req.body); 

        const {name,tags, email} = req.body;
        console.log(name, tags,email);

         // ✅ Add this safe check
         if (!req.files || !req.files.imageFile) {
         return res.status(400).json({
          success: false,
          message: "No image file uploaded",
          });
        }

        //fetch file 
        const imageFile = req.files.imageFile;
        console.log(imageFile);
        
        const supportedTypes = ["png","jpg","jpeg"];
        const fileType = imageFile.name.split('.')[1].toLowerCase();
        
        //check file type is supported or not 
        if(!isFileTypeSupported(fileType,supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:"File type not Supported"
            })
        }

        //upload to Cloundinary
        const response = await uploadFileToCloundinary(imageFile,"FileApp");
        console.log(response );

        //Upload to Db
        const fileData = await File.create({
            name,
            tags,
            email,
            fileurl:response.secure_url
        })

        res.status(200).json({
            success:true,
            message:"file uploaded successfully",
            file:fileData
        })
    }
    catch(error) {
       console.log(error)
       res.status(400).json({
        success: false,
        message: "Something went wrong"
       })
    }
 }

 // video Uploader Handler 
 exports.videoUpload = async (req, res) => {
    try {
        const {name, tags, email } = req.body;
        console.log(name, tags, email); 

        const videoFile = req.files.videoFile; 
        
        //Validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = videoFile.name.split(".")[1].toLowerCase();
        
       if(videoFile.size > 5 * 1024 * 1024) {
           return res.status(400).json ({
                success:false,
                 message : "File size is too Large"
           })
       }

        //File Maximum 5MB
        if(!isFileTypeSupported(fileType, supportedTypes)){
            res.status(400).json({
                success:false,
                message:"File type is not supported"
            })
        }
         //
         //Upload to the Cloudinary 
         const response = await uploadFileToCloudinary(videoFile, "FileApp");

         //Upload to DB
         const vidFile = await File.create ({
            name, 
            tags,
            email,
            fileUrl: response.secure_url
         })

         const file = await vidFile.save();
         console.log(file);

          res.status(200).json({
            success:true,
            message:"File uploaded successfully",
            file:vidFile
          })
    }
    catch(error) {
        console.log(error);
        res.status(400).json({
            success:false,
            message:"something went wrong"
        })
    }
 }

 // image Reducer handler
 exports.imageReducer = async (req,res) =>{
    try {
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        //fetch File
        const imageFile = req.files.imageFile
        console.log(imageFile);
        
        const supportedTypes = ["png","jpg","jpeg"];
        const fileType = imageFile.name.split('.')[1].toLowerCase();

         // Check file type is supported or not 
         if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported"
            })
        }

         // Upload to Cloudinary
        // HW - Decrease size by height and width 
        const response = await uploadFileToCloudinary(imageFile, "FileApp", 50);
        console.log(response)
        

          // Upload to DB 
          const fileData = await File.create({
           name,
          tags,
          email,
          fileUrl: response.secure_url
       })

          res.status(200).json({
          success: true,
          message: "Image reduced and uploaded successfully",
          file: fileData,
        });
     }
     catch(error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
     }

 }
